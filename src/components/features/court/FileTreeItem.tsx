'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import { FileNode } from '@/mocks/fileTree';

interface FileTreeItemProps {
  node: FileNode;
  selectedPath: string | null;
  onSelect: (path: string) => void;
  onConfirm: (path: string) => void;
  depth?: number;
}

const FileTreeItem = ({
  node,
  selectedPath,
  onSelect,
  onConfirm,
  depth = 0,
}: FileTreeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.path);
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type !== 'folder') {
      onConfirm(node.path);
    }
  };

  return (
    <div>
      <ItemContainer
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        $isSelected={selectedPath === node.path}
        style={{ paddingLeft: depth * 20 }}
      >
        <Icon>{node.type === 'folder' ? (isOpen ? '📂' : '📁') : '📄'}</Icon>
        <Name>{node.name}</Name>
      </ItemContainer>
      {isOpen && node.children && (
        <ChildrenContainer>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.path}
              node={child}
              selectedPath={selectedPath}
              onSelect={onSelect}
              onConfirm={onConfirm}
              depth={depth + 1}
            />
          ))}
        </ChildrenContainer>
      )}
    </div>
  );
};

export default FileTreeItem;

const ItemContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: ${color.white};
  background-color: ${({ $isSelected }) =>
    $isSelected ? `rgba(${color.primaryRGB}, 0.2)` : 'transparent'};

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? `rgba(${color.primaryRGB}, 0.2)` : color.gray3};
  }
`;

const Icon = styled.span`
  font-size: 16px;
`;

const Name = styled.span`
  ${font.p2}
`;

const ChildrenContainer = styled.div``;
