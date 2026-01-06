import React from 'react';
import Navbar from './components/Navigation/Navbar';
import ParticleWave from './components/Layout/ParticleWave';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import RobotChaos from './components/Layout/RobotChaos';
import CursorChange from './components/Layout/CursorChange';

function App() {
  return (
    <>
      <RobotChaos />
      <CursorChange />
      <ParticleWave />
      <Navbar />

      <main>
        <Hero />
        <Portfolio />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
