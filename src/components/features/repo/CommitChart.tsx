'use client';

import styled from '@emotion/styled';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import color from '@/styles/color';
import font from '@/styles/font';

interface ContributorData {
  name: string;
  commits: number;
  lines: number;
  percentage: number;
}

interface CommitChartProps {
  data: ContributorData[];
}

export default function CommitChart({ data }: CommitChartProps) {
  return (
    <ChartCard>
      <ChartTitle>기여자별 커밋 수</ChartTitle>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={color.lightgray} />
            <XAxis dataKey="name" stroke={color.white} />
            <YAxis stroke={color.white} />
            <Tooltip
              contentStyle={{
                backgroundColor: color.darkgray,
                border: `1px solid ${color.lightgray}`,
              }}
            />
            <Bar dataKey="commits" fill={color.primary} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartCard>
  );
}

const ChartCard = styled.div`
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

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
