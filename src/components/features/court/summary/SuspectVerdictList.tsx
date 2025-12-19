'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

interface Suspect {
  name: string;
  role: string;
  description: string;
  percentage: number;
}

interface SuspectVerdictListProps {
  suspects: Suspect[];
}

export default function SuspectVerdictList({
  suspects,
}: SuspectVerdictListProps) {
  return (
    <Container>
      <Header>
        <SectionIcon>🚨</SectionIcon>
        <SectionTitle>주요용의자 판결</SectionTitle>
      </Header>
      <List>
        {suspects.map((suspect, index) => (
          <SuspectCard key={index}>
            <InfoGroup>
              <NameGroup>
                <Name>{suspect.name}</Name>
                <BadgeLabel>SUSPECT</BadgeLabel>
              </NameGroup>
              <RoleGroup>
                <RoleLabel>역할</RoleLabel>
                <RoleValue>{suspect.role}</RoleValue>
              </RoleGroup>
              <VerdictGroup>
                <VerdictLabel>판결내용</VerdictLabel>
                <Description>{suspect.description}</Description>
              </VerdictGroup>
            </InfoGroup>
            <ScoreBox>
              <ScoreLabel>책임 기여도</ScoreLabel>
              <Percentage>{suspect.percentage}%</Percentage>
            </ScoreBox>
          </SuspectCard>
        ))}
      </List>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const SectionIcon = styled.span`
  font-size: 1.5rem;
`;

const SectionTitle = styled.h3`
  ${font.H2}
  color: ${color.white};
  font-weight: 700;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SuspectCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: ${color.primary};
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const NameGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Name = styled.span`
  ${font.H2}
  color: ${color.white};
  font-weight: 700;
`;

const BadgeLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 800;
  color: ${color.primary};
  border: 1px solid ${color.primary};
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
`;

const RoleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RoleLabel = styled.span`
  font-size: 0.75rem;
  color: ${color.midgray};
  font-weight: 600;
`;

const RoleValue = styled.span`
  ${font.p2}
  color: ${color.lightgray};
  font-weight: 500;
`;

const VerdictGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VerdictLabel = styled.span`
  font-size: 0.75rem;
  color: ${color.midgray};
  font-weight: 600;
`;

const Description = styled.p`
  ${font.p2}
  color: ${color.white};
  opacity: 0.9;
  line-height: 1.5;
`;

const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const ScoreLabel = styled.span`
  font-size: 0.75rem;
  color: ${color.midgray};
  font-weight: 600;
`;

const Percentage = styled.span`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${color.white};
  line-height: 1;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
`;
