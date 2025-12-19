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
