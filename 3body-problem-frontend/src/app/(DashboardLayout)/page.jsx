'use client';
import { useEffect, useState } from 'react';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="This is the Dashboard">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">Loading...</div>
      ) : (
        <div className="text-center text-4xl p-10">
          <h1 className="mb-6">Hello World</h1>
          <p className="text-xl leading-relaxed">
            It is a default Next.js frontend application. In this, login, register, home page, forgot password, 
            profile page, authentication, and sidebar notification bar are given.
          </p>
        </div>
      )}
    </PageContainer>
  );
}
