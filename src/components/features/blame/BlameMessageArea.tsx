'use client';

import styled from '@emotion/styled';
import color from '@/styles/color';
import font from '@/styles/font';

interface BlameMessageAreaProps {
  message: string;
}

export default function BlameMessageArea({ message }: BlameMessageAreaProps) {
  return (
    <Container>
      <HeaderSection>
        <HeaderIcon>💬</HeaderIcon>
        <HeaderText>
          <PrimaryTitle>GENERATED BLAME LOG</PrimaryTitle>
          <SecondaryTitle>시스템 자동 생성 메시지</SecondaryTitle>
        </HeaderText>
      </HeaderSection>
      <MessageFrame>
        <CornerTL />
        <CornerTR />
        <CornerBL />
        <CornerBR />
        <ContentWrapper>
          <ScanLine />
          {message.split('\n').map((line, i) => (
            <MessageLine key={i}>
              <LinePrism />
              {line}
            </MessageLine>
          ))}
        </ContentWrapper>
      </MessageFrame>
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
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
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

const MessageFrame = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 32px;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
`;

const MessageLine = styled.p`
  ${font.p1}
  color: ${color.white};
  margin: 0;
  line-height: 1.6;
  opacity: 0.95;
  display: flex;
  gap: 12px;
`;

const LinePrism = styled.div`
  width: 4px;
  height: 1.6em;
  background: ${color.primary};
  box-shadow: 0 0 10px rgba(${color.primaryRGB}, 0.5);
  opacity: 0.8;
  flex-shrink: 0;
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.02) 50%,
    transparent 100%
  );
  pointer-events: none;
  background-size: 100% 4px;
`;

const Corner = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid ${color.primary};
  box-shadow: 0 0 8px rgba(${color.primaryRGB}, 0.3);
  opacity: 0.6;
`;

const CornerTL = styled(Corner)`
  top: 12px;
  left: 12px;
  border-right: none;
  border-bottom: none;
`;

const CornerTR = styled(Corner)`
  top: 12px;
  right: 12px;
  border-left: none;
  border-bottom: none;
`;

const CornerBL = styled(Corner)`
  bottom: 12px;
  left: 12px;
  border-right: none;
  border-top: none;
`;

const CornerBR = styled(Corner)`
  bottom: 12px;
  right: 12px;
  border-left: none;
  border-top: none;
`;
