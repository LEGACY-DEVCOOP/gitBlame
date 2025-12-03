'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

interface RepositoryCardProps {
  repoName: string;
  stars: number;
  forks: number;
  updateHistory: string;
}

export default function RepositoryCard({
  repoName,
  stars,
  forks,
  updateHistory,
}: RepositoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <RepoName>{repoName}</RepoName>
        <UpdateHistory>{updateHistory}</UpdateHistory>
      </CardHeader>
      <CardFooter>
        <Stat>스타 {stars}</Stat>
        <Stat>포크 {forks}</Stat>
      </CardFooter>
    </Card>
  );
}

const Card = styled.div`
  background: ${color.darkgray};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RepoName = styled.h3`
  ${font.H2}
  color: ${color.white};
  margin: 0;
`;

const UpdateHistory = styled.span`
  ${font.p2}
  color: ${color.lightgray};
`;

const CardFooter = styled.div`
  display: flex;
  gap: 2rem;
`;

const Stat = styled.span`
  ${font.p2}
  color: ${color.white};
`;
