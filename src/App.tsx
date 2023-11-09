import styled from 'styled-components';
import React, { useState } from 'react';

function App() {

  return (
    <div>
      <Wrapper>
        <Container>
          <Header>
            <h1>Check</h1>
            <p>내보내기</p>
          </Header>
          <Main>
            <CheckList>
              <CheckListItem></CheckListItem>
            </CheckList>
          </Main>
        </Container>
      </Wrapper>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 1200px;
  box-shadow: 0 0 10px black;
`

const Container = styled.div`
  padding:2rem;
  box-shadow: 0 0 10px gray;
`

const Header = styled.nav`
  width:100%;
  height:10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const Main = styled.main`
  
`

const CheckList = styled.ul`
  list-style: none;
  padding:1rem;
  display: flex;
  gap:1rem;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 1px solid pink;
  border-radius: 5px;
`

const CheckListItem = styled.li`
  width:5rem;
  height:5rem;
  border-radius: 10px;
  text-align: center;
  line-height: 4.8rem;
`


