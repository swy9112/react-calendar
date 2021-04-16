import React, { useContext } from "react";
import styled from "styled-components";
import { CalendarContext } from "./App";
import moment from "moment";

const Wrap = styled.tbody`
  span {
    display: inline-block;
    margin-top: 10px;
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  td {
    width: 14.28571428571429%;
    padding-left: 10px;
  }

  .today {
    background-color: #f5fbfd;
  }

  .holyday {
    color: red;
  }

  .another {
    opacity: 0.4;
  }
`;

const CalendarBody = () => {
  const { today, firstWeek, lastWeek, curYear } = useContext(CalendarContext);

  const calendarArr = () => {
    const memo = [
      { year: 2021, weekList: 15, dateIndex: 5, text: "할일이 적당해" },
      { year: 2021, weekList: 16, dateIndex: 1, text: "할일이 많아" },
      { year: 2021, weekList: 17, dateIndex: 1, text: "할일이 없어" }
    ];
    let result = [];
    let dataState = false;
    let week = firstWeek;
    let holyday;
    let dateStyle;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((_, index) => {
              if (index === 0) {
                holyday = "holyday";
              } else {
                holyday = null;
              }

              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                dateStyle = holyday + ` today`;
              } else if (days.format("MM") !== today.format("MM")) {
                dateStyle = holyday + ` another`;
              } else {
                dateStyle = holyday;
              }

              const memoResult = memo.map(e => {
                if (curYear === e.year && week === e.weekList && index === e.dateIndex) {
                  dataState = true;
                  return (
                    <td key={index} className={dateStyle}>
                      <span>{days.format("D")}</span>
                      <div>{e.text}</div>
                    </td>
                  );
                }
              });

              if (dataState) {
                dataState = false;
                return memoResult;
              } else {
                return (
                  <td key={index} className={dateStyle}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  };

  return <Wrap>{calendarArr()}</Wrap>;
};

export default CalendarBody;
