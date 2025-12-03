'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import color from '@/styles/color';
import font from '@/styles/font';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const username = '문소정';
  return (
    <HeaderContainer>
      <Logo onClick={() => router.push('/main')}>
        <Image
          src="/gitblame_logo.png"
          alt="GitBlame Logo"
          width={40}
          height={40}
        />
        <LogoText>GITBLAME</LogoText>
      </Logo>
      <Username>@{username}</Username>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${color.black};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoText = styled.span`
  ${font.H1}
  color: ${color.white};
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const Username = styled.span`
  ${font.p1}
  color: ${color.white};
`;
