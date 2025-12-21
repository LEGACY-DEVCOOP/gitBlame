'use client';

import styled from '@emotion/styled';
import Image, { ImageProps } from 'next/image';
import color from '@/styles/color';
import { authApi } from '@/service/api';
import LiquidEther from '@/components/features/marketing/LiquidEther';

const LandingPage = () => {
  return (
    <StyledLandingPage>
      <LiquidEther
        className="liquid-ether-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

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

const StyledLandingPage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${color.marketingBg};
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

const LogoImage = styled(({ ...props }: ImageProps) => <Image {...props} />)`
  height: 80px;
  width: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const GithubIcon = styled(({ ...props }: ImageProps) => <Image {...props} />)`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
