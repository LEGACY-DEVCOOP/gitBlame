'use client';

import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import Button from '@/components/common/Button/Button';
import { toPng } from 'html-to-image';
import VerdictHeader from '@/components/features/result/VerdictHeader';
import CulpritDisplay from '@/components/features/result/CulpritDisplay';
import StickerSelector from '@/components/features/result/StickerSelector';

interface Sticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
}

const MOCK_DATA = {
  caseInfo: {
    project: 'TERA/sosojung',
    title: '결제 버튼 클릭 시 500 에러 발생',
    date: '2025-05-04',
    caseNumber: '해-1213-1234-1234',
    complainant: 'sosojung',
    accused: 'craftmanship, kingofhwang',
  },
  culprit: {
    name: 'craftmanship',
    percentage: 66,
  },
};

export default function ResultPage() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const addSticker = (emoji: string) => {
    const newSticker: Sticker = {
      id: Date.now(),
      emoji,
      x: Math.random() * 140 - 70,
      y: Math.random() * 140 - 70,
      rotate: Math.random() * 60 - 30,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const handleDownload = async () => {
    if (!contentRef.current) return;
    try {
      const dataUrl = await toPng(contentRef.current, {
        cacheBust: true,
        backgroundColor: color.black,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `blame_result_${MOCK_DATA.culprit.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('이미지 저장에 실패했습니다.');
    }
  };

  const handleShare = () => {
    const text = `[GitBlame 판결]\n프로젝트: ${MOCK_DATA.caseInfo.project}\n범인: ${MOCK_DATA.culprit.name}\n책임도: ${MOCK_DATA.culprit.percentage}%\n\n#GitBlame #개발자재판`;
    if (navigator.share) {
      navigator
        .share({
          title: 'GitBlame 판결 결과',
          text: text,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert('결과가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <PageContainer>
      <MainContent ref={contentRef}>
        <BackgroundEffect />

        <VerdictHeader {...MOCK_DATA.caseInfo} />

        <CulpritDisplay
          name={MOCK_DATA.culprit.name}
          percentage={MOCK_DATA.culprit.percentage}
          stickers={stickers}
        />

        <StickerSelector onAddSticker={addSticker} />

        <ActionButtons>
          <ActionButton variant="ghost" onClick={handleDownload}>
            <span style={{ color: color.primary }}>BLAME</span> 이미지 저장
          </ActionButton>
          <ActionButton variant="primary" onClick={handleShare}>
            결과 공유
          </ActionButton>
        </ActionButtons>
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${color.black};
  display: flex;
  justify-content: center;
  padding: 60px 20px;
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${color.black};
  position: relative;
  overflow: hidden;
  padding: 40px;
`;

const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 30%,
    rgba(${color.primaryRGB}, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const ActionButton = styled(Button)`
  flex: 1;
  height: 56px;
  ${font.H2}
  font-weight: 700;
  border-radius: 12px;
`;
