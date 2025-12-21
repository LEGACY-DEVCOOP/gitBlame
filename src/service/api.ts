import apiClient from '@/lib/axios';

// Types
export interface User {
  id: string;
  username: string;
  avatar_url: string;
  created_at: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
  };
  // Add other fields as needed
}

export interface Contributor {
  username: string;
  avatar_url: string;
  commits: number;
  additions: number;
  deletions: number;
  percentage: number;
}

export interface Commit {
  sha: string;
  message: string;
  author: {
    username: string;
    avatar_url: string;
  };
  date: string;
  additions: number;
  deletions: number;
}

export interface RepoParams {
  page?: number;
  per_page?: number;
  sort?: string;
}

export interface CommitParams {
  path?: string;
  since?: string;
  per_page?: number;
}

// Judgments Types
export interface Suspect {
  username: string;
  responsibility: number;
  reason: string;
  last_commit_msg?: string;
}

export interface Judgment {
  id: string;
  case_number: string;
  repo_owner: string;
  repo_name: string;
  title: string;
  description: string;
  file_path: string;
  period_days: number;
  status: 'pending' | 'completed';
  suspects?: Suspect[];
  created_at: string;
}

export interface CreateJudgmentRequest {
  repo_owner: string;
  repo_name: string;
  title: string;
  description: string;
  file_path: string;
  period_days: number;
}

export interface Blame {
  id: string;
  judgment_id: string;
  target_username: string;
  message: string;
  intensity: 'mild' | 'medium' | 'spicy';
  image_url?: string;
  created_at: string;
}

export interface CreateBlameRequest {
  intensity: 'mild' | 'medium' | 'spicy';
}

export interface JudgmentListParams {
  status?: 'pending' | 'completed';
  page?: number;
  per_page?: number;
}

// Authentication APIs
export const authApi = {
  login: () => {
    // Redirects to backend login
    window.location.href = `${apiClient.defaults.baseURL}/auth/github/login`;
  },

  // Note: Callback is likely handled by the page component extracting params
  // but if we need an API call to exchange code (though spec says backend handles it and redirects with token)
  // Actually spec says:
  // 2. Client is redirected to /auth/github/callback on backend
  // Backend redirects to frontend with ?token=JWT_TOKEN
  // So there is no explicit API call from frontend for step 2.

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/auth/me');
    return data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  },
};

// GitHub Data APIs
export const githubApi = {
  getRepos: async (params?: RepoParams): Promise<Repository[]> => {
    const { data } = await apiClient.get<{ items: Repository[] }>(
      '/github/repos',
      { params }
    );
    return data.items;
  },

  getRepo: async (id: string): Promise<Repository> => {
    const { data } = await apiClient.get<Repository>(`/github/repos/${id}`);
    return data;
  },

  getContributors: async (
    owner: string,
    repo: string
  ): Promise<Contributor[]> => {
    const { data } = await apiClient.get<{
      contributors: Contributor[];
      total_commits: number;
    }>(`/github/repos/${owner}/${repo}/contributors`);
    return data.contributors || [];
  },

  getCommits: async (
    owner: string,
    repo: string,
    params?: CommitParams
  ): Promise<Commit[]> => {
    const { data } = await apiClient.get<{ commits: Commit[] }>(
      `/github/repos/${owner}/${repo}/commits`,
      { params }
    );
    return data.commits || [];
  },
};

// Judgments APIs
export const judgmentsApi = {
  // 고소장 접수 (판결 생성)
  create: async (request: CreateJudgmentRequest): Promise<Judgment> => {
    const { data } = await apiClient.post<Judgment>('/judgments', request);
    return data;
  },

  // 판결 목록 조회
  getList: async (params?: JudgmentListParams): Promise<Judgment[]> => {
    const { data } = await apiClient.get<{ items: Judgment[] }>('/judgments', {
      params,
    });
    return data.items || [];
  },

  // 판결 상세 조회
  getById: async (judgmentId: string): Promise<Judgment> => {
    const { data } = await apiClient.get<Judgment>(`/judgments/${judgmentId}`);
    return data;
  },

  // AI 용의자 분석
  analyze: async (judgmentId: string): Promise<Judgment> => {
    const { data } = await apiClient.post<Judgment>(
      `/judgments/${judgmentId}/analyze`
    );
    return data;
  },

  // 판결 삭제
  delete: async (judgmentId: string): Promise<void> => {
    await apiClient.delete(`/judgments/${judgmentId}`);
  },

  // 최종 판결 내리기 (Blame 생성)
  createBlame: async (
    judgmentId: string,
    request: CreateBlameRequest
  ): Promise<Blame> => {
    const { data } = await apiClient.post<Blame>(
      `/judgments/${judgmentId}/blame`,
      request
    );
    return data;
  },

  // 판결 결과 조회
  getBlame: async (judgmentId: string): Promise<Blame> => {
    const { data } = await apiClient.get<Blame>(
      `/judgments/${judgmentId}/blame`
    );
    return data;
  },

  // 판결문 이미지 생성
  createBlameImage: async (
    judgmentId: string
  ): Promise<{ image_url: string }> => {
    const { data } = await apiClient.post<{ image_url: string }>(
      `/judgments/${judgmentId}/blame/image`
    );
    return data;
  },
};
