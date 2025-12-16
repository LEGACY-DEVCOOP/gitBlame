'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import { mockFileTree } from '@/mocks/fileTree';
import FileTreeItem from './FileTreeItem';
import Button from '@/components/common/Button/Button';

interface FileSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
}

const FileSelector = ({ isOpen, onClose, onSelect }: FileSelectorProps) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

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
          <FileTreeItem
            node={mockFileTree}
            selectedPath={selectedPath}
            onSelect={setSelectedPath}
            onConfirm={handleItemConfirm}
          />
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
