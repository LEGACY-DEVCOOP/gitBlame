'use client';

import styled from '@emotion/styled';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import color from '@/styles/color';
import font from '@/styles/font';
import Courthouse from '../../../../../public/assets/Courthouse';
import CommitChart from '@/components/features/repo/CommitChart';
import ContributorChart from '@/components/features/repo/ContributorChart';
import RecentCommits from '@/components/features/repo/RecentCommits';

export default function RepoDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const repoName = searchParams?.get('name') || 'Repository';
  const repoId = params?.id;

  const handleJudgeClick = () => {
    if (!repoId) {
      console.error('Repository ID is missing');
      return;
    }
    router.push(`/court?repo=${repoId}&name=${encodeURIComponent(repoName)}`);
  };

  const contributorData = [
    { id: '1', name: '김철수', commits: 120, lines: 3500, percentage: 35 },
    { id: '2', name: '박영희', commits: 98, lines: 2800, percentage: 28 },
    { id: '3', name: '이민수', commits: 76, lines: 2200, percentage: 22 },
    { id: '4', name: '최지원', commits: 52, lines: 1500, percentage: 15 },
  ];

  const recentCommits = [
    {
      id: 1,
      message: 'feat: 로그인 기능 구현',
      author: '김철수',
      date: '2024-06-15',
      hash: 'a1b2c3d',
    },
    {
      id: 2,
      message: 'fix: 레이아웃 버그 수정',
      author: '박영희',
      date: '2024-06-14',
      hash: 'e4f5g6h',
    },
    {
      id: 3,
      message: 'refactor: API 모듈 리팩토링',
      author: '이민수',
      date: '2024-06-14',
      hash: 'i7j8k9l',
    },
    {
      id: 4,
      message: 'style: 코드 스타일 정리',
      author: '최지원',
      date: '2024-06-13',
      hash: 'm0n1o2p',
    },
  ];

  return (
    <PageContainer>
      <MainContent>
        <HeaderSection>
          <TitleSection>
            <RepoTitle>{repoName}</RepoTitle>
            <JudgeButton onClick={handleJudgeClick}>
              <Courthouse width={34} />
              <span>재판하기</span>
            </JudgeButton>
          </TitleSection>
          <RepoStats>
            <StatItem>
              <StatLabel>Stars</StatLabel>
              <StatValue>128</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Forks</StatLabel>
              <StatValue>24</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Contributors</StatLabel>
              <StatValue>4</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Total Commits</StatLabel>
              <StatValue>346</StatValue>
            </StatItem>
          </RepoStats>
        </HeaderSection>

        <ChartsGrid>
          <CommitChart data={contributorData} />
          <ContributorChart data={contributorData} />
        </ChartsGrid>

        <RecentCommits commits={recentCommits} />
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${color.black};
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem;
`;

const HeaderSection = styled.div`
  margin-bottom: 3rem;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const RepoTitle = styled.h1`
  ${font.D1}
  color: ${color.white};
  margin: 0;
`;

const JudgeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  background: transparent;
  color: ${color.white};
  border: 2px solid ${color.primary};
  border-radius: 8px;

  padding: 0.75rem 1.5rem;
  ${font.p1}

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${color.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(240, 2, 1, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RepoStats = styled.div`
  display: flex;
  gap: 3rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatLabel = styled.span`
  ${font.p2}
  color: ${color.lightgray};
`;

const StatValue = styled.span`
  ${font.H2}
  color: ${color.white};
`;

const ChartsGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 3rem;
`;
