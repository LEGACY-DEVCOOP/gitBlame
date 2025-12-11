'use client';

import styled from '@emotion/styled';

import color from '@/styles/color';
import font from '@/styles/font';
import type { ContributorData } from '@/types/contributor';

interface ContributorChartProps {
  data: ContributorData[];
}

export default function ContributorChart({ data }: ContributorChartProps) {
  return (
    <ContributorCard>
      <ChartTitle>기여도 상세</ChartTitle>
      <ContributorWrapper>
        <ContributorList>
          {data.map((contributor) => (
            <ContributorItem key={contributor.id}>
              <ContributorInfo>
                <ContributorName>{contributor.name}</ContributorName>
                <ContributorPercentage>
                  {contributor.percentage}%
                </ContributorPercentage>
              </ContributorInfo>
              <ContributorStats>
                {contributor.commits} commits · {contributor.lines} lines
              </ContributorStats>
              <ProgressBarContainer>
                <ProgressBarBackground />
                <ProgressBarFill percentage={contributor.percentage} />
              </ProgressBarContainer>
            </ContributorItem>
          ))}
        </ContributorList>
      </ContributorWrapper>
    </ContributorCard>
  );
}

const ContributorCard = styled.div`
  background: ${color.darkgray};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${color.lightgray}33;
  flex: 1;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.h3`
  ${font.H2}
  color: ${color.white};
  margin: 0 0 1.5rem 0;
`;

const ContributorWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem 1rem;
  height: 100%;
  overflow: hidden;
`;

const ContributorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  justify-content: center;
`;

const ContributorItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 0;
  flex-shrink: 1;
  padding: 0.5rem 0;
`;

const ContributorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContributorName = styled.span`
  font-size: 0.95rem;
  color: ${color.white};
  font-weight: 600;
  line-height: 1.2;
`;

const ContributorStats = styled.span`
  font-size: 0.75rem;
  color: ${color.lightgray};
  line-height: 1.2;
`;

const ContributorPercentage = styled.span`
  font-size: 1rem;
  color: ${color.primary};
  text-align: right;
  font-weight: 600;
  line-height: 1.2;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  margin-top: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const ProgressBarBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 8px;
  background-color: #333;
  border-radius: 4px;
  border: 1px solid #555;
`;

const ProgressBarFill = styled.div<{ percentage: number }>`
  position: absolute;
  width: ${(props) => props.percentage}%;
  height: 8px;
  background: #f00201;
  border-radius: 4px;
  z-index: 2;
  transition: width 0.8s ease-out;

  ${(props) =>
    props.percentage > 0 &&
    `
    box-shadow: 0 0 10px rgba(240, 2, 1, 0.5);
  `}
`;
