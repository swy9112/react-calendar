import React, { useContext } from "react";
import styled from "styled-components";
import { CalendarContext } from "./index";
import moment from "moment";

const Wrap = styled.tbody`
  td {
    position: relative;
    width: 14.28571428571429%;
    height: 120px;
    padding: 10px 0 0 10px;
    cursor: pointer;
  }

  .day {
    display: inline-block;
    margin-bottom: 6px;
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    pointer-events: none;
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

const Text = styled.div`
  pointer-events: none;
`;

const CalendarBody = () => {
  const { today, firstWeek, lastWeek, curYear, memo, setMemo, setDataProp } = useContext(CalendarContext);

  const dataClick = e => {
    const popUpWrap = document.querySelector(".popUpWrap");
    const innerNodes = e.target.childNodes;

    setDataProp([
      e.target.getAttribute("data-year"),
      e.target.getAttribute("data-week"),
      e.target.getAttribute("data-index")
    ]);

    let innerText;
    for (let i = 0; i < innerNodes.length; i++) {
      if (innerNodes[i].className.indexOf("listText") > 0) {
        innerText = innerNodes[i].innerText;
        document.querySelector(".textEditArea").value = innerText;
      }
    }

    setMemo(
      memo.filter(cur => {
        return cur["text"].length > 0;
      })
    );
    popUpWrap.style.display = "flex";
  };

  const calendarArr = () => {
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
                    <td
                      data-year={e.year}
                      data-week={e.weekList}
                      data-index={index}
                      key={index}
                      className={dateStyle}
                      onClick={dataClick}
                    >
                      <span className="day">{days.format("D")}</span>
                      <Text className="listText">{e.text}</Text>
                    </td>
                  );
                }
              });

              if (dataState) {
                dataState = false;
                return memoResult;
              } else {
                return (
                  <td
                    data-year={curYear}
                    data-week={week}
                    data-index={index}
                    key={index}
                    className={dateStyle}
                    onClick={dataClick}
                  >
                    <span className="day">{days.format("D")}</span>
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
