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

    // 스코프 외부에서 변수 선언
    const excludeElements = contentRef.current.querySelectorAll(
      '.exclude-from-capture'
    );
    const originalDisplays: string[] = [];

    try {
      // 캡처 전에 제외할 요소들 숨기기
      excludeElements.forEach((element, index) => {
        originalDisplays[index] = (element as HTMLElement).style.display;
        (element as HTMLElement).style.display = 'none';
      });

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
    } finally {
      // 성공/실패 여부와 관계없이 원래 상태로 복원
      excludeElements.forEach((element, index) => {
        (element as HTMLElement).style.display = originalDisplays[index] || '';
      });
    }
  };

  const handleShare = async () => {
    const text = `[GitBlame 판결]\n프로젝트: ${MOCK_DATA.caseInfo.project}\n범인: ${MOCK_DATA.culprit.name}\n책임도: ${MOCK_DATA.culprit.percentage}%\n\n#GitBlame #개발자재판`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GitBlame 판결 결과',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        // 사용자가 공유를 취소한 경우 fallback하지 않음
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Share cancelled by user');
          return;
        }
        console.error('Share failed:', err);
        // 실제 에러인 경우에만 클립보드 fallback
        await copyToClipboard(text);
      }
    } else {
      await copyToClipboard(text);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      // 최신 Clipboard API 시도
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        alert('결과가 클립보드에 복사되었습니다.');
        return;
      }

      // Fallback: 가상 textarea 사용 (HTTP 환경 등)
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('결과가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('Clipboard operation failed:', err);
      alert('클립보드 복사에 실패했습니다. 수동으로 복사해주세요.');
    }
  };

  return (
    <PageContainer>
      <MainContent ref={contentRef}>
        <BackgroundEffect />

        <VerdictHeader
          {...MOCK_DATA.caseInfo}
          className="exclude-from-capture"
        />

        <CulpritDisplay
          name={MOCK_DATA.culprit.name}
          percentage={MOCK_DATA.culprit.percentage}
          stickers={stickers}
        />

        <StickerSelector
          onAddSticker={addSticker}
          className="exclude-from-capture"
        />

        <ActionButtons className="exclude-from-capture">
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
