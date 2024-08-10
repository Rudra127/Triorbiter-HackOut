// pages/index.js

import Head from 'next/head';
import ThreeBodySimulation from '../../components/threebody/ThreeBodySimulation';

export default function Home() {
  return (
    <div>
      <ThreeBodySimulation />
    </div>
  );
}
