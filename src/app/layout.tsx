import type { Metadata } from 'next';
import LayoutClient from '@/components/common/LayoutClient/LayoutClient';
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'GITBLAME',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
        <QueryProvider>
          <LayoutClient>{children}</LayoutClient>
        </QueryProvider>
      </body>
    </html>
  );
};

export default Layout;
