'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';

interface FormItemProps {
  label: string;
  children: ReactNode;
  required?: boolean;
}

const FormItem = ({ label, children, required }: FormItemProps) => {
  return (
    <Container>
      <Label>
        {label}
        {required && <RequiredMark>*</RequiredMark>}
      </Label>
      {children}
    </Container>
  );
};

export default FormItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Label = styled.label`
  ${font.H2}
  color: ${color.white};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 18px;
    background-color: ${color.primary};
    border-radius: 2px;
  }
`;

const RequiredMark = styled.span`
  color: ${color.primary};
  margin-left: 4px;
`;
