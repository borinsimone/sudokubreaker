import React, { useEffect } from 'react';
import styled from 'styled-components';
import Board from './Board';
import Sudoku from './Sudoku';

function App() {
  useEffect(() => {
    function updateVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', updateVh);
    console.log('resize');
  }, []);
  return (
    <Container>
      {/* <Board /> */}
      <Sudoku />
    </Container>
  );
}

export default App;
const Container = styled.div`
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
