'use client';

import styled from '@emotion/styled';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import color from '@/styles/color';
import font from '@/styles/font';
import Courthouse from '../../../../../public/assets/Courthouse';
import CommitChart from '@/components/features/repo/CommitChart';
import ContributorChart from '@/components/features/repo/ContributorChart';
import RecentCommits from '@/components/features/repo/RecentCommits';
import { useContributors, useCommits } from '@/hooks/queries/useGithub';
import { useMemo } from 'react';

export default function RepoDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const repoName = searchParams?.get('name') || 'Repository';
  const repoId = params?.id;
  const stars = searchParams?.get('stars') || '0';
  const forks = searchParams?.get('forks') || '0';

  // Parse owner and repo from full_name (e.g., "owner/repo")
  const [owner, repo] = useMemo(() => {
    const parts = repoName.split('/');
    if (parts.length !== 2) {
      console.error('Invalid repository name format. Expected "owner/repo"');
      return ['', ''];
    }
    return parts;
  }, [repoName]);

  // Fetch contributors and commits
  const { data: contributors, isLoading: loadingContributors } =
    useContributors(owner, repo);
  const { data: commits, isLoading: loadingCommits } = useCommits(owner, repo);

  // Transform contributors data for charts
  const contributorData = useMemo(() => {
    if (!contributors) return [];

    return contributors.map((contributor, index) => ({
      id: index.toString(),
      name: contributor.username,
      commits: contributor.commits,
      lines: contributor.additions + contributor.deletions,
      percentage: Math.round(contributor.percentage),
    }));
  }, [contributors]);

  // Transform commits data for recent commits list
  const recentCommitsData = useMemo(() => {
    if (!commits) return [];

    return commits.slice(0, 6).map((commit, index) => ({
      id: index + 1,
      message: commit.message,
      author: commit.author.username,
      date: new Date(commit.date).toLocaleDateString('ko-KR'),
      hash: commit.sha.substring(0, 7),
    }));
  }, [commits]);

  const handleJudgeClick = () => {
    if (!repoId) {
      console.error('Repository ID is missing');
      return;
    }
    router.push(`/repo/${repoId}/court?name=${encodeURIComponent(repoName)}`);
  };

  if (loadingContributors || loadingCommits) {
    return (
      <PageContainer>
        <MainContent>
          <RepoTitle>Loading...</RepoTitle>
        </MainContent>
      </PageContainer>
    );
  }

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
              <StatValue>{stars}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Forks</StatLabel>
              <StatValue>{forks}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Contributors</StatLabel>
              <StatValue>{contributors?.length || 0}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Total Commits</StatLabel>
              <StatValue>{commits?.length || 0}</StatValue>
            </StatItem>
          </RepoStats>
        </HeaderSection>

        <ChartsGrid>
          <CommitChart data={contributorData} />
          <ContributorChart data={contributorData} />
        </ChartsGrid>

        <RecentCommits commits={recentCommitsData} />
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
