import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  judgmentsApi,
  CreateJudgmentRequest,
  JudgmentListParams,
} from '@/service/api';

export const JUDGMENT_KEYS = {
  all: ['judgments'] as const,
  lists: () => [...JUDGMENT_KEYS.all, 'list'] as const,
  list: (params?: JudgmentListParams) =>
    [...JUDGMENT_KEYS.lists(), params] as const,
  details: () => [...JUDGMENT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...JUDGMENT_KEYS.details(), id] as const,
  blame: (id: string) => [...JUDGMENT_KEYS.all, 'blame', id] as const,
};

// 판결 목록 조회
export const useJudgments = (params?: JudgmentListParams) => {
  return useQuery({
    queryKey: JUDGMENT_KEYS.list(params),
    queryFn: () => judgmentsApi.getList(params),
  });
};

// 판결 상세 조회
export const useJudgment = (judgmentId: string) => {
  return useQuery({
    queryKey: JUDGMENT_KEYS.detail(judgmentId),
    queryFn: () => judgmentsApi.getById(judgmentId),
    enabled: !!judgmentId,
  });
};

// 판결 결과 조회
export const useBlame = (
  judgmentId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: JUDGMENT_KEYS.blame(judgmentId),
    queryFn: () => judgmentsApi.getBlame(judgmentId),
    enabled: options?.enabled !== undefined ? options.enabled : !!judgmentId,
    retry: false, // Blame이 아직 없을 수 있으므로 retry 안 함
  });
};

// 고소장 접수 (판결 생성)
export const useCreateJudgment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateJudgmentRequest) =>
      judgmentsApi.create(request),
    onSuccess: () => {
      // 판결 목록 무효화
      queryClient.invalidateQueries({ queryKey: JUDGMENT_KEYS.lists() });
    },
  });
};

// AI 용의자 분석
export const useAnalyzeJudgment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (judgmentId: string) => judgmentsApi.analyze(judgmentId),
    onSuccess: (data) => {
      // 해당 판결 상세 정보 무효화
      queryClient.invalidateQueries({
        queryKey: JUDGMENT_KEYS.detail(data.id),
      });
    },
  });
};

// 판결 삭제
export const useDeleteJudgment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (judgmentId: string) => judgmentsApi.delete(judgmentId),
    onSuccess: () => {
      // 판결 목록 무효화
      queryClient.invalidateQueries({ queryKey: JUDGMENT_KEYS.lists() });
    },
  });
};

// 최종 판결 내리기
export const useCreateBlame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (judgmentId: string) => judgmentsApi.createBlame(judgmentId),
    onSuccess: (data) => {
      // 해당 판결의 Blame 정보 무효화
      queryClient.invalidateQueries({
        queryKey: JUDGMENT_KEYS.blame(data.judgment_id),
      });
    },
  });
};

// 판결문 이미지 생성
export const useCreateBlameImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (judgmentId: string) =>
      judgmentsApi.createBlameImage(judgmentId),
    onSuccess: (_, judgmentId) => {
      // 해당 판결의 Blame 정보 무효화
      queryClient.invalidateQueries({
        queryKey: JUDGMENT_KEYS.blame(judgmentId),
      });
    },
  });
};
