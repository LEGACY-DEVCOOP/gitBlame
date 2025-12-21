'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

export type Intensity = 'mild' | 'medium' | 'spicy';

interface IntensitySelectorProps {
  selected: Intensity;
  onChange: (intensity: Intensity) => void;
}

const INTENSITIES: {
  id: Intensity;
  label: string;
  protocol: string;
  color: string;
}[] = [
  { id: 'mild', label: '순한맛', protocol: 'PHASE 01', color: '#4facfe' },
  { id: 'medium', label: '중간', protocol: 'PHASE 02', color: '#f9d423' },
  { id: 'spicy', label: '매운맛', protocol: 'PHASE 03', color: color.primary },
];

export default function IntensitySelector({
  selected,
  onChange,
}: IntensitySelectorProps) {
  return (
    <Container>
      <HeaderSection>
        <HeaderIcon>⚡</HeaderIcon>
        <HeaderText>
          <PrimaryTitle>INTENSITY PROTOCOL</PrimaryTitle>
          <SecondaryTitle>Blame 강도 설정</SecondaryTitle>
        </HeaderText>
      </HeaderSection>
      <Grid>
        {INTENSITIES.map((item) => (
          <ProtocolCard
            key={item.id}
            as="button"
            type="button"
            isSelected={selected === item.id}
            activeColor={item.color}
            onClick={() => onChange(item.id)}
            aria-pressed={selected === item.id}
            aria-label={`${item.label} 강도로 설정`}
          >
            <ProtocolLabel>{item.protocol}</ProtocolLabel>
            <IntensityLabel>{item.label}</IntensityLabel>
            <StatusIndicator
              isSelected={selected === item.id}
              activeColor={item.color}
            />
          </ProtocolCard>
        ))}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 4px;
`;

const HeaderIcon = styled.span`
  font-size: 1.5rem;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrimaryTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: ${color.white};
  letter-spacing: 0.15em;
`;

const SecondaryTitle = styled.span`
  font-size: 0.85rem;
  color: ${color.midgray};
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProtocolCard = styled.div<{ isSelected: boolean; activeColor: string }>`
  position: relative;
  background: ${(props) =>
    props.isSelected
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid
    ${(props) =>
      props.isSelected ? props.activeColor : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  /* Button 요소를 위한 기본 스타일 초기화 */
  &[type='button'] {
    font: inherit;
    text-align: left;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: ${(props) =>
      props.isSelected ? props.activeColor : 'rgba(255, 255, 255, 0.2)'};
  }

  /* 키보드 포커스 스타일 */
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    border-color: ${(props) => props.activeColor};
    box-shadow: 0 0 0 2px ${(props) => props.activeColor}40;
  }

  /* 활성화된 상태 */
  &:active {
    transform: scale(0.98);
  }

  ${(props) =>
    props.isSelected &&
    `
    box-shadow: 0 0 20px ${props.activeColor}20;
  `}
`;

const ProtocolLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  color: ${color.midgray};
  letter-spacing: 0.1em;
`;

const IntensityLabel = styled.span`
  ${font.H2}
  color: ${color.white};
  font-weight: 800;
`;

const StatusIndicator = styled.div<{
  isSelected: boolean;
  activeColor: string;
}>`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;

  &::after {
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) =>
      props.isSelected ? props.activeColor : 'rgba(255, 255, 255, 0.1)'};
    box-shadow: ${(props) =>
      props.isSelected ? `0 0 10px ${props.activeColor}` : 'none'};
  }
`;
