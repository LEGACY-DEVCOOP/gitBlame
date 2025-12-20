'use client';

import styled from '@emotion/styled';

const EMOJI_LIST = ['🔥', '👿', '👊', '💩', '🤡', '🚔', '⛓️', '🚫'];

interface StickerSelectorProps {
  onAddSticker: (emoji: string) => void;
  className?: string;
}

export default function StickerSelector({
  onAddSticker,
  className,
}: StickerSelectorProps) {
  return (
    <Container className={className}>
      {EMOJI_LIST.map((emoji) => (
        <EmojiButton key={emoji} onClick={() => onAddSticker(emoji)}>
          {emoji}
        </EmojiButton>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
  padding: 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
`;

const EmojiButton = styled.button`
  font-size: 40px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2) translateY(-5px);
  }

  &:active {
    transform: scale(0.9);
  }
`;
