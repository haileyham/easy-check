import styled from 'styled-components';
import React, { useState,useEffect } from 'react';

function App() {
  const list = ["iceCream", "물받침대","물비우기","도구닦기","커피탕탕","커피망","커피통비우기","아슈크림마감","마카롱냉장고","창문닫기","분리수거","쓰레기버리기","커피마감1","커피마감2","커피마감3","커피머신청소","키오스크","TV","에어컨","얼음뚜껑","테이블닦기","쓸기&닦기","매장불끄기","문잠그기"]
  // const [done, setDone] = useState([false, false, false, false, false])
  
  //LocalStorage 활용
  const [done, setDone] = useState(() => {
    const storedDone = localStorage.getItem('done');
    return storedDone ? JSON.parse(storedDone) : Array(list.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem('done', JSON.stringify(done));
  }, [done]);

  const checkDone = (i:number) => {
    let 복사done = [...done];
    while (복사done.length < list.length) {
      복사done.push(false);
    }
    복사done[i] = !복사done[i];
    setDone(복사done);
  }

  // 시간
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // 1분마다 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  const formattedDateTime = currentTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });


  // 내보내기
  //txt
  const exportToFile = () => {
    const content = list.map((item, i) => `${item}: ${done[i] ? 'Done' : 'Not Done'}`).join('\n');
    const fullContent = `${currentTime}\n\n${content}`;

    const blob = new Blob([fullContent], { type: 'text/plain' });
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
    const fullContent = `${currentTime}\n\n${textToCopy}`;

    navigator.clipboard.writeText(fullContent)
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
            <Time>{formattedDateTime}</Time>
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

const Time = styled.p`
  color:#fcc1c1;
  text-align: right;
  padding-right:1rem;
  margin: 0 0 5px;
  font-size:14px;
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


