'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

interface CaseSummaryInfoProps {
  title: string;
  caseNumber: string;
  date: string;
  complainant: string;
  accused: string[];
  summary: string;
}

export default function CaseSummaryInfo({
  title,
  caseNumber,
  date,
  complainant,
  accused,
  summary,
}: CaseSummaryInfoProps) {
  return (
    <Card>
      <TitleSection>
        <BadgeWrapper>
          <Badge>고소장 (COMPLAINT)</Badge>
          <CaseNumber>{caseNumber}</CaseNumber>
        </BadgeWrapper>
        <MainTitle>{title}</MainTitle>
      </TitleSection>

      <InfoDivider />

      <MetaGrid>
        <MetaItem>
          <Label>사건날짜</Label>
          <Value>{date}</Value>
        </MetaItem>
        <MetaItem>
          <Label>고소인</Label>
          <Value>{complainant}</Value>
        </MetaItem>
        <MetaItem>
          <Label>피고소인</Label>
          <Value>{accused.join(', ')}</Value>
        </MetaItem>
      </MetaGrid>

      <SummarySection>
        <SectionHeader>
          <SectionIcon>⚖️</SectionIcon>
          <SectionTitle>고소요지</SectionTitle>
        </SectionHeader>
        <SummaryContent>
          <SummaryText>{summary}</SummaryText>
        </SummaryContent>
      </SummarySection>
    </Card>
  );
}

const Card = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.span`
  background: ${color.primary};
  color: ${color.white};
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const CaseNumber = styled.span`
  ${font.p2}
  color: ${color.midgray};
  font-family: monospace;
`;

const MainTitle = styled.h2`
  ${font.H1}
  color: ${color.white};
  line-height: 1.3;
`;

const InfoDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  margin-bottom: 32px;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: ${color.lightgray};
  font-weight: 600;
  text-transform: uppercase;
`;

const Value = styled.span`
  ${font.p1}
  color: ${color.white};
  font-weight: 500;
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionIcon = styled.span`
  font-size: 1.25rem;
`;

const SectionTitle = styled.h3`
  ${font.H2}
  color: ${color.white};
  font-weight: 700;
`;

const SummaryContent = styled.div`
  position: relative;
  padding: 24px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border-left: 4px solid ${color.primary};
`;

const SummaryText = styled.p`
  ${font.p1}
  color: ${color.lightgray};
  line-height: 1.7;
`;
