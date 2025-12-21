'use client';

import styled from '@emotion/styled';
import { useState, useMemo } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import FormItem from '@/components/common/FormItem/FormItem';
import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select/Select';
import FileSelector from './FileSelector';
import Button from '@/components/common/Button/Button';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCreateJudgment } from '@/hooks/queries/useJudgments';
import { ObjectionPlayer } from 'objection-irigari';
import { useUser } from '@/hooks/queries/useAuth';
import { useFileTree } from '@/hooks/queries/useGithub';
import { useVerdictStore } from '@/store';

type ObjectionScene = {
  character: 'phoenix' | 'miles';
  nameplate: string;
  text: string;
};
const periodOptions = [
  { value: '1', label: '최근 24시간 이내' },
  { value: '3', label: '최근 3일 이내' },
  { value: '7', label: '최근 7일 이내 (기본)' },
  { value: '30', label: '최근 30일 이내' },
];

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: '',
    filePath: '',
    description: '',
    period: '7',
  });
  const [objectionScenes, setObjectionScenes] = useState<ObjectionScene[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [pendingJudgmentId, setPendingJudgmentId] = useState<string | null>(
    null
  );
  const [isAwaitingJudgmentId, setIsAwaitingJudgmentId] = useState(false);
  const [isFileSelectorOpen, setIsFileSelectorOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { data: user } = useUser();
  const verdictStore = useVerdictStore();
  const createJudgment = useCreateJudgment();

  // Get repo info from URL params
  const repoName = searchParams?.get('name') || '';
  const [owner, repo] = useMemo(() => {
    const parts = repoName.split('/');
    if (parts.length !== 2) {
      return ['', ''];
    }
    return parts;
  }, [repoName]);

  const repoId = useMemo(() => {
    const id = params?.id;
    return typeof id === 'string' ? id : '';
  }, [params]);

  // Prefetch file tree as soon as form is mounted (so /tree 호출을 미리 수행)
  useFileTree(owner, repo, undefined, { enabled: !!owner && !!repo });

  const currentScene = useMemo(
    () => objectionScenes[currentSceneIndex],
    [objectionScenes, currentSceneIndex]
  );

  const startObjectionSequence = (judgmentId: string | null = null) => {
    const milesLines = ['어디 한 번 해봐!', '두렵지가 않구나...'];
    const milesLine = milesLines[Math.floor(Math.random() * milesLines.length)];
    const accusedFromStore =
      verdictStore.caseInfo?.accused?.[0] ||
      verdictStore.suspects?.[0]?.name ||
      '';
    const milesNameplate = accusedFromStore || repo || '피고소인';

    const scenes: ObjectionScene[] = [
      {
        character: 'phoenix',
        nameplate: user?.username || 'Phoenix Wright',
        text: formData.title,
      },
      {
        character: 'miles',
        nameplate: milesNameplate,
        text: milesLine,
      },
    ];

    setPendingJudgmentId(judgmentId);
    setObjectionScenes(scenes);
    setCurrentSceneIndex(0);
    setIsAwaitingJudgmentId(false);
  };

  const handleSceneComplete = () => {
    const nextIndex = currentSceneIndex + 1;
    if (nextIndex < objectionScenes.length) {
      setCurrentSceneIndex(nextIndex);
      return;
    }

    // Sequence finished -> navigate to summary
    if (repoId && pendingJudgmentId) {
      router.push(
        `/repo/${repoId}/court/summary?judgmentId=${pendingJudgmentId}`
      );
    } else {
      setIsAwaitingJudgmentId(true);
      return;
    }
    setObjectionScenes([]);
    setPendingJudgmentId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!formData.title || !formData.filePath || !formData.description) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (!owner || !repo) {
      alert('레포지토리 정보가 올바르지 않습니다.');
      return;
    }

    startObjectionSequence(null);

    try {
      const judgment = await createJudgment.mutateAsync({
        repo_owner: owner,
        repo_name: repo,
        title: formData.title,
        description: formData.description,
        file_path: formData.filePath,
        period_days: parseInt(formData.period, 10),
      });

      setPendingJudgmentId(judgment.id);

      // If 애니메이션이 이미 끝났다면 여기서 바로 이동
      if (isAwaitingJudgmentId) {
        router.push(`/repo/${repoId}/court/summary?judgmentId=${judgment.id}`);
        setObjectionScenes([]);
        setIsAwaitingJudgmentId(false);
      }
    } catch (error) {
      console.error('Failed to create judgment:', error);
      alert('고소장 접수에 실패했습니다. 다시 시도해주세요.');
      setObjectionScenes([]);
      setPendingJudgmentId(null);
      setIsAwaitingJudgmentId(false);
    }
  };

  return (
    <FormCard>
      <Form onSubmit={handleSubmit}>
        <FormItem label="사건 제목">
          <Input
            placeholder="피해 발생 상황을 요약해주세요 (예: 결제 버튼 클릭 시 500 에러)"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </FormItem>

        <FormItem label="용의자 파일">
          <FileInputWrapper>
            <Input
              readOnly
              placeholder="오른쪽 버튼을 눌러 파일을 선택해주세요"
              value={formData.filePath}
              style={{ paddingRight: '100px' }}
            />
            <FileFindButton
              type="button"
              variant="secondary"
              size="small"
              onClick={() => setIsFileSelectorOpen(true)}
            >
              파일 찾기
            </FileFindButton>
          </FileInputWrapper>
        </FormItem>

        <FormItem label="피해 내역 (에러 로그)">
          <Input
            multiline
            placeholder="발생한 에러 메시지나 구체적인 증상을 상세히 기술해주세요."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormItem>

        <FormItem label="수사 범위">
          <Select
            options={periodOptions}
            value={formData.period}
            onChange={(e) =>
              setFormData({ ...formData, period: e.target.value })
            }
          />
        </FormItem>

        <Button
          type="submit"
          size="large"
          fullWidth
          disabled={createJudgment.isPending}
        >
          {createJudgment.isPending ? '접수 중...' : '범인 찾기'}
        </Button>
      </Form>

      <FileSelector
        isOpen={isFileSelectorOpen}
        onClose={() => setIsFileSelectorOpen(false)}
        onSelect={(path) => setFormData({ ...formData, filePath: path })}
        owner={owner}
        repo={repo}
      />

      {currentScene && (
        <ObjectionOverlay>
          <PlayerWrapper>
            <ObjectionPlayer
              key={`${currentScene.character}-${currentSceneIndex}`}
              character={currentScene.character}
              nameplate={currentScene.nameplate}
              text={currentScene.text}
              assetsBasePath="/objection-assets"
              onComplete={handleSceneComplete}
            />
          </PlayerWrapper>
          <SkipButton type="button" onClick={handleSceneComplete}>
            건너뛰기
          </SkipButton>
        </ObjectionOverlay>
      )}
    </FormCard>
  );
}

const FileFindButton = styled(Button)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`;

const FormCard = styled.div`
  background-color: ${color.darkgray};
  border-radius: 16px;
  padding: 40px;
  border: 1px solid ${color.gray3};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FileInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ObjectionOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  z-index: 2000;
`;

const PlayerWrapper = styled.div`
  width: min(900px, 90vw);
  height: min(540px, 70vh);
  border: 1px solid ${color.gray3};
  border-radius: 16px;
  overflow: hidden;
  background: ${color.darkgray};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const SkipButton = styled.button`
  ${font.p2}
  color: ${color.lightgray};
  background: transparent;
  border: 1px dashed ${color.gray3};
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${color.white};
    border-color: ${color.white};
  }
`;
