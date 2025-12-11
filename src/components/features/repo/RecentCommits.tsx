'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

interface CommitData {
  id: number;
  message: string;
  author: string;
  date: string;
  hash: string;
}

interface RecentCommitsProps {
  commits: CommitData[];
}

export default function RecentCommits({ commits }: RecentCommitsProps) {
  return (
    <CommitSection>
      <SectionTitle>최근 커밋</SectionTitle>
      <CommitList>
        {commits.map((commit) => (
          <CommitItem key={commit.id}>
            <CommitInfo>
              <CommitMessage>{commit.message}</CommitMessage>
              <CommitMeta>
                {commit.author} · {commit.date} · {commit.hash}
              </CommitMeta>
            </CommitInfo>
          </CommitItem>
        ))}
      </CommitList>
    </CommitSection>
  );
}

const CommitSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  ${font.H1}
  color: ${color.white};
  margin: 0 0 1.5rem 0;
`;

const CommitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommitItem = styled.div`
  background: ${color.darkgray};
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid ${color.lightgray}33;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${color.primary}66;
    transform: translateX(4px);
  }
`;

const CommitInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommitMessage = styled.span`
  ${font.p1}
  color: ${color.white};
`;

const CommitMeta = styled.span`
  ${font.p2}
  color: ${color.lightgray};
`;
