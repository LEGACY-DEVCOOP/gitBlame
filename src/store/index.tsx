import { create } from 'zustand';

// 판결 정보의 타입을 정의합니다.
// summary 페이지에서 계산되는 데이터 구조를 기반으로 합니다.
interface CaseInfo {
  title: string;
  caseNumber: string;
  date: string;
  complainant: string;
  accused: string[];
  summary: string;
}

interface Suspect {
  name: string;
  role: string;
  description: string;
  percentage: number;
}

// 스토어의 상태와 액션을 정의합니다.
interface VerdictState {
  caseInfo: CaseInfo | null;
  suspects: Suspect[];
  repoFullName: string | null;
  setVerdict: (data: {
    caseInfo: CaseInfo | null;
    suspects: Suspect[];
    repoFullName: string | null;
  }) => void;
  clearVerdict: () => void;
}

// Zustand 스토어를 생성합니다.
export const useVerdictStore = create<VerdictState>((set) => ({
  // 초기 상태
  caseInfo: null,
  suspects: [],
  repoFullName: null,

  // 액션: 판결 정보를 상태에 저장합니다.
  setVerdict: (data) =>
    set({
      caseInfo: data.caseInfo,
      suspects: data.suspects,
      repoFullName: data.repoFullName,
    }),

  // 액션: 판결 정보를 초기화합니다.
  clearVerdict: () => set({ caseInfo: null, suspects: [], repoFullName: null }),
}));
