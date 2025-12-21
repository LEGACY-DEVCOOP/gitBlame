'use client';

import styled from '@emotion/styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import SuspectCard from '@/components/features/blame/SuspectCard';
import BlameMessageArea from '@/components/features/blame/BlameMessageArea';
import IntensitySelector, {
  Intensity,
} from '@/components/features/blame/IntensitySelector';
import Button from '@/components/common/Button/Button';
import {
  useBlame,
  useCreateBlame,
  useCreateBlameImage,
  useJudgment,
} from '@/hooks/queries/useJudgments';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/queries/useAuth';

export default function BlamePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const repoId = params?.id as string;
  const judgmentId = searchParams?.get('judgmentId') || '';
  const [intensity, setIntensity] = useState<Intensity>('mild');
  const [message, setMessage] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    data: judgment,
    isLoading: isJudgmentLoading,
    error: judgmentError,
  } = useJudgment(judgmentId);

  // Don't fetch blame initially - we'll create it first
  const {
    data: blame,
    isLoading: isBlameLoading,
    error: blameError,
  } = useBlame(judgmentId, { enabled: false });

  const createBlame = useCreateBlame();
  const createBlameImage = useCreateBlameImage();
  const [blameData, setBlameData] = useState<typeof blame | null>(null);
  const { data: user } = useUser();

  const topSuspect = useMemo(() => {
    if (!judgment?.suspects || judgment.suspects.length === 0) return null;
    return [...judgment.suspects].sort(
      (a, b) => b.responsibility - a.responsibility
    )[0];
  }, [judgment]);

  // Auto-create blame when judgment is loaded
  useEffect(() => {
    const autoCreateBlame = async () => {
      if (!judgment || !judgmentId || blameData || createBlame.isPending) {
        return;
      }

      try {
        const created = await createBlame.mutateAsync(judgmentId);
        setBlameData(created);
      } catch (err) {
        console.error('Auto-create blame failed:', err);
      }
    };

    autoCreateBlame();
  }, [judgment, judgmentId]);

  // Update message when intensity changes
  useEffect(() => {
    const currentBlame = blameData || blame;
    if (currentBlame?.messages) {
      const messagesForIntensity = currentBlame.messages[intensity];
      if (messagesForIntensity && messagesForIntensity.length > 0) {
        const rawMessage = messagesForIntensity.join('\n');
        const myUsername = user?.username;

        if (!myUsername) {
          setMessage(rawMessage); // If user data isn't loaded, show original message
          return;
        }

        const lines = rawMessage.split('\n');
        const modifiedLines = lines.map((line) => {
          if (line.trim().startsWith('고소인:')) {
            return line.replace('You', myUsername);
          }
          if (line.trim().startsWith('피고소인:')) {
            const parts = line.split(':');
            const accusedList = parts[1]
              .trim()
              .split(',')
              .map((s) => s.trim());
            const filteredAccused = accusedList.filter(
              (name) => name !== myUsername
            );
            return `${parts[0]}: ${filteredAccused.join(', ')}`;
          }
          return line;
        });

        setMessage(modifiedLines.join('\n'));
      }
    }
  }, [blameData, blame, intensity, user]);

  const displayedMessage =
    message ||
    (topSuspect
      ? `${topSuspect.username}님에 대한 BLAME 메시지를 생성하고 있습니다...`
      : '사건 정보를 불러오고 있습니다...');

  const handleCopy = async () => {
    if (!message) {
      alert('먼저 BLAME 메시지를 생성해주세요.');
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      alert('메시지가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('Copy failed:', err);
      alert('복사에 실패했습니다.');
    }
  };

  const handleNextStep = async () => {
    if (!repoId || !judgmentId) {
      alert('필수 정보가 없습니다. 다시 시도해주세요.');
      return;
    }

    const currentBlame = blameData || blame;
    if (!currentBlame) {
      alert('BLAME 데이터가 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      let imageUrl = currentBlame.image_url;
      if (!imageUrl) {
        const imageResult = await createBlameImage.mutateAsync(judgmentId);
        imageUrl = imageResult.image_url;
      }

      const query = new URLSearchParams({
        judgmentId,
        intensity,
      });
      if (imageUrl) {
        query.set('imageUrl', imageUrl);
      }

      router.push(`/repo/${repoId}/court/result?${query.toString()}`);
    } catch (err) {
      console.error('Blame image generation failed:', err);
      alert('이미지 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const isLoading =
    isJudgmentLoading ||
    isBlameLoading ||
    createBlame.isPending ||
    createBlameImage.isPending;

  if (!judgmentId) {
    return (
      <PageContainer>
        <MainContent>
          <Subtitle>judgmentId를 찾을 수 없습니다. 다시 시도해주세요.</Subtitle>
        </MainContent>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <MainContent>
          <Subtitle>데이터를 불러오는 중입니다...</Subtitle>
        </MainContent>
      </PageContainer>
    );
  }

  if (judgmentError || blameError || !judgment) {
    return (
      <PageContainer>
        <MainContent>
          <Subtitle>
            BLAME 정보를 불러오지 못했습니다. 다시 시도해주세요.
          </Subtitle>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContent>
        <PageHeader>
          <MainTitle>BLAME TIME</MainTitle>
          <Subtitle>
            책임의 시간을 마주하십시오. 범인에게 전할 메시지를 생성합니다.
          </Subtitle>
        </PageHeader>

        <ContentGrid ref={contentRef}>
          <SuspectCard
            name={topSuspect?.username || '용의자 없음'}
            percentage={topSuspect?.responsibility || 0}
            isPrimary
          />

          <MessageControlGroup>
            <BlameMessageArea message={displayedMessage} />
            <IntensitySelector selected={intensity} onChange={setIntensity} />
          </MessageControlGroup>

          <ActionSection>
            <ActionButton variant="ghost" fullWidth onClick={handleCopy}>
              복사하기
            </ActionButton>
            <ActionButton
              variant="primary"
              fullWidth
              onClick={handleNextStep}
              disabled={createBlame.isPending || createBlameImage.isPending}
            >
              이미지 생성
            </ActionButton>
          </ActionSection>
        </ContentGrid>
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${color.black};
  padding: 100px 0;
  display: flex;
  justify-content: center;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 800px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

const MainTitle = styled.h1`
  ${font.D1}
  color: ${color.white};
  font-weight: 900;
  letter-spacing: -0.01em;
  background: linear-gradient(135deg, ${color.white} 0%, ${color.midgray} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  ${font.p1}
  color: ${color.midgray};
  max-width: 500px;
  white-space: normal;
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 100%;
`;

const MessageControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ActionSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled(Button)`
  height: 64px;
  ${font.H2}
  font-weight: 700;
  border-radius: 16px;
`;
