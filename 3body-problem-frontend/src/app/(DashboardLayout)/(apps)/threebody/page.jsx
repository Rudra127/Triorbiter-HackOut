// pages/index.js

import Head from 'next/head';
import ThreeBodySimulation from '../../components/threebody/ThreeBodySimulation';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Three-Body Problem Simulation</title>
        <meta name="description" content="A simulation of the Three-Body Problem using p5.js" />
      </Head>
      <main>
        <h1>Three-Body Problem Simulation</h1>
        <ThreeBodySimulation />
      </main>
    </div>
  );
}

