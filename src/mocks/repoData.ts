import { ContributorData } from '@/types/contributor';

export interface RepoStats {
  stars: string;
  forks: string;
  contributors: string;
  totalCommits: string;
}

export interface RecentCommit {
  id: number;
  message: string;
  author: string;
  date: string;
  hash: string;
}

export const mockRepoStats: RepoStats = {
  stars: '2.1k',
  forks: '387',
  contributors: '12',
  totalCommits: '1,247',
};

export const mockContributorData: ContributorData[] = [
  { id: '1', name: 'munsojeong', commits: 453, lines: 12840, percentage: 36 },
  { id: '2', name: 'devjohn', commits: 287, lines: 8950, percentage: 23 },
  { id: '3', name: 'codealice', commits: 198, lines: 6420, percentage: 16 },
  { id: '4', name: 'techbob', commits: 156, lines: 4830, percentage: 12 },
  { id: '5', name: 'reactsue', commits: 98, lines: 3210, percentage: 8 },
  { id: '6', name: 'gitmaster', commits: 65, lines: 1750, percentage: 5 },
];

export const mockRecentCommits: RecentCommit[] = [
  {
    id: 1,
    message: 'feat: implement user authentication with NextAuth.js',
    author: 'munsojeong',
    date: '2024-12-11',
    hash: 'a7f3d2e',
  },
  {
    id: 2,
    message: 'fix: resolve memory leak in chart component rendering',
    author: 'devjohn',
    date: '2024-12-10',
    hash: 'b4e8c1f',
  },
  {
    id: 3,
    message: 'refactor: migrate from REST API to GraphQL endpoints',
    author: 'codealice',
    date: '2024-12-10',
    hash: 'c9a5f7d',
  },
  {
    id: 4,
    message: 'style: update design system with new color tokens',
    author: 'techbob',
    date: '2024-12-09',
    hash: 'd2c8e4b',
  },
  {
    id: 5,
    message: 'docs: add comprehensive API documentation',
    author: 'reactsue',
    date: '2024-12-09',
    hash: 'e6f1a9c',
  },
  {
    id: 6,
    message: 'perf: optimize bundle size by implementing code splitting',
    author: 'gitmaster',
    date: '2024-12-08',
    hash: 'f3d7b2a',
  },
];
