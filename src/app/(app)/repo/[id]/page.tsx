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
    { id: '1', name: 'munsojeong', commits: 453, lines: 12840, percentage: 36 },
    { id: '2', name: 'devjohn', commits: 287, lines: 8950, percentage: 23 },
    { id: '3', name: 'codealice', commits: 198, lines: 6420, percentage: 16 },
    { id: '4', name: 'techbob', commits: 156, lines: 4830, percentage: 12 },
    { id: '5', name: 'reactsue', commits: 98, lines: 3210, percentage: 8 },
    { id: '6', name: 'gitmaster', commits: 65, lines: 1750, percentage: 5 },
  ];

  const recentCommits = [
    {
      id: 1,
      message: 'feat: implement user authentication with NextAuth.js',
      author: 'munsojeong',
      date: '2024-12-11',
      hash: 'a7f3d2e',
    },
    {
      id: 2,
      message: 'fix: resolve memory leak in chart component rendering',
      author: 'devjohn',
      date: '2024-12-10',
      hash: 'b4e8c1f',
    },
    {
      id: 3,
      message: 'refactor: migrate from REST API to GraphQL endpoints',
      author: 'codealice',
      date: '2024-12-10',
      hash: 'c9a5f7d',
    },
    {
      id: 4,
      message: 'style: update design system with new color tokens',
      author: 'techbob',
      date: '2024-12-09',
      hash: 'd2c8e4b',
    },
    {
      id: 5,
      message: 'docs: add comprehensive API documentation',
      author: 'reactsue',
      date: '2024-12-09',
      hash: 'e6f1a9c',
    },
    {
      id: 6,
      message: 'perf: optimize bundle size by implementing code splitting',
      author: 'gitmaster',
      date: '2024-12-08',
      hash: 'f3d7b2a',
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
              <StatValue>2.1k</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Forks</StatLabel>
              <StatValue>387</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Contributors</StatLabel>
              <StatValue>12</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Total Commits</StatLabel>
              <StatValue>1,247</StatValue>
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
