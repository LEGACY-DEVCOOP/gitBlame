'use client';

import styled from '@emotion/styled';
import RepositoryCard from '@/components/features/main/RepositoryCard';
import color from '@/styles/color';
import font from '@/styles/font';
import Courthouse from '../../../../public/assets/Courthouse';
import { useRepos } from '@/hooks/queries/useGithub';

export default function MainPage() {
  const { data: repositories, isLoading, error } = useRepos();

  if (isLoading) {
    return (
      <PageContainer>
        <MainContent>
          {/* You might want a better loading state */}
          <PageTitle>Loading...</PageTitle>
        </MainContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <MainContent>
          <PageTitle>Error loading repositories</PageTitle>
          <ErrorMessage>
            {error instanceof Error ? error.message : 'Unknown error'}
          </ErrorMessage>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContent>
        <TitleSection>
          <PageTitle>나의 레포지토리</PageTitle>
          <JudgeButton>
            <Courthouse width={34} />
            <span>재판하기</span>
          </JudgeButton>
        </TitleSection>

        <RepositoryList>
          {repositories && repositories.length > 0 ? (
            repositories.map((repo) => (
              <RepositoryCard
                key={repo.id}
                id={repo.id}
                repoName={repo.full_name}
                stars={repo.stargazers_count}
                forks={repo.forks_count}
                updateHistory={new Date(repo.updated_at).toLocaleDateString()}
              />
            ))
          ) : (
            <PageTitle>No repositories found</PageTitle>
          )}
        </RepositoryList>
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-width: 100%;
  min-height: 100vh;
  background: ${color.black};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
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

const RepositoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ErrorMessage = styled.p`
  ${font.p1}
  color: ${color.primary};
  margin-top: 1rem;
`;
