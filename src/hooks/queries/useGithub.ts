import { useQuery } from '@tanstack/react-query';
import {
  githubApi,
  RepoParams,
  CommitParams,
  FileTreeParams,
} from '@/service/api';

export const GITHUB_KEYS = {
  all: ['github'] as const,
  repos: (params?: RepoParams) =>
    [...GITHUB_KEYS.all, 'repos', params] as const,
  contributors: (owner: string, repo: string) =>
    [...GITHUB_KEYS.all, 'contributors', owner, repo] as const,
  commits: (owner: string, repo: string, params?: CommitParams) =>
    [...GITHUB_KEYS.all, 'commits', owner, repo, params] as const,
  fileTree: (owner: string, repo: string, params?: FileTreeParams) =>
    [...GITHUB_KEYS.all, 'tree', owner, repo, params] as const,
};

export const useRepos = (params?: RepoParams) => {
  return useQuery({
    queryKey: GITHUB_KEYS.repos(params),
    queryFn: () => githubApi.getRepos(params),
  });
};

export const useRepo = (id: string | undefined) => {
  return useQuery({
    queryKey: [...GITHUB_KEYS.all, 'repo', id],
    queryFn: () => githubApi.getRepo(id!),
    enabled: !!id,
  });
};

export const useContributors = (owner: string, repo: string) => {
  return useQuery({
    queryKey: GITHUB_KEYS.contributors(owner, repo),
    queryFn: () => githubApi.getContributors(owner, repo),
    enabled: !!owner && !!repo,
  });
};

export const useCommits = (
  owner: string,
  repo: string,
  params?: CommitParams
) => {
  return useQuery({
    queryKey: GITHUB_KEYS.commits(owner, repo, params),
    queryFn: () => githubApi.getCommits(owner, repo, params),
    enabled: !!owner && !!repo,
  });
};

export const useFileTree = (
  owner: string,
  repo: string,
  params?: FileTreeParams
) => {
  return useQuery({
    queryKey: GITHUB_KEYS.fileTree(owner, repo, params),
    queryFn: () => githubApi.getFileTree(owner, repo, params),
    enabled: !!owner && !!repo,
  });
};
