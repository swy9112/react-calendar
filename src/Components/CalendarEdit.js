import React, { useContext } from "react";
import styled from "styled-components";
import { CalendarContext } from "./App";

const Wrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const WriteArea = styled.div`
  width: 400px;
  padding: 60px;
  background-color: #fff;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  padding: 6px;
  resize: none;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
`;

const EditButton = styled.button`
  display: block;
  width: 100px;
  margin: 10px auto 0;
`;

const CalendarEdit = () => {
  const { memo, setMemo, dataProp } = useContext(CalendarContext);

  const popUpHide = () => {
    document.querySelector(".popUpWrap").style.display = "none";
    document.querySelector(".textEditArea").value = "";
  };

  const popUpHideClick = e => {
    if (e.target.className.indexOf("popUpWrap") > 0) {
      popUpHide();
    }
  };

  const editEvent = () => {
    let propCount = 0;
    const dataProps = dataProp.reduce((acc, cur, i) => {
      acc[i] = parseInt(cur);
      return acc;
    }, []);

    const resetMemo = memo.reduce((acc, cur, i) => {
      if (cur["year"] === dataProps[0] && cur["weekList"] === dataProps[1] && cur["dateIndex"] === dataProps[2]) {
        cur["text"] = document.querySelector(".textEditArea").value;
      } else {
        propCount++;
      }

      acc[i] = cur;

      if (propCount === memo.length) {
        acc.push({
          year: dataProps[0],
          weekList: dataProps[1],
          dateIndex: dataProps[2],
          text: document.querySelector(".textEditArea").value
        });
      }
      return acc;
    }, []);
    setMemo(resetMemo);
    popUpHide();
  };

  return (
    <Wrap onClick={popUpHideClick} className="popUpWrap">
      <WriteArea>
        <p>내용</p>
        <TextArea className="textEditArea" />
        <EditButton onClick={editEvent}>수정하기</EditButton>
      </WriteArea>
    </Wrap>
  );
};

export default CalendarEdit;
