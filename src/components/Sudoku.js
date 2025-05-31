import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

function Sudoku() {
  // Griglia sudoku iniziale vuota (9x9)
  let initial = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // Stati dell'applicazione
  const [sudokuArr, setSudokuArr] = useState(initial); // Array principale del sudoku
  const [error, setError] = useState(false); // Stato per errori di validazione
  const [loading, setLoading] = useState(false); // Stato di caricamento durante risoluzione
  const [completed, setCompleted] = useState(false); // Stato di completamento
  const [solvingCell, setSolvingCell] = useState(null); // Cella attualmente in risoluzione
  const [showParticles, setShowParticles] = useState(false); // Effetti particellari

  // Riferimenti per ogni cella della griglia (9x9 refs)
  const cellRefs = useRef([]);
  cellRefs.current = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => React.createRef())
  );

  /**
   * Gestisce l'input dell'utente in una cella
   * @param {Event} e - Evento di input
   * @param {number} row - Riga della cella
   * @param {number} col - Colonna della cella
   */
  function onInputChange(e, row, col) {
    let val = Number(e.target.value);

    // Verifica che l'input sia un numero valido (1-9)
    if (val >= 1 && val <= 9) {
      if (isValidMove(sudokuArr, row, col, val)) {
        // Aggiorna la griglia con il nuovo valore
        setSudokuArr((prevState) => {
          const updatedGrid = [...prevState];
          updatedGrid[row][col] = val;
          return updatedGrid;
        });

        // Animazione di successo per la cella
        animateSuccessCell(e.currentTarget);
      } else {
        // Animazione di errore per input non valido
        animateErrorCell(e.currentTarget);
      }
    }
  }

  /**
   * Animazione per input valido
   * @param {HTMLElement} target - Elemento da animare
   */
  function animateSuccessCell(target) {
    target.style.transform = 'scale(1.1)';
    target.style.backgroundColor = '#90EE90';
    setTimeout(() => {
      target.style.transform = 'scale(1)';
      target.style.backgroundColor = '#edf5e1';
    }, 300);
  }

  /**
   * Animazione per input non valido
   * @param {HTMLElement} target - Elemento da animare
   */
  function animateErrorCell(target) {
    target.style.outline = '3px solid #ff4444';
    target.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      target.style.outline = 'none';
      target.style.animation = '';
    }, 700);
  }

  /**
   * Gestisce la cancellazione di valori tramite backspace
   * @param {Event} e - Evento di tastiera
   * @param {number} row - Riga della cella
   * @param {number} col - Colonna della cella
   */
  function deleteValue(e, row, col) {
    if (e.key === 'Backspace') {
      setSudokuArr((prevState) => {
        const updatedGrid = [...prevState];
        updatedGrid[row][col] = 0;
        return updatedGrid;
      });
    }
  }

  /**
   * Verifica se una mossa è valida secondo le regole del Sudoku
   * @param {Array} board - Griglia di gioco
   * @param {number} row - Riga
   * @param {number} col - Colonna
   * @param {number} num - Numero da inserire
   * @returns {boolean} - True se la mossa è valida
   */
  function isValidMove(board, row, col, num) {
    // Verifica riga e colonna
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    // Verifica sottoquadrato 3x3
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Imposta il colore di sfondo per una cella durante la risoluzione
   * @param {number} row - Riga della cella
   * @param {number} col - Colonna della cella
   */
  function setCellBackground(row, col) {
    const cellRef = cellRefs.current[row][col];
    if (cellRef && cellRef.current) {
      cellRef.current.style.backgroundColor = '#FFD700';
      cellRef.current.style.transform = 'scale(1.1)';
      setTimeout(() => {
        cellRef.current.style.transform = 'scale(1)';
        cellRef.current.style.backgroundColor = '#e7eaa4';
      }, 100);
    }
  }

  /**
   * Verifica la validità della griglia prima di iniziare la risoluzione
   */
  function checkBoard() {
    // Controlla se la griglia è vuota
    if (JSON.stringify(sudokuArr) === JSON.stringify(initial)) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      solveSudoku();
    }
  }

  /**
   * Algoritmo principale per risolvere il Sudoku con animazioni
   */
  async function solveSudoku() {
    setLoading(true);
    setShowParticles(true);

    // Crea una copia della griglia per lavorarci
    let sudokuBuffer = JSON.parse(JSON.stringify(sudokuArr));

    if (sudokuHelper(sudokuBuffer)) {
      // Animazione della risoluzione cella per cella
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          // Evidenzia la cella corrente
          setSolvingCell({ row, col });
          setCellBackground(row, col);

          // Aggiorna la griglia visivamente
          setSudokuArr((prevState) => {
            const updatedGrid = [...prevState];
            updatedGrid[row][col] = sudokuBuffer[row][col];
            return updatedGrid;
          });

          await sleep(75); // Pausa per l'animazione

          // Completa l'animazione quando raggiunge l'ultima cella
          if (row === 8 && col === 8) {
            setLoading(false);
            setSolvingCell(null);
            setCompleted(true);
            setShowParticles(false);

            // Mostra animazione di completamento
            setTimeout(() => {
              setCompleted(false);
            }, 2000);
          }
        }
      }
    } else {
      setLoading(false);
      setShowParticles(false);
      alert('Nessuna soluzione esistente per questa configurazione!');
    }
  }

  /**
   * Algoritmo ricorsivo di backtracking per risolvere il Sudoku
   * @param {Array} board - Griglia da risolvere
   * @returns {boolean} - True se risolto con successo
   */
  function sudokuHelper(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;
              if (sudokuHelper(board)) {
                return true;
              }
              board[row][col] = 0; // Backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Funzione di utilità per creare pause nelle animazioni
   * @param {number} ms - Millisecondi di pausa
   * @returns {Promise} - Promise che si risolve dopo il tempo specificato
   */
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Resetta la griglia allo stato iniziale
   */
  function resetBoard() {
    setSudokuArr(initial);
    setCompleted(false);
    setLoading(false);
    setSolvingCell(null);
    setShowParticles(false);

    // Resetta lo stile di tutte le celle
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (cellRefs && cellRefs.current[row][col].current) {
          cellRefs.current[row][col].current.style.backgroundColor = '#edf5e1';
          cellRefs.current[row][col].current.style.transform = 'scale(1)';
        }
      }
    }
  }

  // Gestione automatica degli errori
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  // Array per il titolo animato
  let title = [
    's',
    'u',
    'd',
    'o',
    'k',
    'u',
    'B',
    'r',
    'e',
    'a',
    'k',
    'e',
    'r',
    '(',
    ')',
  ];

  return (
    <Container>
      {/* Particelle di sfondo durante la risoluzione */}
      <AnimatePresence>
        {showParticles && (
          <ParticlesContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(20)].map((_, i) => (
              <Particle
                key={i}
                as={motion.div}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  y: -100,
                  scale: [0, 1, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </ParticlesContainer>
        )}
      </AnimatePresence>

      {/* Titolo animato */}
      <AnimatePresence>
        <Title
          as={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        >
          {title.map((letter, index) => (
            <Letter
              key={index}
              as={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.4,
                y: -10,
                color: '#FFD700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
              }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 10,
              }}
            >
              {letter}
            </Letter>
          ))}
        </Title>
      </AnimatePresence>

      {/* Messaggio di errore */}
      <AnimatePresence>
        {error && (
          <ErrorContainer
            as={motion.div}
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorText>La griglia non può essere vuota!</ErrorText>
          </ErrorContainer>
        )}
      </AnimatePresence>

      {/* Indicatore di caricamento */}
      <AnimatePresence>
        {loading && (
          <LoadingContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner
              as={motion.div}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              🧩
            </LoadingSpinner>
            <LoadingText>Risoluzione in corso...</LoadingText>
          </LoadingContainer>
        )}
      </AnimatePresence>

      {/* Container principale del Sudoku */}
      <AnimatePresence>
        <SudokuContainer
          as={motion.div}
          initial={{ scale: 0, opacity: 0, rotateY: 180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{
            duration: 1.2,
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: 0.8,
          }}
        >
          <Table completed={completed}>
            <Tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIndex) => (
                <Tr
                  completed={completed}
                  key={rowIndex}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIndex) => (
                    <Td
                      completed={completed}
                      key={colIndex}
                    >
                      <Cell
                        as={motion.input}
                        ref={cellRefs.current[row][col]}
                        value={
                          sudokuArr[row][col] === 0 ? '' : sudokuArr[row][col]
                        }
                        onChange={(e) => onInputChange(e, rowIndex, colIndex)}
                        onKeyDown={(e) => deleteValue(e, rowIndex, colIndex)}
                        isActive={
                          solvingCell?.row === rowIndex &&
                          solvingCell?.col === colIndex
                        }
                        whileHover={{ scale: 1.05 }}
                        whileFocus={{
                          scale: 1.1,
                          boxShadow: '0 0 20px rgba(38, 181, 103, 0.5)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: (rowIndex * 9 + colIndex) * 0.01,
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                        }}
                      />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Container dei bottoni */}
          <AnimatePresence>
            <BtnContainer
              as={motion.div}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.4,
                duration: 0.7,
                type: 'spring',
                stiffness: 100,
              }}
            >
              <Reset
                as={motion.button}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#ff4444',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={resetBoard}
                disabled={loading}
              >
                🔄 Reset
              </Reset>

              <Solve
                as={motion.button}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#00aa44',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={checkBoard}
                disabled={loading}
              >
                🚀 Risolvi
              </Solve>
            </BtnContainer>
          </AnimatePresence>
        </SudokuContainer>
      </AnimatePresence>

      {/* Animazione di completamento */}
      <AnimatePresence>
        {completed && (
          <CompletionOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CompletionMessage
              as={motion.div}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              🎉 Sudoku Risolto! 🎉
            </CompletionMessage>
          </CompletionOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default Sudoku;

// Styled Components con animazioni migliorate

const Container = styled.div`
  /* Container principale con gradiente dinamico */
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 5px;
    justify-content: flex-start;
    padding-top: 20px;
  }
`;

const ParticlesContainer = styled.div`
  /* Container per le particelle animate */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled.div`
  /* Singola particella animata */
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #ffd700, #ffa500);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
`;

const Title = styled.div`
  /* Titolo principale con effetti */
  margin-bottom: 20px;
  display: flex;
  cursor: default;
  z-index: 2;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const Letter = styled.div`
  /* Singola lettera del titolo */
  font-size: 2rem;
  letter-spacing: 3px;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
`;

const SudokuContainer = styled.div`
  /* Container della griglia Sudoku */
  z-index: 2;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  margin: auto;
  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 15px;
    max-width: 95vw;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 12px;
    max-width: 98vw;
  }
`;

const Table = styled.table`
  /* Tabella principale del Sudoku */
  border: ${(props) =>
    props.completed ? '6px solid #FFD700' : '4px solid white'};
  transition: all 300ms ease-in-out;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.completed
      ? '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 30px rgba(255, 215, 0, 0.3)'
      : '0 10px 30px rgba(0, 0, 0, 0.2)'};

  @media (max-width: 768px) {
    border-width: ${(props) => (props.completed ? '4px' : '3px')};
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    border-width: ${(props) => (props.completed ? '3px' : '2px')};
    border-radius: 10px;
  }
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  /* Righe della tabella */
  &:nth-child(3n) {
    border-bottom: ${(props) =>
      props.completed ? '4px solid #FFD700' : '4px solid #333'};
    transition: border 300ms ease-in-out;
  }

  @media (max-width: 768px) {
    &:nth-child(3n) {
      border-bottom-width: ${(props) => (props.completed ? '3px' : '3px')};
    }
  }

  @media (max-width: 480px) {
    &:nth-child(3n) {
      border-bottom-width: ${(props) => (props.completed ? '2px' : '2px')};
    }
  }
`;

const Td = styled.td`
  /* Celle della tabella */
  &:nth-child(3n) {
    border-right: ${(props) =>
      props.completed ? '4px solid #FFD700' : '4px solid #333'};
    transition: border 300ms ease-in-out;
  }

  @media (max-width: 768px) {
    &:nth-child(3n) {
      border-right-width: ${(props) => (props.completed ? '3px' : '3px')};
    }
  }

  @media (max-width: 480px) {
    &:nth-child(3n) {
      border-right-width: ${(props) => (props.completed ? '2px' : '2px')};
    }
  }
`;

const Cell = styled.input`
  /* Singola cella input */
  border-radius: 8px;
  height: 70px;
  width: 70px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid transparent;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  background: ${(props) =>
    props.isActive
      ? 'linear-gradient(45deg, #FFD700, #FFA500)'
      : 'linear-gradient(145deg, #ffffff, #f0f0f0)'};
  color: #333;
  box-shadow: ${(props) =>
    props.isActive
      ? '0 0 20px rgba(255, 215, 0, 0.6), inset 0 2px 4px rgba(0, 0, 0, 0.1)'
      : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'};

  &:hover {
    border-color: #26b567;
    box-shadow: 0 0 15px rgba(38, 181, 103, 0.4);
    background: linear-gradient(145deg, #f8f8f8, #e8e8e8);
  }

  &:focus {
    border-color: #1e90ff;
    background: linear-gradient(145deg, #ffffff, #f5f5f5);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Responsive design migliorato */
  @media (max-width: 768px) {
    height: 50px;
    width: 50px;
    font-size: 1.2rem;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    height: 35px;
    width: 35px;
    font-size: 1rem;
    border-radius: 4px;
  }

  @media (max-width: 320px) {
    height: 30px;
    width: 30px;
    font-size: 0.9rem;
  }
`;

const BtnContainer = styled.div`
  /* Container dei bottoni */
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  gap: 15px;

  @media (max-width: 768px) {
    margin-top: 20px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    margin-top: 15px;
    gap: 8px;
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  /* Stile base per i bottoni */
  text-transform: capitalize;
  padding: 15px 30px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-width: 120px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1rem;
    min-width: 100px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
    width: 200px;
    max-width: 90%;
  }
`;

const Solve = styled(Button)`
  /* Bottone Risolvi */
  background: linear-gradient(45deg, #26b567, #20b2aa);
  color: white;
  box-shadow: 0 4px 15px rgba(38, 181, 103, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(38, 181, 103, 0.6);
  }
`;

const Reset = styled(Button)`
  /* Bottone Reset */
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.6);
  }
`;

const LoadingContainer = styled.div`
  /* Container di caricamento */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  backdrop-filter: blur(10px);
  max-width: 90vw;

  @media (max-width: 768px) {
    padding: 30px;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const LoadingSpinner = styled.div`
  /* Spinner di caricamento */
  font-size: 4rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
`;

const LoadingText = styled.div`
  /* Testo di caricamento */
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ErrorContainer = styled.div`
  /* Container per messaggi di errore */
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 20px 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 30px rgba(238, 90, 82, 0.4);
  z-index: 1000;
  backdrop-filter: blur(10px);
  max-width: 90vw;

  @media (max-width: 768px) {
    padding: 15px 20px;
    border-radius: 12px;
    top: 15%;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    border-radius: 10px;
    top: 10%;
  }
`;

const ErrorIcon = styled.div`
  /* Icona di errore */
  font-size: 1.5rem;
  margin-right: 15px;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-right: 10px;
  }
`;

const ErrorText = styled.div`
  /* Testo di errore */
  font-weight: 600;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CompletionOverlay = styled.div`
  /* Overlay per completamento */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;

const CompletionMessage = styled.div`
  /* Messaggio di completamento */
  background: linear-gradient(45deg, #ffd700, #ffa500);
  color: #333;
  padding: 40px 60px;
  border-radius: 25px;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 20px 60px rgba(255, 215, 0, 0.6);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 90vw;

  @media (max-width: 768px) {
    padding: 30px 40px;
    font-size: 1.5rem;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 30px;
    font-size: 1.2rem;
    border-radius: 15px;
  }
`;

/* Animazione di shake per errori */
const shakeKeyframes = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;

// Aggiungi le keyframes al GlobalStyle se necessario
const additionalStyles = `
  ${shakeKeyframes}
`;
