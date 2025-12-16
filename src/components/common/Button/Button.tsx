'use client';

import styled from '@emotion/styled';
import { ComponentPropsWithoutRef } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';
import { css } from '@emotion/react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: 8px 12px;
          font-size: 0.875rem;
          border-radius: 8px;
        `;
      case 'large':
        return css`
          padding: 20px;
          ${font.H2}
        `;
      case 'medium':
      default:
        return css`
          padding: 10px 16px;
          ${font.p2}
        `;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          box-sizing: border-box;
          background-color: ${color.primary};
          color: ${color.white};
          border: none;

          &:hover:not(:disabled) {
            background-color: #d00201;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(240, 2, 1, 0.3);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return css`
          background-color: #333;
          color: ${color.white};
          border: 1px solid #555;

          &:hover:not(:disabled) {
            background-color: ${color.primary};
            border-color: ${color.primary};
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          border: 1px solid ${color.lightgray};
          color: ${color.white};

          &:hover:not(:disabled) {
            border-color: ${color.white};
            background-color: rgba(255, 255, 255, 0.1);
          }
        `;
    }
  }}
`;
