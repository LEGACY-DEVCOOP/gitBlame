'use client';

import styled from '@emotion/styled';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import color from '@/styles/color';
import font from '@/styles/font';

interface ChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface ResponsibilityPieChartProps {
  data: ChartData[];
}

export default function ResponsibilityPieChart({
  data,
}: ResponsibilityPieChartProps) {
  return (
    <Card>
      <Header>
        <SectionIcon>📊</SectionIcon>
        <SectionTitle>책임비율 리포트</SectionTitle>
      </Header>
      <ChartWrapper>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{ filter: `drop-shadow(0 0 8px ${entry.color}44)` }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 26, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
                itemStyle={{
                  color: color.white,
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ChartCenterInfo>
            <TotalLabel>TOTAL</TotalLabel>
            <TotalValue>100%</TotalValue>
          </ChartCenterInfo>
        </ChartContainer>

        <LegendList>
          {data.map((entry, index) => (
            <LegendItem key={index}>
              <ColorIndicator
                style={{
                  backgroundColor: entry.color,
                  boxShadow: `0 0 10px ${entry.color}66`,
                }}
              />
              <LegendContent>
                <LegendName>{entry.name}</LegendName>
                <LegendValue>{entry.value}%</LegendValue>
              </LegendContent>
            </LegendItem>
          ))}
        </LegendList>
      </ChartWrapper>
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

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 48px;
  }
`;

const ChartContainer = styled.div`
  width: 260px;
  height: 260px;
  position: relative;
`;

const ChartCenterInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`;

const TotalLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${color.midgray};
  letter-spacing: 1px;
`;

const TotalValue = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${color.white};
`;

const LegendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 200px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const ColorIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
`;

const LegendContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LegendName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${color.lightgray};
`;

const LegendValue = styled.span`
  ${font.p2}
  color: ${color.white};
  font-weight: 700;
`;
