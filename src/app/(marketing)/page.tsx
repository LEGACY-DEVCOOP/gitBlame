'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Image from 'next/image';
import color from '@/styles/color';
import { authApi } from '@/service/api';

const LandingPage = () => {
  return (
    <StyledLandingPage>
      <AnimatedBackground />

      <ContentWrapper>
        <LogoSection>
          <LogoImage
            src="/gitblame_text_logo.png"
            alt="GitBlame Logo"
            width={320}
            height={80}
            priority
          />
        </LogoSection>

        <LoginButton onClick={authApi.login}>
          <GithubIcon
            src="/github-mark.png"
            alt="GitBlame Login"
            width={24}
            height={24}
          />
          <span>GITHUB</span>
        </LoginButton>
      </ContentWrapper>
    </StyledLandingPage>
  );
};

export default LandingPage;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledLandingPage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${color.marketingBg};
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  background: linear-gradient(
    135deg,
    ${color.marketingBg} 0%,
    ${color.marketingGradient1} 20%,
    ${color.marketingGradient2} 40%,
    ${color.marketingPrimary} 60%,
    ${color.marketingSecondary} 80%,
    ${color.marketingBg} 100%
  );
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  opacity: 0.6;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(
      circle,
      rgba(255, 69, 0, 0.4) 0%,
      rgba(255, 107, 53, 0.3) 30%,
      rgba(255, 140, 66, 0.2) 50%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(60px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 60%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(255, 107, 53, 0.3) 0%,
      rgba(255, 140, 66, 0.2) 40%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(50px);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 80px;
    width: auto;
    object-fit: contain;

    @media (max-width: 768px) {
      height: 60px;
    }
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  background: white;
  color: ${color.black};
  border: none;
  border-radius: 9999px;

  padding: 1rem 3rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LogoImage = styled(Image)`
  height: 80px;
  width: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const GithubIcon = styled(Image)`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
