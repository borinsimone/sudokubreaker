import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Board from './Board';
import Sudoku from './Sudoku';

function App() {
  // Stato per gestire il caricamento iniziale dell'app
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    /**
     * Aggiorna l'altezza del viewport per dispositivi mobili
     * Gestisce il problema della barra degli indirizzi sui mobile browser
     */
    function updateVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Aggiorna viewport al ridimensionamento
    window.addEventListener('resize', updateVh);
    updateVh(); // Chiamata iniziale

    // Simula progresso di caricamento realistico
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Attesa aggiuntiva per mostrare il completamento
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        // Progresso non lineare per sembrare più realistico
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateVh);
      clearInterval(progressInterval);
    };
  }, []);

  // Funzione per saltare la splash screen
  const skipSplash = () => {
    setLoadingProgress(100);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <Container>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          // Splash screen potenziata con animazioni avanzate
          <SplashScreen
            key='splash'
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Elementi di sfondo fluttuanti */}
            <FloatingElements>
              {[...Array(8)].map((_, i) => (
                <FloatingNumber
                  key={i}
                  as={motion.div}
                  initial={{
                    x:
                      Math.random() *
                      (typeof window !== 'undefined'
                        ? window.innerWidth
                        : 1000),
                    y:
                      Math.random() *
                      (typeof window !== 'undefined'
                        ? window.innerHeight
                        : 800),
                    opacity: 0,
                  }}
                  animate={{
                    y: [
                      Math.random() *
                        (typeof window !== 'undefined'
                          ? window.innerHeight
                          : 800),
                      Math.random() *
                        (typeof window !== 'undefined'
                          ? window.innerHeight
                          : 800) -
                        100,
                      Math.random() *
                        (typeof window !== 'undefined'
                          ? window.innerHeight
                          : 800),
                    ],
                    x: [
                      Math.random() *
                        (typeof window !== 'undefined'
                          ? window.innerWidth
                          : 1000),
                      Math.random() *
                        (typeof window !== 'undefined'
                          ? window.innerWidth
                          : 1000) -
                        50,
                      Math.random() *
                        (typeof window !== 'undefined'
                          ? window.innerWidth
                          : 1000),
                    ],
                    opacity: [0, 0.2, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                  style={{
                    fontSize: `${1 + Math.random() * 1.5}rem`,
                    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
                  }}
                >
                  {Math.floor(Math.random() * 9) + 1}
                </FloatingNumber>
              ))}
            </FloatingElements>

            {/* Logo principale con effetti avanzati */}
            <SplashLogo
              as={motion.div}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1.5,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              <LogoContainer
                as={motion.div}
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                🧩
              </LogoContainer>

              {/* Anelli rotanti attorno al logo - ALLINEATI */}
              <LogoRing
                as={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <LogoRingSecond
                as={motion.div}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            </SplashLogo>

            {/* Titolo con effetto di battitura */}
            <SplashTitle
              as={motion.h1}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {'SudokuBreaker()'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.3,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </SplashTitle>

            {/* Sottotitolo animato */}
            <SplashSubtitle
              as={motion.p}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              Risolvi ogni puzzle automaticamente
            </SplashSubtitle>

            {/* Caratteristiche principali */}
            <FeaturesList
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              {[
                '🎯 Algoritmo di Backtracking',
                '✨ Animazioni Fluide',
                '📱 Design Responsivo',
                '🚀 Risoluzione Automatica',
              ].map((feature, index) => (
                <FeatureItem
                  key={index}
                  as={motion.div}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 2.8 + index * 0.2,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  {feature}
                </FeatureItem>
              ))}
            </FeaturesList>

            {/* Barra di progresso avanzata */}
            <ProgressContainer
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.5 }}
            >
              <ProgressLabel>
                Caricamento: {Math.round(loadingProgress)}%
              </ProgressLabel>
              <ProgressBarContainer>
                <ProgressBar
                  as={motion.div}
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <ProgressGlow
                  as={motion.div}
                  animate={{
                    x: [`-100%`, `${loadingProgress * 3}%`],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </ProgressBarContainer>
            </ProgressContainer>

            {/* Bottone Skip */}
            <SkipButton
              as={motion.button}
              initial={{ opacity: 0 }}
              animate={{ opacity: loadingProgress > 20 ? 1 : 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={skipSplash}
              transition={{ duration: 0.3 }}
            >
              Salta ⏭️
            </SkipButton>

            {/* Crediti */}
            <Credits
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 4, duration: 1 }}
            >
              Creato da Simone Borin
            </Credits>
          </SplashScreen>
        ) : (
          // App principale con animazione di entrata migliorata
          <MainApp
            key='main'
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Sudoku />
          </MainApp>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default App;

// Styled Components potenziati

const Container = styled.div`
  /* Container principale dell'applicazione */
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const SplashScreen = styled.div`
  /* Schermata di caricamento potenziata */
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  text-align: center;
  position: absolute;
  padding: 20px;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(120, 119, 198, 0.4) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(120, 119, 198, 0.3) 0%,
        transparent 50%
      );
    animation: backgroundMove 8s ease-in-out infinite;
  }

  @keyframes backgroundMove {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-10px) rotate(0.5deg);
    }
    66% {
      transform: translateY(5px) rotate(-0.5deg);
    }
  }
`;

const FloatingElements = styled.div`
  /* Container per elementi fluttuanti */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    display: none; /* Nasconde su mobile per prestazioni */
  }
`;

const FloatingNumber = styled.div`
  /* Numeri fluttuanti di sfondo */
  position: absolute;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  pointer-events: none;
`;

const SplashLogo = styled.div`
  /* Container logo con effetti - CENTRATO CORRETTAMENTE */
  position: relative;
  margin-bottom: 30px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const LogoContainer = styled.div`
  /* Logo principale */
  font-size: 8rem;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 5rem;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const LogoRing = styled.div`
  /* Primo anello rotante - CENTRATO */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: rgba(255, 215, 0, 0.8);
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    border-width: 2px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const LogoRingSecond = styled.div`
  /* Secondo anello rotante - CENTRATO */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom-color: rgba(255, 215, 0, 0.6);
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    border-width: 2px;
  }

  @media (max-width: 480px) {
    width: 130px;
    height: 130px;
  }
`;

const SplashTitle = styled.h1`
  /* Titolo principale potenziato */
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(45deg, #ffd700, #ffa500, #ff6b6b, #4ecdc4);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rainbowShift 4s ease infinite;
  z-index: 2;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  line-height: 1.2;

  @keyframes rainbowShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 50%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SplashSubtitle = styled.p`
  /* Sottotitolo potenziato */
  font-size: 1.4rem;
  margin-bottom: 30px;
  opacity: 0.9;
  font-weight: 300;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FeaturesList = styled.div`
  /* Lista delle caratteristiche */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 40px;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 25px;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-bottom: 20px;
  }
`;

const FeatureItem = styled.div`
  /* Singola caratteristica */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.8rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 0.75rem;
  }
`;

const ProgressContainer = styled.div`
  /* Container barra di progresso */
  width: 100%;
  max-width: 400px;
  margin-bottom: 30px;
  z-index: 2;
  padding: 0 20px;

  @media (max-width: 768px) {
    max-width: 300px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    max-width: 250px;
  }
`;

const ProgressLabel = styled.div`
  /* Etichetta progresso */
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ProgressBarContainer = styled.div`
  /* Container barra di progresso */
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    height: 6px;
  }
`;

const ProgressBar = styled.div`
  /* Barra di progresso */
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffa500, #ff6b6b);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  position: relative;
`;

const ProgressGlow = styled.div`
  /* Effetto glow sulla barra */
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  border-radius: 10px;
`;

const SkipButton = styled.button`
  /* Bottone per saltare */
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 12px 24px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
    border-radius: 20px;
  }
`;

const Credits = styled.div`
  /* Crediti */
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  font-weight: 300;
  z-index: 2;

  @media (max-width: 768px) {
    bottom: 20px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    bottom: 15px;
    font-size: 0.7rem;
  }
`;

const MainApp = styled.div`
  /* Container dell'app principale */
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
