import styled from 'styled-components';
import React, { useState } from 'react';

function App() {
  const list = ["iceCream", "물받침대","물비우기","도구닦기","커피탕탕","커피망","커피통비우기","아슈크림마감","마카롱냉장고","창문닫기","분리수거","쓰레기버리기","커피마감1","커피마감2","커피마감3","커피머신청소","키오스크","TV","에어컨","얼음뚜껑","테이블닦기","쓸기&닦기","매장불끄기","문잠그기"]
  const [done, setDone] = useState([false, false, false, false, false])
  
  const checkDone = (i:number) => {
    let 복사done = [...done];
    while (복사done.length < list.length) {
      복사done.push(false);
    }
    복사done[i] = !복사done[i];
    setDone(복사done);
  }

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
              {list.map((a,i) => {
                return <CheckListItem key={a} done={done[i]} onClick={() => checkDone(i)}>{a}</CheckListItem>
              })}
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

const CheckListItem = styled.li<{ done: boolean }>`
  width:5rem;
  height:5rem;
  border-radius: 10px;
  text-align: center;
  line-height: 4.8rem;
  border: 1px solid #daafff9d;
  font-size:12px;
  background-color: ${(props) => (props.done ? '#daafff9d' : '#ffffff')};
`


