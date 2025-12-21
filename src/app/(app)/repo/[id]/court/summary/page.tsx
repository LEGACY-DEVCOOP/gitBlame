'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';
import CaseSummaryInfo from '@/components/features/court/summary/CaseSummaryInfo';
import SuspectVerdictList from '@/components/features/court/summary/SuspectVerdictList';
import ResponsibilityPieChart from '@/components/features/court/summary/ResponsibilityPieChart';
import RelatedCommitTimeline from '@/components/features/court/summary/RelatedCommitTimeline';
import { useRef, useEffect, useMemo, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Courthouse from '../../../../../../../public/assets/Courthouse';
import { toPng } from 'html-to-image';
import { useJudgment, useAnalyzeJudgment } from '@/hooks/queries/useJudgments';
import { useCommits } from '@/hooks/queries/useGithub';
import { useUser } from '@/hooks/queries/useAuth';
import { useVerdictStore } from '@/store';
import { ObjectionPlayer } from 'objection-irigari';

type JudgeScene = {
  character: 'judge1' | 'judge3';
  text: string;
};

const MOCK_DATA = {
  caseInfo: {
    title: '결제 버튼 클릭 시 500 에러 발생',
    caseNumber: '해-1213-1234-1234',
    date: '2025-05-04',
    complainant: 'sosojung',
    accused: ['craftmanship', 'kingofhwang'],
    summary:
      '결제 모듈의 상태 코드 처리 미흡으로 인해 특정 조건에서 서버 에러가 발생하며, 이는 사용자 경험에 치명적인 영향을 끼침. 코드 분석 결과 해당 로직의 작성자와 수정자가 주요 용의자로 지목됨.',
  },
  suspects: [
    {
      name: 'craftmanship',
      role: '함수 만든 사람',
      description: '로직 구현함',
      percentage: 66,
    },
    {
      name: 'kingofhwang',
      role: '갔다 씀',
      description: '그냥 복붙함',
      percentage: 33,
    },
  ],
  chartData: [
    { name: '크래프트맨십', value: 66, color: '#4facfe' },
    { name: '킹고황', value: 33, color: '#f9d423' },
  ],
  commits: [
    {
      author: 'craftmanship',
      message: 'feat: 결제 버튼 상태 코드 처리 로직 추가',
      timestamp: '2일 전',
    },
    {
      author: 'kingofhwang',
      message: 'fix: 결제 API 에러 핸들링 임시 수정',
      timestamp: '1일 전',
    },
    {
      author: 'craftmanship',
      message: 'refactor: 결제 모듈 상태 처리 로직 최적화',
      timestamp: '12시간 전',
    },
    {
      author: 'sosojung',
      message: 'fix: 결제 버튼 500 에러 긴급 수정 시도',
      timestamp: '3시간 전',
    },
  ],
};

export default function CourtSummaryPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);

  const repoId = params?.id as string;
  const judgmentId = searchParams?.get('judgmentId');

  // Fetch judgment data
  const { data: judgment, isLoading, error } = useJudgment(judgmentId || '');
  const analyzeJudgment = useAnalyzeJudgment();
  const { data: user } = useUser();
  const [judgeScene, setJudgeScene] = useState<JudgeScene | null>(null);

  // Parse owner/repo from judgment data
  const [owner, repo] = useMemo(() => {
    if (!judgment) return ['', ''];
    const fullName = `${judgment.repo_owner}/${judgment.repo_name}`;
    return [judgment.repo_owner, judgment.repo_name];
  }, [judgment]);

  // Fetch commits for the specific file
  const { data: commits } = useCommits(owner, repo, {
    path: judgment?.file_path,
  });

  // Auto-analyze if judgment is pending
  useEffect(() => {
    if (judgment && judgment.status === 'pending' && judgmentId) {
      analyzeJudgment.mutate(judgmentId);
    }
  }, [judgment, judgmentId]);

  // Transform judgment data to match component props
  const caseInfo = useMemo(() => {
    if (!judgment) return null;

    const myUsername = user?.username;
    const allSuspects = judgment.suspects?.map((s) => s.username) || [];

    return {
      title: judgment.title,
      caseNumber: judgment.case_number,
      date: new Date(judgment.created_at).toLocaleDateString('ko-KR'),
      complainant: myUsername || 'You',
      accused: allSuspects.filter((name) => name !== myUsername),
      summary: judgment.description,
    };
  }, [judgment, user]);

  const suspects = useMemo(() => {
    if (!judgment?.suspects) return [];
    return judgment.suspects.map((s) => ({
      name: s.username,
      role: '용의자',
      description: s.reason,
      percentage: s.responsibility,
    }));
  }, [judgment]);

  const chartData = useMemo(() => {
    if (!judgment?.suspects) return [];
    const colors = ['#4facfe', '#f9d423', '#00f2fe', '#fa709a', '#30cfd0'];
    return judgment.suspects.map((s, i) => ({
      name: s.username,
      value: s.responsibility,
      color: colors[i % colors.length],
    }));
  }, [judgment]);

  const commitsData = useMemo(() => {
    if (!commits) return [];
    return commits.slice(0, 10).map((c) => ({
      author: c.author.username,
      message: c.message,
      timestamp: new Date(c.date).toLocaleDateString('ko-KR'),
    }));
  }, [commits]);

  const setVerdict = useVerdictStore((state) => state.setVerdict);

  // Save verdict info to global store whenever it's updated
  useEffect(() => {
    if (caseInfo && suspects.length > 0 && judgment) {
      setVerdict({
        caseInfo,
        suspects,
        repoFullName: `${judgment.repo_owner}/${judgment.repo_name}`,
      });
    }
  }, [caseInfo, suspects, judgment, setVerdict]);

  const formatVerdictResult = () => {
    if (!caseInfo || !suspects) return '';
    const data = { caseInfo, suspects };
    let result = `[법원 판결문 - ${data.caseInfo.caseNumber}]\n\n`;
    result += `사건명: ${data.caseInfo.title}\n`;
    result += `날짜: ${data.caseInfo.date}\n`;
    result += `고소인: ${data.caseInfo.complainant}\n`;
    result += `피고소인: ${data.caseInfo.accused.join(', ')}\n\n`;
    result += `■ 고소요지\n${data.caseInfo.summary}\n\n`;
    result += `■ 판결 결과\n`;
    data.suspects.forEach((s) => {
      result += `- ${s.name} (${s.role}): ${s.percentage}% 책임 (${s.description})\n`;
    });
    result += `\nGenerated by GitBlame`;
    return result;
  };

  const handleCopyResult = async () => {
    const text = formatVerdictResult();

    // 1. Navigator API 시도
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        alert('판결문 요약이 클립보드에 복사되었습니다.');
        return;
      } catch (err) {
        console.error('Navigator clipboard failed, falling back...', err);
      }
    }

    // 2. Fallback: 가상 textarea 사용
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('판결문 요약이 클립보드에 복사되었습니다. (보조 방식)');
    } catch (err) {
      console.error('Fallback copy failed: ', err);
      alert('복사에 실패했습니다.');
    }
  };

  const handleDownloadResult = async () => {
    if (!contentRef.current) return;

    try {
      const element = contentRef.current;
      const rect = element.getBoundingClientRect();

      const dataUrl = await toPng(element, {
        cacheBust: true,
        backgroundColor: color.black,
        width: rect.width + 80, // 좌우 패딩 40px씩 추가
        height: rect.height + 80, // 상하 패딩 40px씩 추가
        pixelRatio: 2, // 고해상도
        style: {
          padding: '40px',
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });
      const link = document.createElement('a');
      link.download = `verdict_${caseInfo?.caseNumber || 'unknown'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Image capture failed: ', err);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  const handleGoBlame = () => {
    if (!repoId || !judgmentId) {
      console.error('Repository ID or Judgment ID is missing');
      return;
    }
    const judgeCharacters: JudgeScene['character'][] = ['judge1', 'judge3'];
    const judgeLines = ['세상에 이럴수가...', '저런', '이런', '에휴'];
    const character =
      judgeCharacters[Math.floor(Math.random() * judgeCharacters.length)];
    const text = judgeLines[Math.floor(Math.random() * judgeLines.length)];
    setJudgeScene({ character, text });
  };

  const handleJudgeSceneComplete = () => {
    if (repoId && judgmentId) {
      router.push(`/repo/${repoId}/court/blame?judgmentId=${judgmentId}`);
    } else {
      console.warn('Missing repoId or judgmentId for navigation');
    }
    setJudgeScene(null);
  };

  if (isLoading || analyzeJudgment.isPending) {
    return (
      <PageContainer>
        <MainContent>
          <LoadingMessage>
            {analyzeJudgment.isPending
              ? 'AI가 용의자를 분석하는 중...'
              : '판결 정보를 불러오는 중...'}
          </LoadingMessage>
        </MainContent>
      </PageContainer>
    );
  }

  if (error || !judgment || !caseInfo) {
    return (
      <PageContainer>
        <MainContent>
          <ErrorMessage>판결 정보를 불러오는데 실패했습니다.</ErrorMessage>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContent>
        <HeaderSection>
          <PageTitle>
            <Courthouse width={48} />
            판결문
          </PageTitle>
          <PageDescription>
            분석이 완료되었습니다. 코드의 책임 소재와 판결 내용을 확인하세요.
          </PageDescription>
        </HeaderSection>

        <div
          ref={contentRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
        >
          <CaseSummaryInfo {...caseInfo} />

          <SuspectVerdictList suspects={suspects} />

          <ResponsibilityPieChart data={chartData} />
        </div>

        <RelatedCommitTimeline commits={commitsData} />

        <ButtonGroup>
          <BlameButton onClick={handleGoBlame}>🚀 BLAME 하기</BlameButton>
          <CopyButton onClick={handleCopyResult}>🔗 결과 복사하기</CopyButton>
          <DownloadButton onClick={handleDownloadResult}>
            📸 판결문 이미지 저장
          </DownloadButton>
        </ButtonGroup>
      </MainContent>

      {judgeScene && (
        <JudgeOverlay>
          <JudgePlayerWrapper>
            <ObjectionPlayer
              key={judgeScene.character}
              character={judgeScene.character}
              nameplate="판사"
              text={judgeScene.text}
              assetsBasePath="/objection-assets"
              onComplete={handleJudgeSceneComplete}
            />
          </JudgePlayerWrapper>
          <SkipButton type="button" onClick={handleJudgeSceneComplete}>
            건너뛰기
          </SkipButton>
        </JudgeOverlay>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${color.black};
  padding: 100px 0;
`;

const MainContent = styled.main`
  max-width: 860px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  margin-bottom: 12px;
`;

const PageTitle = styled.h1`
  ${font.D1}
  color: ${color.white};
  background: linear-gradient(
    135deg,
    ${color.white} 0%,
    ${color.lightgray} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  & > svg {
    -webkit-text-fill-color: initial;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
  }
`;

const PageDescription = styled.p`
  ${font.p1}
  color: ${color.midgray};
  max-width: 500px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const JudgeOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  z-index: 3000;
`;

const JudgePlayerWrapper = styled.div`
  width: min(900px, 90vw);
  height: min(540px, 70vh);
  border: 1px solid ${color.gray3};
  border-radius: 16px;
  overflow: hidden;
  background: ${color.darkgray};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const SkipButton = styled.button`
  ${font.p2}
  color: ${color.lightgray};
  background: transparent;
  border: 1px dashed ${color.gray3};
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${color.white};
    border-color: ${color.white};
  }
`;

const BlameButton = styled.button`
  padding: 16px 40px;
  background: transparent;
  border: 2px solid ${color.white};
  color: ${color.white};
  ${font.H2}
  font-weight: 800;
  cursor: pointer;
  border-radius: 12px;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${color.white};
    color: ${color.black};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
  }
`;

const CopyButton = styled.button`
  padding: 16px 40px;
  background: ${color.primary};
  border: none;
  color: ${color.white};
  ${font.H2}
  font-weight: 800;
  cursor: pointer;
  border-radius: 12px;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${color.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(240, 2, 1, 0.2);
  }
`;

const DownloadButton = styled.button`
  padding: 16px 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${color.white};
  ${font.H2}
  font-weight: 800;
  cursor: pointer;
  border-radius: 12px;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${color.white};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const LoadingMessage = styled.div`
  ${font.D1}
  color: ${color.white};
  text-align: center;
  padding: 100px 20px;
`;

const ErrorMessage = styled.div`
  ${font.H1}
  color: ${color.primary};
  text-align: center;
  padding: 100px 20px;
`;
