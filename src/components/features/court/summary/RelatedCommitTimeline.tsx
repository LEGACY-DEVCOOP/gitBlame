'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

interface Commit {
  author: string;
  message: string;
  timestamp: string;
}

interface RelatedCommitTimelineProps {
  commits: Commit[];
}

export default function RelatedCommitTimeline({
  commits,
}: RelatedCommitTimelineProps) {
  return (
    <CardSection>
      <Header>
        <SectionIcon>📜</SectionIcon>
        <SectionTitle>관련커밋 타임라인</SectionTitle>
      </Header>
      <TimelineList>
        {commits.map((commit, index) => (
          <CommitItem key={index}>
            <MetaBox>
              <AuthorBox>@{commit.author}</AuthorBox>
              <TimeBox>{commit.timestamp}</TimeBox>
            </MetaBox>
            <MessageBox>{commit.message}</MessageBox>
            <ActionIcon className="action-icon">→</ActionIcon>
          </CommitItem>
        ))}
      </TimelineList>
    </CardSection>
  );
}

const CardSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const SectionIcon = styled.span`
  font-size: 1.5rem;
`;

const SectionTitle = styled.h3`
  ${font.H2}
  color: ${color.white};
  font-weight: 700;
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionIcon = styled.span`
  color: ${color.midgray};
  font-weight: 700;
  transition: color 0.2s;
`;

const CommitItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  gap: 24px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.01);

    .action-icon {
      color: ${color.primary};
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const MetaBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 180px;
`;

const AuthorBox = styled.span`
  ${font.p2}
  color: ${color.white};
  font-weight: 700;
`;

const TimeBox = styled.span`
  font-size: 0.75rem;
  color: ${color.midgray};
`;

const MessageBox = styled.p`
  ${font.p2}
  color: ${color.white};
  opacity: 0.8;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
