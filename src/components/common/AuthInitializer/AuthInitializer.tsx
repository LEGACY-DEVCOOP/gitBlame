'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthInitializer = () => {
  const router = useRouter();

  useEffect(() => {
    // Check for token in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Save token
      // ⚠️ Security Note: Storing JWT in localStorage is vulnerable to XSS attacks.
      // For production, consider using httpOnly cookies instead.
      // See: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage
      localStorage.setItem('accessToken', token);

      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirect to main app
      router.push('/main');
    }
  }, [router]);

  return null;
};

export default AuthInitializer;
