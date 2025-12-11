'use client';

import styled from '@emotion/styled';
import RepositoryCard from '@/components/features/main/RepositoryCard';
import color from '@/styles/color';
import font from '@/styles/font';
import Courthouse from '../../../../public/assets/Courthouse';

export default function MainPage() {
  const repositories = [
    {
      id: 1,
      repoName: 'munsojeong/gitblame',
      stars: 2147,
      forks: 387,
      updateHistory: '2 hours ago',
    },
    {
      id: 2,
      repoName: 'LEGACY-DEVCOOP/react-dashboard',
      stars: 1523,
      forks: 234,
      updateHistory: '1 day ago',
    },
    {
      id: 3,
      repoName: 'munsojeong/next-auth-template',
      stars: 856,
      forks: 142,
      updateHistory: '3 days ago',
    },
    {
      id: 4,
      repoName: 'LEGACY-DEVCOOP/design-system',
      stars: 634,
      forks: 98,
      updateHistory: '1 week ago',
    },
    {
      id: 5,
      repoName: 'munsojeong/typescript-utils',
      stars: 412,
      forks: 67,
      updateHistory: '2 weeks ago',
    },
    {
      id: 6,
      repoName: 'LEGACY-DEVCOOP/api-gateway',
      stars: 298,
      forks: 45,
      updateHistory: '1 month ago',
    },
  ];

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
          {repositories.map((repo) => (
            <RepositoryCard
              key={repo.id}
              id={repo.id}
              repoName={repo.repoName}
              stars={repo.stars}
              forks={repo.forks}
              updateHistory={repo.updateHistory}
            />
          ))}
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
