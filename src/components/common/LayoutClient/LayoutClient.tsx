'use client';

import { Suspense } from 'react';
import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';
import GlobalStyle from '@/styles/global';
import Header from '@/components/common/Header/Header';
import AuthInitializer from '@/components/common/AuthInitializer/AuthInitializer';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient = ({ children }: LayoutClientProps) => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <>
      <GlobalStyle />
      <AuthInitializer />
      <Body>
        {!isLandingPage && (
          <Suspense
            fallback={<div style={{ height: '88px', background: '#000' }} />}
          >
            <Header />
          </Suspense>
        )}
        <Main>{children}</Main>
      </Body>
    </>
  );
};

export default LayoutClient;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  height: fit-content;
`;
