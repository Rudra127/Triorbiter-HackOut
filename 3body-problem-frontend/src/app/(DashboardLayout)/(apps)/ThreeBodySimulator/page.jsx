// pages/index.js
'use client';
import Head from 'next/head';
import ThreeBodySimulation from '../../components/threebody/ThreeBodySimulation';
import useAuth from '@/app/hooks/useAuth';

export default function Page() {
  useAuth();
  return (
    <div>
      <ThreeBodySimulation />
    </div>
  );
}
