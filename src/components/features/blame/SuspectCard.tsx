'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';
import Image from 'next/image';

interface SuspectCardProps {
  name: string;
  percentage: number;
  isPrimary?: boolean;
}

export default function SuspectCard({
  name,
  percentage,
  isPrimary = true,
}: SuspectCardProps) {
  const avatarUrl = `https://github.com/${name}.png`;

  return (
    <CardContainer>
      <AnalysisLine />
      <TopSection>
        <AvatarWrapper>
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            fill
            sizes="100px"
            style={{ objectFit: 'cover' }}
          />
        </AvatarWrapper>
        <MainInfo>
          <Label>범인</Label>
          <SuspectName>{name}</SuspectName>
        </MainInfo>
        <ResponsibilityBadge>
          <ResponsibilityLabel>책임도</ResponsibilityLabel>
          <ResponsibilityValue>{percentage}%</ResponsibilityValue>
        </ResponsibilityBadge>
      </TopSection>
      <AnalysisBorder />
    </CardContainer>
  );
}

const CardContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(${color.primaryRGB}, 0.3);
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(${color.primaryRGB}, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 60px rgba(${color.primaryRGB}, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 100%;
    background: ${color.primary};
    box-shadow: 0 0 20px ${color.primary};
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: ${color.gray1};
`;

const MainInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${color.primary};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(${color.primaryRGB}, 0.5);
`;

const SuspectName = styled.h3`
  ${font.H1}
  color: ${color.white};
  margin: 0;
  letter-spacing: -0.02em;
`;

const ResponsibilityBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const ResponsibilityLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${color.lightgray};
  letter-spacing: 0.1em;
`;

const ResponsibilityValue = styled.span`
  ${font.D1}
  font-size: 2.5rem;
  line-height: 1;
  color: ${color.white};
  font-weight: 800;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
`;

const AnalysisLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, ${color.primary} 0%, transparent 40%);
  opacity: 0.8;
  box-shadow: 0 0 10px ${color.primary};
`;

const AnalysisBorder = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-right: 2px solid rgba(255, 255, 255, 0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 20px 0;
`;
