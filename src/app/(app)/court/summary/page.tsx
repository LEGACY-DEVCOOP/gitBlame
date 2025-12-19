'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';
import CaseSummaryInfo from '@/components/features/court/summary/CaseSummaryInfo';
import SuspectVerdictList from '@/components/features/court/summary/SuspectVerdictList';
import ResponsibilityPieChart from '@/components/features/court/summary/ResponsibilityPieChart';
import RelatedCommitTimeline from '@/components/features/court/summary/RelatedCommitTimeline';
import { useRouter } from 'next/navigation';
import Courthouse from '../../../../../public/assets/Courthouse';

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
      author: 'sosojung',
      message: 'fix(user): 휠오류 수정',
      timestamp: '3시간 전',
    },
    {
      author: 'sosojung',
      message: 'feat: 결제 모듈 초기 구현',
      timestamp: '5시간 전',
    },
    {
      author: 'craftmanship',
      message: 'refactor: 상태 처리 로직 최적화',
      timestamp: '1일 전',
    },
  ],
};

export default function CourtSummaryPage() {
  const router = useRouter();

  const handleCopyResult = () => {
    alert('결과가 클립보드에 복사되었습니다.');
  };

  const handleGoBlame = () => {
    router.push('/blame');
  };

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

        <CaseSummaryInfo {...MOCK_DATA.caseInfo} />

        <SuspectVerdictList suspects={MOCK_DATA.suspects} />

        <ResponsibilityPieChart data={MOCK_DATA.chartData} />

        <RelatedCommitTimeline commits={MOCK_DATA.commits} />

        <ButtonGroup>
          <BlameButton onClick={handleGoBlame}>🚀 BLAME 하기</BlameButton>
          <CopyButton onClick={handleCopyResult}>🔗 결과 복사하기</CopyButton>
        </ButtonGroup>
      </MainContent>
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

const BlameButton = styled.button`
  padding: 16px 40px;
  background: transparent;
  border: 2px solid ${color.white};
  color: ${color.white};
  ${font.H2}
  font-weight: 800;
  cursor: pointer;
  border-radius: 12px;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${color.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(240, 2, 1, 0.2);
  }
`;
