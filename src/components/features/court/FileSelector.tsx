'use client';

import styled from '@emotion/styled';
import { useEffect, useState, useMemo } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import { FileNode } from '@/mocks/fileTree';
import FileTreeItem from './FileTreeItem';
import Button from '@/components/common/Button/Button';
import { useFileTree } from '@/hooks/queries/useGithub';
import { FileTreeItem as APIFileTreeItem } from '@/service/api';

interface FileSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  owner: string;
  repo: string;
}

// Transform API response to FileNode structure
function transformToFileNode(items: APIFileTreeItem[]): FileNode {
  const root: FileNode = {
    name: 'root',
    type: 'folder',
    path: '',
    children: [],
  };

  // Build a map of path -> node
  const nodeMap = new Map<string, FileNode>();
  nodeMap.set('', root);

  // Sort items by path depth to ensure parent folders are created first
  const sortedItems = [...items].sort((a, b) => {
    const depthA = a.path.split('/').length;
    const depthB = b.path.split('/').length;
    return depthA - depthB;
  });

  for (const item of sortedItems) {
    const pathParts = item.path.split('/');
    const name = pathParts[pathParts.length - 1];
    const parentPath = pathParts.slice(0, -1).join('/');

    const node: FileNode = {
      name,
      type: item.type === 'blob' ? 'file' : 'folder',
      path: item.path,
      children: item.type === 'tree' ? [] : undefined,
    };

    nodeMap.set(item.path, node);

    // Add to parent
    const parent = nodeMap.get(parentPath);
    if (parent && parent.children) {
      parent.children.push(node);
    }
  }

  return root;
}

const FileSelector = ({
  isOpen,
  onClose,
  onSelect,
  owner,
  repo,
}: FileSelectorProps) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const {
    data: fileTreeData,
    isLoading,
    error,
  } = useFileTree(owner, repo, undefined, { enabled: !!owner && !!repo });

  const fileTree = useMemo(() => {
    if (!fileTreeData) return null;
    return transformToFileNode(fileTreeData.tree);
  }, [fileTreeData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedPath(null); // Reset selection when opened
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedPath) {
      onSelect(selectedPath);
      onClose();
    }
  };

  const handleItemConfirm = (path: string) => {
    onSelect(path);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>용의자 파일 선택</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>
        <Content>
          {isLoading && (
            <LoadingMessage>파일 트리를 불러오는 중...</LoadingMessage>
          )}
          {error && (
            <ErrorMessage>파일 트리를 불러오는데 실패했습니다.</ErrorMessage>
          )}
          {fileTree && fileTree.children && (
            <>
              {fileTree.children.map((child) => (
                <FileTreeItem
                  key={child.path}
                  node={child}
                  selectedPath={selectedPath}
                  onSelect={setSelectedPath}
                  onConfirm={handleItemConfirm}
                />
              ))}
            </>
          )}
        </Content>
        <Footer>
          <Button variant="outline" size="small" onClick={onClose}>
            취소
          </Button>
          <Button size="small" onClick={handleConfirm} disabled={!selectedPath}>
            선택 완료
          </Button>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

export default FileSelector;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  height: 80vh;
  background-color: ${color.darkgray};
  border-radius: 16px;
  border: 1px solid ${color.gray3};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${color.gray3};
`;

const Title = styled.h2`
  ${font.H2}
  color: ${color.white};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${color.lightgray};
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;

  &:hover {
    color: ${color.white};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid ${color.gray3};
  background-color: ${color.darkgray};
`;

const ErrorMessage = styled.div`
  ${font.p1}
  color: ${color.primary};
  text-align: center;
  padding: 40px 20px;
`;

const LoadingMessage = styled.div`
  ${font.p1}
  color: ${color.primary};
  text-align: center;
  padding: 40px 20px;
`;