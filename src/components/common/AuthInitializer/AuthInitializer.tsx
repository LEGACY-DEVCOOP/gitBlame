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
