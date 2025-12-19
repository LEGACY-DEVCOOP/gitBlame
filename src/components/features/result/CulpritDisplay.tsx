'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';
import Image from 'next/image';

interface Sticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
}

interface CulpritDisplayProps {
  name: string;
  percentage: number;
  stickers: Sticker[];
}

export default function CulpritDisplay({
  name,
  percentage,
  stickers,
}: CulpritDisplayProps) {
  return (
    <Container>
      <SectionLabel>범인</SectionLabel>
      <CulpritName>{name}</CulpritName>

      <AvatarContainer>
        <AvatarWrapper>
          <Image
            src={`https://github.com/${name}.png`}
            alt={name}
            fill
            sizes="280px"
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </AvatarWrapper>
        {stickers.map((sticker) => (
          <StickerElement
            key={sticker.id}
            style={{
              transform: `translate(${sticker.x}px, ${sticker.y}px) rotate(${sticker.rotate}deg)`,
              left: '50%',
              top: '50%',
              marginLeft: '-24px',
              marginTop: '-24px',
            }}
          >
            {sticker.emoji}
          </StickerElement>
        ))}
      </AvatarContainer>

      <ResponsibilityScore>
        책임도: <Highlight>{percentage}%</Highlight>
      </ResponsibilityScore>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 80px 0;
  position: relative;
`;

const SectionLabel = styled.div`
  background: ${color.primary};
  color: ${color.white};
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 1.25rem;
  letter-spacing: 0.2em;
  margin-bottom: 24px;
  box-shadow: 0 0 20px rgba(${color.primaryRGB}, 0.4);
  transform: rotate(-2deg);
  text-transform: uppercase;

  &::before {
    content: '★';
    margin-right: 8px;
  }
  &::after {
    content: '★';
    margin-left: 8px;
  }
`;

const CulpritName = styled.h2`
  ${font.D1}
  font-size: 5rem;
  font-weight: 950;
  color: ${color.white};
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: -0.04em;
  line-height: 1;
  text-transform: uppercase;

  background: linear-gradient(
    to bottom,
    ${color.white} 30%,
    ${color.lightgray} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.1));
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  margin-bottom: 48px;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid ${color.primary};
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }
`;

const AvatarWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 8px solid rgba(255, 255, 255, 0.05);
  box-shadow:
    0 0 60px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(${color.primaryRGB}, 0.2);
  background: ${color.gray1};
`;

const StickerElement = styled.div`
  position: absolute;
  font-size: 48px;
  user-select: none;
  pointer-events: none;
`;

const ResponsibilityScore = styled.div`
  ${font.D1}
  font-size: 3.5rem;
  font-weight: 950;
  color: ${color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Highlight = styled.span`
  font-size: 5rem;
  color: ${color.primary};
  text-shadow: 0 0 40px rgba(${color.primaryRGB}, 0.6);
  line-height: 1;
`;
