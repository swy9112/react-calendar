import React from "react";
import styled from "styled-components";

const Wrap = styled.thead`
  th {
    padding-left: 10px;
    height: 32px;
    text-align: left;
    vertical-align: middle;
  }
`;

const CalendarHeader = () => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const mapArrayToDate = dateArray => {
    return dateArray.map((date, index) => {
      const className = () => {
        let className = "RCA-calendar-date-component";
        if (index === 0) {
          return className + " date-sun";
        } else if (index === 6) {
          return className + " date-sat";
        } else {
          return className + " date-weekday";
        }
      };
      return (
        <th className={className()} key={"RCA-header-" + date}>
          {date}
        </th>
      );
    });
  };

  return (
    <Wrap>
      <tr>{mapArrayToDate(week)}</tr>
    </Wrap>
  );
};

export default CalendarHeader;
