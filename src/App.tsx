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

  //txt
  const exportToFile = () => {
    const content = list.map((item, i) => `${item}: ${done[i] ? 'Done' : 'Not Done'}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'checklist.txt';
    link.click();
  };

  //excel
  const exportToExcel = () => {
    const csvContent = list.map((item, i) => `"${item}",${done[i] ? 'Done' : 'Not Done'}`).join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'checklist.csv';
    link.click();
  };

  //copy
  const copyToClipboard = () => {
    const textToCopy = list.map((item, i) => `${item}: ${done[i] ? 'Done' : 'Not Done'}`).join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  };

  return (
    <div>
      <Wrapper>
        <Container>
          <Header>
            <h1>Check</h1>
            <button onClick={copyToClipboard}>copy</button>
            <button onClick={exportToFile}>내보내기</button>
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
  height:3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color:#fcc1c1;
  button{
    border: none;
    padding:0.7rem;
    border-radius: 5px;
    color:#fff;
    background-color: #fcc1c1;
    &:hover{
      background-color: red;
    }
  }
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
  /* border: 1px solid pink; */
  background-color: #ffe8ec;
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


