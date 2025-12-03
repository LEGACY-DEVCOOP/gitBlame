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
      repoName: 'TERA/sosojung',
      stars: 1,
      forks: 1,
      updateHistory: '업데이트 내역',
    },
    {
      id: 2,
      repoName: 'TERA/sosojung',
      stars: 1,
      forks: 1,
      updateHistory: '업데이트 내역',
    },
    {
      id: 3,
      repoName: 'TERA/sosojung',
      stars: 1,
      forks: 1,
      updateHistory: '업데이트 내역',
    },
    {
      id: 4,
      repoName: 'TERA/sosojung',
      stars: 1,
      forks: 1,
      updateHistory: '업데이트 내역',
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
  min-width: 100%s;
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

const BasketIcon = styled.span`
  font-size: 1.5rem;
`;

const RepositoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
