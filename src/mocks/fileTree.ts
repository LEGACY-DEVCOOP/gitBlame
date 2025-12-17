export interface FileNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileNode[];
}

export const mockFileTree: FileNode = {
  name: 'gitblame',
  type: 'folder',
  path: 'gitblame',
  children: [
    {
      name: 'src',
      type: 'folder',
      path: 'src',
      children: [
        {
          name: 'app',
          type: 'folder',
          path: 'src/app',
          children: [
            {
              name: 'page.tsx',
              type: 'file',
              path: 'src/app/page.tsx',
            },
            {
              name: 'layout.tsx',
              type: 'file',
              path: 'src/app/layout.tsx',
            },
          ],
        },
        {
          name: 'components',
          type: 'folder',
          path: 'src/components',
          children: [
            {
              name: 'Button.tsx',
              type: 'file',
              path: 'src/components/Button.tsx',
            },
            {
              name: 'Input.tsx',
              type: 'file',
              path: 'src/components/Input.tsx',
            },
          ],
        },
        {
          name: 'utils',
          type: 'folder',
          path: 'src/utils',
          children: [
            {
              name: 'date.ts',
              type: 'file',
              path: 'src/utils/date.ts',
            },
          ],
        },
      ],
    },
    {
      name: 'public',
      type: 'folder',
      path: 'public',
      children: [
        {
          name: 'logo.png',
          type: 'file',
          path: 'public/logo.png',
        },
      ],
    },
    {
      name: 'README.md',
      type: 'file',
      path: 'README.md',
    },
    {
      name: 'package.json',
      type: 'file',
      path: 'package.json',
    },
  ],
};
