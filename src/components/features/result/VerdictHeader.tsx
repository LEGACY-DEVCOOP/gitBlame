'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

interface VerdictHeaderProps {
  project: string;
  title: string;
  date: string;
  caseNumber: string;
  complainant: string;
  accused: string;
}

export default function VerdictHeader({
  project,
  title,
  date,
  caseNumber,
  complainant,
  accused,
}: VerdictHeaderProps) {
  return (
    <Container>
      <VerdictTitle>판결문</VerdictTitle>

      <CaseInfoGrid>
        <InfoItem>
          <Label>프로젝트:</Label>
          <Value>{project}</Value>
        </InfoItem>
        <InfoItem>
          <Label>사건:</Label>
          <Value>{title}</Value>
        </InfoItem>
        <InfoItem>
          <Label>사건날짜:</Label>
          <Value>{date}</Value>
        </InfoItem>
        <InfoItem>
          <Label>사건번호:</Label>
          <Value>{caseNumber}</Value>
        </InfoItem>
        <InfoRow>
          <InfoItem>
            <Label>고소인:</Label>
            <Value>{complainant}</Value>
          </InfoItem>
          <InfoItem>
            <Label>피고소인:</Label>
            <Value>{accused}</Value>
          </InfoItem>
        </InfoRow>
      </CaseInfoGrid>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const VerdictTitle = styled.h1`
  ${font.D1}
  font-size: 3rem;
  font-weight: 900;
  color: ${color.white};
  margin-bottom: 60px;
  align-self: flex-start;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 80px;
    height: 6px;
    background: ${color.primary};
  }
`;

const CaseInfoGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 60px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Label = styled.span`
  ${font.p1}
  font-weight: 700;
  color: ${color.white};
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const Value = styled.span`
  ${font.p1}
  color: ${color.white};
`;
