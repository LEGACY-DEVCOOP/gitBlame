export const metadata = {
  title: 'GITBLAME',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
        {children}
      </body>
    </html>
  );
};

export default Layout;
