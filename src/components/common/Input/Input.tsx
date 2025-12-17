'use client';

import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';

type BaseProps = {
  fullWidth?: boolean;
};

type InputProps =
  | ({ multiline?: false } & BaseProps & ComponentPropsWithoutRef<'input'>)
  | ({ multiline: true } & BaseProps & ComponentPropsWithoutRef<'textarea'>);

const Input = ({ fullWidth = true, multiline, ...props }: InputProps) => {
  if (multiline) {
    const textareaProps = props as ComponentPropsWithoutRef<'textarea'>;
    return <StyledTextarea $fullWidth={fullWidth} {...textareaProps} />;
  }
  const inputProps = props as ComponentPropsWithoutRef<'input'>;
  return <StyledInput $fullWidth={fullWidth} {...inputProps} />;
};

export default Input;

const StyledInput = styled.input<{ $fullWidth: boolean }>`
  ${font.p1}
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: 18px 20px;
  background: ${color.black};
  border: 1px solid ${color.gray3};
  border-radius: 12px;
  color: ${color.white};
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${color.lightgray};
  }

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 2px rgba(${color.primaryRGB}, 0.1);
  }

  &:read-only,
  &:disabled {
    background-color: ${color.gray1};
    cursor: default;
    color: ${color.lightgray};
    border-color: ${color.gray2};

    &:focus {
      border-color: ${color.gray2};
      box-shadow: none;
    }
  }
`;

const StyledTextarea = styled.textarea<{ $fullWidth: boolean }>`
  ${font.p1}
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: 18px 20px;
  background: ${color.black};
  border: 1px solid ${color.gray3};
  border-radius: 12px;
  color: ${color.white};
  outline: none;
  min-height: 200px;
  resize: vertical;
  line-height: 1.6;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${color.lightgray};
  }

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 2px rgba(${color.primaryRGB}, 0.1);
  }
`;
