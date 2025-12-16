'use client';

import styled from '@emotion/styled';
import { ComponentPropsWithoutRef } from 'react';
import color from '@/styles/color';
import font from '@/styles/font';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  options: SelectOption[];
  fullWidth?: boolean;
  placeholder?: string;
}

const Select = ({
  options,
  fullWidth = true,
  placeholder,
  ...props
}: SelectProps) => {
  return (
    <StyledSelectWrapper $fullWidth={fullWidth}>
      <StyledSelect $fullWidth={fullWidth} {...props}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </StyledSelectWrapper>
  );
};

export default Select;

const StyledSelectWrapper = styled.div<{ $fullWidth: boolean }>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const StyledSelect = styled.select<{ $fullWidth: boolean }>`
  ${font.p1}
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  background-color: ${color.black};
  border: 1px solid ${color.gray3};
  border-radius: 12px;
  padding: 18px 20px;
  color: ${color.white};
  outline: none;
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 20px;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 2px rgba(${color.primaryRGB}, 0.1);
  }

  &::placeholder {
    color: ${color.lightgray};
  }
`;
