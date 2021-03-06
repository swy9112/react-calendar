import React, { useContext } from "react";
import styled from "styled-components";
import { CalendarContext } from "./index";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 10px;
`;

const YearMonth = styled.h2``;

const ButtonWrap = styled.ul`
  display: flex;
`;

const Button = styled.ul`
  display: flex;
`;

const CalendarControl = () => {
  const { calendarYM, moveMonth } = useContext(CalendarContext);

  const deEvent = month => {
    moveMonth(month);
  };

  return (
    <Wrap>
      <YearMonth>{calendarYM.format("YYYY년 MM월")}</YearMonth>
      <ButtonWrap>
        <Button>
          <AiFillCaretLeft onClick={() => deEvent(-1)} />
        </Button>
        <Button>이동</Button>
        <Button>
          <AiFillCaretRight onClick={() => deEvent(1)} />
        </Button>
      </ButtonWrap>
    </Wrap>
  );
};

export default CalendarControl;
