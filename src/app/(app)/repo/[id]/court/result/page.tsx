'use client';

import styled from '@emotion/styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import Button from '@/components/common/Button/Button';
import { toPng } from 'html-to-image';
import VerdictHeader from '@/components/features/result/VerdictHeader';
import CulpritDisplay from '@/components/features/result/CulpritDisplay';
import StickerSelector from '@/components/features/result/StickerSelector';
import { useBlame } from '@/hooks/queries/useJudgments';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useVerdictStore } from '@/store';

interface Sticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();

  const judgmentId = searchParams?.get('judgmentId') || '';
  const repoId = params?.id as string;

  const [stickers, setStickers] = useState<Sticker[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    caseInfo: storedCaseInfo,
    suspects: storedSuspects,
    repoFullName,
  } = useVerdictStore();

  const {
    data: blame,
    isLoading: isBlameLoading,
    error: blameError,
  } = useBlame(judgmentId);

  // Redirect if store is empty
  useEffect(() => {
    if (!isBlameLoading && !storedCaseInfo && judgmentId) {
      alert('판결 정보가 없습니다. 요약 페이지로 돌아갑니다.');
      router.push(`/repo/${repoId}/court/summary?judgmentId=${judgmentId}`);
    }
  }, [storedCaseInfo, isBlameLoading, judgmentId, router, repoId]);

  const verdictHeaderInfo = useMemo(() => {
    if (!storedCaseInfo) return null;
    return {
      project: repoFullName || '',
      title: storedCaseInfo.title,
      date: storedCaseInfo.date,
      caseNumber: storedCaseInfo.caseNumber,
      complainant: storedCaseInfo.complainant,
      accused: storedCaseInfo.accused.join(', ') || '-',
    };
  }, [storedCaseInfo, repoFullName]);

  const culprit = useMemo(() => {
    if (storedSuspects && storedSuspects.length > 0) {
      const topSuspect = [...storedSuspects].sort(
        (a, b) => b.percentage - a.percentage
      )[0];
      return {
        name: topSuspect.name,
        percentage: topSuspect.percentage,
      };
    }
    if (blame?.target_username) {
      return {
        name: blame.target_username,
        percentage: 0, // Or responsibility from blame object if available
      };
    }
    return null;
  }, [storedSuspects, blame]);

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
    if (!culprit) return;

    if (!contentRef.current) return;

    const excludeElements = contentRef.current.querySelectorAll(
      '.exclude-from-capture'
    );
    const originalDisplays: string[] = [];

    try {
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
      link.download = `blame_result_${culprit.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      excludeElements.forEach((element, index) => {
        (element as HTMLElement).style.display = originalDisplays[index] || '';
      });
    }
  };

  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    const shareText =
      verdictHeaderInfo && culprit
        ? `[GitBlame 판결]\n프로젝트: ${verdictHeaderInfo.project}\n범인: ${culprit.name}\n책임도: ${culprit.percentage}%\n\n${blame?.messages.mild.join(' ') ?? ''}`
        : '';

    if (!shareText) {
      alert('공유할 판결 정보를 불러오지 못했습니다.');
      return;
    }

    if (isSharing) {
      console.warn('Share already in progress, ignoring new request');
      return;
    }

    if (navigator.share) {
      setIsSharing(true);
      try {
        await navigator.share({
          title: 'GitBlame 판결 결과',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          setIsSharing(false);
          return;
        }
        console.error('Share failed:', err);
      } finally {
        setIsSharing(false);
      }
    }

    await copyToClipboard(shareText);
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        alert('결과가 클립보드에 복사되었습니다.');
        return;
      }

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

  const isLoading = isBlameLoading;

  if (!judgmentId) {
    return (
      <PageContainer>
        <MainContent ref={contentRef}>
          <StatusMessage>judgmentId를 찾을 수 없습니다.</StatusMessage>
        </MainContent>
      </PageContainer>
    );
  }

  if (isLoading || !storedCaseInfo) {
    return (
      <PageContainer>
        <MainContent ref={contentRef}>
          <StatusMessage>판결 결과를 불러오는 중입니다...</StatusMessage>
        </MainContent>
      </PageContainer>
    );
  }

  if (blameError || !verdictHeaderInfo || !culprit) {
    return (
      <PageContainer>
        <MainContent ref={contentRef}>
          <StatusMessage>
            판결 정보를 불러오지 못했습니다. 다시 시도해주세요.
          </StatusMessage>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContent ref={contentRef}>
        <BackgroundEffect />

        <VerdictHeader
          {...verdictHeaderInfo}
          className="exclude-from-capture"
        />

        <CulpritDisplay
          name={culprit.name}
          percentage={culprit.percentage}
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
  width: 100%;
  height: 56px;
  ${font.H2}
  font-weight: 700;
  border-radius: 12px;
`;

const StatusMessage = styled.p`
  ${font.H1}
  color: ${color.white};
  text-align: center;
  width: 100%;
`;
