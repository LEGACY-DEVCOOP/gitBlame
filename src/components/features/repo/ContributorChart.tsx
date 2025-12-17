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
  padding: 0.5rem 1rem;
  height: 100%;
  overflow: hidden;
`;

const ContributorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.5rem;

  /* 커스텀 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.primary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff3333;
  }

  /* Firefox 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: ${color.primary} rgba(255, 255, 255, 0.1);
`;

const ContributorItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-shrink: 0;
  padding: 0.75rem 0;
  min-height: 80px;
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
  background-color: ${color.gray2};
  border-radius: 4px;
  border: 1px solid ${color.gray4};
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
    box-shadow: 0 0 10px rgba(${color.primaryRGB}, 0.5);
  `}
`;
