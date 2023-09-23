import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import spinner from '../assets/Spinner.svg';
import { AnimatePresence, motion } from 'framer-motion';
function Sudoku() {
  // let initial = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ];
  const [initial, setInitial] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //   let test = [
  //     [6, 1, 3, 8, 0, 0, 0, 9, 0],
  //     [0, 0, 7, 6, 4, 0, 8, 0, 0],
  //     [9, 0, 0, 5, 3, 1, 0, 0, 7],
  //     [8, 3, 0, 0, 9, 6, 0, 0, 0],
  //     [0, 9, 6, 7, 0, 0, 2, 4, 0],
  //     [7, 4, 0, 0, 0, 0, 0, 6, 9],
  //     [0, 0, 8, 0, 6, 0, 4, 0, 1],
  //     [4, 2, 0, 0, 8, 0, 0, 3, 0],
  //     [0, 6, 1, 0, 0, 0, 0, 0, 0],
  //   ];

  const [sudokuArr, setSudokuArr] = useState(initial);

  //Create refs for each cell

  const cellRefs = useRef([]);

  // Create the refs using the useRef hook
  cellRefs.current = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => React.createRef())
  );

  //ADD NUMBER TO THE BOARD
  function onInputChange(e, row, col) {
    let val = Number(e.target.value);
    //Check input validity
    if (val >= 1 && val <= 9) {
      if (isValidMove(sudokuArr, row, col, val)) {
        //Add value to array
        setSudokuArr((prevState) => {
          const updatedGrid = [...prevState];
          updatedGrid[row][col] = val;
          return updatedGrid;
        });
      } else {
        console.log(e.currentTarget.style);
        let target = e.currentTarget;
        target.style.outline = '2px solid red';
        setTimeout(() => {
          target.style.outline = 'none';
        }, 700);
      }
    }
  }
  //DELETE USER INPUT
  function deleteValue(e, row, col) {
    if (e.key === 'Backspace')
      setSudokuArr((prevState) => {
        const updatedGrid = [...prevState];
        updatedGrid[row][col] = 0;
        return updatedGrid;
      });
  }
  //check if value is valid
  function isValidMove(board, row, col, num) {
    //check row and col
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false; // Conflict found
      }
    }
    // Check the 3*3 subgrid for conflicts
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) {
          return false; // Conflict found
        }
      }
    }

    return true; // No conflicts found
  }

  //Set cell bg
  function setCellBackground(row, col) {
    const cellRef = cellRefs.current[row][col];
    if (cellRef) {
      cellRef.current.style.backgroundColor = '#e7eaa4';
    }
  }
  function checkBoard() {
    if (sudokuArr === initial) {
      setError(true);
    } else {
      solveSudoku();
    }
  }

  async function solveSudoku() {
    //Set loading state
    setLoading(true);
    // Get deepCopy
    let sudokuBuffer = JSON.parse(JSON.stringify(sudokuArr));

    if (sudokuHelper(sudokuBuffer)) {
      console.log(sudokuBuffer);
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          setCellBackground(row, col);
          setSudokuArr((prevState) => {
            const updatedGrid = [...prevState];
            updatedGrid[row][col] = sudokuBuffer[row][col];
            return updatedGrid;
          });

          await sleep(50);
          if (row === 8 && col === 8) {
            setLoading(false);
          }
        }
      }
    } else {
      setLoading(false);
      alert('no solution exist');
    }
  }
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
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //STATE TO RE-RENDER COMPONENTS ONCE SOLVE() HAS DONE
  const [key, setKey] = useState(0);
  //ERROR STATE
  const [error, setError] = useState(false);
  // Loading state
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);
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
    '()',
  ];
  return (
    <Container>
      <AnimatePresence>
        <Title
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
          }}
        >
          {title.map((letter) => (
            <Letter
              as={motion.div}
              whileHover={{ scale: 1.4, y: '-10px' }}
            >
              {letter}
            </Letter>
          ))}
        </Title>
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <ErrorContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            The board is not valid
          </ErrorContainer>
        )}
        {loading && (
          <LoadingContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={spinner}
              alt='loading...'
            />
          </LoadingContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <SudokuContainer
          as={motion.div}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 5,
            type: 'spring',
            stiffness: 400,
            damping: 30,
            delay: 0.8,
          }}
        >
          <Table>
            <Tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIndex) => (
                    <Td key={colIndex}>
                      <Cell
                        type='number'
                        key={key}
                        ref={cellRefs.current[row][col]}
                        value={
                          sudokuArr[row][col] === 0 ? '' : sudokuArr[row][col]
                        }
                        onChange={(e) => onInputChange(e, rowIndex, colIndex)}
                        onKeyDown={(e) => deleteValue(e, rowIndex, colIndex)}
                      />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <AnimatePresence>
            <BtnContainer
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              <Reset
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={() => {
                  setSudokuArr(initial);

                  for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                      cellRefs.current[row][col].current.style.backgroundColor =
                        '#edf5e1';
                    }
                  }
                }}
              >
                reset
              </Reset>
              <Solve
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={checkBoard}
              >
                Solve
              </Solve>
            </BtnContainer>
          </AnimatePresence>
        </SudokuContainer>
      </AnimatePresence>
    </Container>
  );
}

export default Sudoku;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #26b567;
  align-items: center;
`;
const Title = styled.div`
  margin-bottom: 20px;
  display: flex;
  cursor: default;
`;
const Letter = styled.div`
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-weight: 600;
`;
const SudokuContainer = styled.div``;
const Table = styled.table`
  border: 4px solid black;
  border-collapse: collapse;
  background-color: #999;
`;
const Tbody = styled.tbody``;
const Tr = styled.tr`
  &:nth-child(3n) {
    border-bottom: 2px solid black;
  }
`;
const Td = styled.td`
  &:nth-child(3n) {
    border-right: 2px solid black;
  }
`;

const Cell = styled.input`
  border-radius: 3px;
  height: 70px;
  width: 70px;
  font-size: 1.3rem;
  text-align: center;
  border: 1px solid #999;
  transition: all 300ms ease-in-out;
  outline: none;
  background-color: #edf5e1;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 800px) {
    height: 60px;
    width: 60px;
  }
  @media (max-width: 450px) {
    height: 40px;
    width: 40px;
  }
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
const Button = styled.button`
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  background-color: #05386b;
  color: #fff;
`;
const Check = styled(Button)``;
const Solve = styled(Button)``;
const Reset = styled(Button)``;
const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
`;
const ErrorContainer = styled.div`
  position: absolute;
  background-color: #fff;
  height: 100px;
  width: 300px;
  border: 4px solid #e03c31;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
