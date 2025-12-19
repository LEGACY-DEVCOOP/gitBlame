'use client';

import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import SuspectCard from '@/components/features/blame/SuspectCard';
import BlameMessageArea from '@/components/features/blame/BlameMessageArea';
import IntensitySelector, {
  Intensity,
} from '@/components/features/blame/IntensitySelector';
import Button from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';

const MOCK_SUSPECT = {
  name: 'craftmanship',
  percentage: 66,
  date: '1월 14일',
  commitMsg: '결제 로직 수정',
  file: 'payment.ts',
  line: 32,
};

const BLAME_MESSAGES: Record<Intensity, string> = {
  mild: `${MOCK_SUSPECT.name}님, ${MOCK_SUSPECT.date} 커밋하신 '${MOCK_SUSPECT.commitMsg}'에서 에러가 발생했습니다.\n${MOCK_SUSPECT.file} 파일 ${MOCK_SUSPECT.line}번째 줄 확인 부탁드립니다.\n커피 한 잔 사주세요 ☕️`,
  soft: `${MOCK_SUSPECT.name}님, 이거 왜 이렇게 하신 거예요?\n${MOCK_SUSPECT.file} 파일 ${MOCK_SUSPECT.line}줄 때문에 다 터졌잖아요... 🤦‍♀️\n빨리 수정해주시죠.`,
  spicy: `야 이거 누가 짠 거야 (본인 등장)\n${MOCK_SUSPECT.name}님, 당신의 '${MOCK_SUSPECT.commitMsg}' 커밋이 우리 서버를 죽였습니다.\n${MOCK_SUSPECT.file}:${MOCK_SUSPECT.line} 당장 고쳐놓으세요. 죽고 싶지 않으면. 👿`,
};

export default function BlamePage() {
  const router = useRouter();
  const [intensity, setIntensity] = useState<Intensity>('mild');
  const contentRef = useRef<HTMLDivElement>(null);

  const currentMessage = BLAME_MESSAGES[intensity];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentMessage);
      alert('메시지가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('Copy failed:', err);
      alert('복사에 실패했습니다.');
    }
  };

  const handleNextStep = () => {
    router.push('/result');
  };

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
            name={MOCK_SUSPECT.name}
            percentage={MOCK_SUSPECT.percentage}
            isPrimary={true}
          />

          <MessageControlGroup>
            <BlameMessageArea message={currentMessage} />
            <IntensitySelector selected={intensity} onChange={setIntensity} />
          </MessageControlGroup>

          <ActionSection>
            <ActionButton variant="ghost" fullWidth onClick={handleCopy}>
              복사하기
            </ActionButton>
            <ActionButton variant="primary" fullWidth onClick={handleNextStep}>
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
  white-space: nowrap;
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
