import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

function Board() {
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
  let initial = [
    [6, 1, 3, 8, 0, 0, 0, 9, 0],
    [0, 0, 7, 6, 4, 0, 8, 0, 0],
    [9, 0, 0, 5, 3, 1, 0, 0, 7],
    [8, 3, 0, 0, 9, 6, 0, 0, 0],
    [0, 9, 6, 7, 0, 0, 2, 4, 0],
    [7, 4, 0, 0, 0, 0, 0, 6, 9],
    [0, 0, 8, 0, 6, 0, 4, 0, 1],
    [4, 2, 0, 0, 8, 0, 0, 3, 0],
    [0, 6, 1, 0, 0, 0, 0, 0, 0],
  ];
  const [sudokuArr, setSudokuArr] = useState(initial);
  //ADD NUMBER TO THE BOARD
  function onInputChange(e, row, col) {
    let val = Number(e.target.value);

    if (val >= 1 && val <= 9) {
      setSudokuArr((prevState) => {
        const updatedGrid = [...prevState];
        updatedGrid[row][col] = val;
        return updatedGrid;
      });
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
  //FIND NEXT EMPTY SLOT
  function nextEmptySlot(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return [-1, -1];
  }
  //CHECK IF VALUE IS ACCEPTABLE IN ROW
  function checkRow(board, row, value) {
    // Iterate through columns (0 to 8)
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === value && value !== 0) {
        return false; // Value already exists in the row
      }
    }
    return true; // Value is not found in the row
  }
  //CHECK IF VALUE IS ACCEPTABLE IN COL
  function checkCol(board, col, value) {
    // Iterate through rows (0 to 8)
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === value) {
        return false; // Value already exists in the column
      }
    }
    return true; // Value is not found in the column
  }
  //CHECK IF VALUE IS ACCEPTABLE IN SQUARE
  function checkSquare(board, row, col, value) {
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] === value) {
          return false;
        }
      }
    }
    return true;
  }
  //COMBINE PREVIOUS CHECK TO VALIDATE VALUE
  function checkValue(board, row, column, value) {
    if (
      checkRow(board, row, value) &&
      checkCol(board, column, value) &&
      checkSquare(board, row, column, value)
    ) {
      return true;
    }
    return false;
  }
  //ANIMATE SOLVING PROCESS
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // CHECK INTIAL ROWS
  function checkInitialRows(board) {
    for (let row = 0; row < 9; row++) {
      let st = new Set();
      for (let i = 0; i < 9; i++) {
        if (st.has(board[row][i])) {
          console.log('board is not valit at row ' + (row + 1));
          setError('board is not valit at row ' + (row + 1));
          return false;
        }
        if (board[row][i] != 0) st.add(board[row][i]);
      }
    }
    return true;
  }
  //CHECK INITIAL COLUMNS
  function checkInitialCol(board) {
    for (let col = 0; col < 9; col++) {
      let st = new Set();
      for (let i = 0; i < 9; i++) {
        if (st.has(board[i][col])) {
          console.log('board is not valit at col ' + (col + 1));
          setError('board is not valit at col ' + (col + 1));
          return false;
        }
        if (board[i][col] != 0) st.add(board[i][col]);
      }
    }
    return true;
  }
  //CHECK INITIAL SQUARES
  function checkInitialSquares(board) {
    let box = 1;
    for (let row = 0; row < 9; row = row + 3) {
      for (let col = 0; col < 9; col = col + 3) {
        let initialBoxRow = Math.floor(row / 3) * 3;
        let initialBoxCol = Math.floor(col / 3) * 3;
        let st = new Set();
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            if (st.has(board[initialBoxRow + r][initialBoxCol + c])) {
              console.log('board is not valit at box ' + box);
              setError('board is not valit at box ' + box);
              return false;
            }
            if (board[initialBoxRow + r][initialBoxCol + c] != 0) {
              st.add(board[initialBoxRow + r][initialBoxCol + c]);
            }
          }
        }
        box++;
      }
    }
    return true;
  }
  //COMBINE PREVIOUS CHECK TO VALIDATE INITAL BOARD
  function checkBoardValidity(board) {
    if (
      checkInitialRows(board) &&
      checkInitialCol(board) &&
      checkInitialSquares(board)
    ) {
      return true;
    } else {
      return false;
    }
  }
  //VALIDATE BOARD BEFORE CALLING SOLVE()
  function solveHelper(board) {
    if (board === initial) {
      setError('empty board');
      console.log('empty board');
      return false;
    } else {
      if (!checkBoardValidity(board)) {
        console.log('Initial board is not valid.');
      } else {
        solve(board);
        setError('si puo procedere');
      }
    }
  }
  //SOLVE SUDOKU
  async function solve(board) {
    const emptySpot = nextEmptySlot(board);
    const row = emptySpot[0];
    const col = emptySpot[1];

    // Base case: All cells filled
    if (row === -1 && col === -1) {
      setKey(1); //force re-render in case needed
      return true; // The puzzle is solved
    }
    for (let num = 1; num <= 9; num++) {
      if (checkValue(board, row, col, num)) {
        board[row][col] = num;

        await sleep(10);
        if (await solve(board)) {
          return true; // The puzzle is solved
        }

        // If the current configuration leads to a dead end, backtrack
        board[row][col] = 0;
        setSudokuArr((prevState) => {
          const updatedGrid = [...prevState];
          updatedGrid[row][col] = 0;
          return updatedGrid;
        });
        await sleep(10);
      }
    }
    return false;
  }
  //STATE TO RE-RENDER COMPONENTS ONCE SOLVE() HAS DONE
  const [key, setKey] = useState(0);
  //ERROR STATE
  const [error, setError] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

  return (
    <Container>
      {error}
      <SudokuContainer>
        <Table>
          {/* <Tbody> */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIndex) => (
                <Td key={colIndex}>
                  <Cell
                    key={key}
                    value={sudokuArr[row][col] === 0 ? '' : sudokuArr[row][col]}
                    onChange={(e) => onInputChange(e, rowIndex, colIndex)}
                    onKeyDown={(e) => deleteValue(e, rowIndex, colIndex)}
                  />
                </Td>
              ))}
            </Tr>
          ))}
          {/* </Tbody> */}
        </Table>
      </SudokuContainer>

      <BtnContainer>
        <Reset onClick={() => setSudokuArr(initial)}>reset</Reset>
        <Solve onClick={() => solveHelper(sudokuArr)}>Solve</Solve>
        <Solve onClick={() => console.log(sudokuArr)}>key</Solve>
      </BtnContainer>
    </Container>
  );
}

export default Board;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dbdbdb;

  /* display: grid;
  grid-template-columns: repeat(9, 1fr);
  */
`;
const SudokuContainer = styled.div`
height`;
const Table = styled.table`
  border: 4px solid black;
  border-collapse: collapse;
`;
const Tbody = styled.tbody`
  /* grid-template-columns: repeat(9, 1fr); */
`;
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
  height: 50px;
  width: 50px;
  text-align: center;
  border: 1px solid #999;
  transition: all 300ms ease-in-out;
  outline: none;

  &:disabled {
    background-color: #ffd24d;
  }
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  text-transform: capitalize;
`;
const Check = styled(Button)``;
const Solve = styled(Button)``;
const Reset = styled(Button)``;
