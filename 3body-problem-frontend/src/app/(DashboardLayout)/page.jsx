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
          Problem: The three-body problem, a complex challenge in celestial mechanics, lacks a general solution, making it difficult for users to predict the motion of three interacting celestial bodies. Existing tools often don't allow for personalized exploration or community engagement.

Solution: We are building a dynamic website where users can input their own parameters and equations to simulate the three-body problem. The platform will feature interactive simulations, community-driven ranking, and visualization tools, empowering users to explore, share, and learn from each other’s simulations.
          </p>
        </div>
      )}
    </PageContainer>
  );
}
