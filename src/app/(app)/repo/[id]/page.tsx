'use client';

import styled from '@emotion/styled';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import color from '@/styles/color';
import font from '@/styles/font';
import Courthouse from '../../../../../public/assets/Courthouse';
import CommitChart from '@/components/features/repo/CommitChart';
import ContributorChart from '@/components/features/repo/ContributorChart';
import RecentCommits from '@/components/features/repo/RecentCommits';
import {
  mockRepoStats,
  mockContributorData,
  mockRecentCommits,
} from '@/mocks/repoData';

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
              <StatValue>{mockRepoStats.stars}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Forks</StatLabel>
              <StatValue>{mockRepoStats.forks}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Contributors</StatLabel>
              <StatValue>{mockRepoStats.contributors}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Total Commits</StatLabel>
              <StatValue>{mockRepoStats.totalCommits}</StatValue>
            </StatItem>
          </RepoStats>
        </HeaderSection>

        <ChartsGrid>
          <CommitChart data={mockContributorData} />
          <ContributorChart data={mockContributorData} />
        </ChartsGrid>

        <RecentCommits commits={mockRecentCommits} />
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
