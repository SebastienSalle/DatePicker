import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  settingDate,
  canceling
} from "../redux/scheduling";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Timer from "./Timer";

import "./DatePicker.css";

function DatePicker() {
  const dispatch = useDispatch();
  const dateToSchedule = useSelector((state) => state.scheduling.dateToSchedule)
  const timeToSchedule = useSelector((state) => state.scheduling.timeToSchedule)

  const today = new Date();
  const fullToday = today.toLocaleDateString();

  const [displayedYear, setDisplayedYear] = useState(today.getFullYear());
  const [baseMonth, setBaseMonth] = useState(new Date().getMonth());
  
  const [displayedDate, setDiplayedDate] = useState(fullToday);

  const handlePrevMonth = () => {
    let month = Number(baseMonth);
    let year = Number(displayedYear);
    if (month > 0) {
      month--;
    } else {
      month = 11;
      year--;
    }
    setBaseMonth(month);
    setDisplayedYear(year);
  };

  const handleNextMonth = () => {
    let month = Number(baseMonth);
    let year = Number(displayedYear);
    if (month < 11) {
      month++;
    } else {
      month = 0;
      year++;
    }
    setBaseMonth(month);
    setDisplayedYear(year);
  };

  const handleCancel = () => {
    setDiplayedDate(fullToday);
    setBaseMonth(new Date().getMonth());
    setDisplayedYear(new Date().getFullYear());
    dispatch(canceling())
  };

  const handleSchedule = () => {
    console.log("rdv le ", displayedDate);
    alert(
        dateToSchedule && timeToSchedule
          ? `Votre rendez-vous est prévu le ${ dateToSchedule} à ${timeToSchedule} \n Your appointment will be on ${dateToSchedule} at ${timeToSchedule}`
          : `Vous devez choisir une date et un créneau horaire \n You need to pick a date and a time range`
      );
    };
    
  //-------
  // Preparing Calendar table

  const firstDay = new Date(displayedYear, baseMonth, 1);

  const lastDay = new Date(displayedYear, baseMonth + 1, 0);

  const monthLength = lastDay.getDate();

  // Fill in the first week with previous month last days
  const firstRow = [];
  for (let i = 0; firstDay.getDay() - i > 0; i++) {
    firstRow.unshift(new Date(displayedYear, baseMonth, -i));
  }

  // If we create each row separately :
  // 1. CREATE AN ARRAY FILLED WITH DISPLAYED MONTH'S DAYS
  let monthDays = [];
  let i = 0;
  while (i < monthLength) {
    monthDays.push(new Date(displayedYear, baseMonth, i + 1));
    i++;
  }

  // 2. THEN COMPLETE THE 1ST WEEK
  if (firstRow.length <= 7) {
    let i = 0;
    while (firstRow.length < 7) {
      firstRow.push(monthDays[i]);
      i++;
    }
    monthDays.splice(0, i);
  }
  // 3. KEEP GOING WITH 2DE, 3RD AND 4TH WEEKS
  const secondRow = [];
  if (secondRow.length <= 7) {
    let i = 0;
    while (secondRow.length < 7) {
      secondRow.push(monthDays[i]);
      i++;
    }
    monthDays.splice(0, i);
  }

  const thirdRow = [];
  if (thirdRow.length <= 7) {
    let i = 0;
    while (thirdRow.length < 7) {
      thirdRow.push(monthDays[i]);
      i++;
    }
    monthDays.splice(0, i);
  }

  const fourthRow = [];
  if (fourthRow.length <= 7) {
    let i = 0;
    while (fourthRow.length < 7) {
      fourthRow.push(monthDays[i]);
      i++;
    }
    monthDays.splice(0, i);
  }
  // 4. FILL IN THE LAST WEEK WITH NEXT MONTH DAYS UNTIL THE FIRST SATURDAY
  const lastRow = [];

  //Fill in the last week with next month first days until the first saturday
  for (let i = 0; lastDay.getDay() + i < 6; i++) {
    lastRow.push(new Date(displayedYear, baseMonth + 1, +1 + i));
  }

  if (monthDays.length !== 0 && lastRow.length <= 7) {
    let i = 1;
    while (lastRow.length < 7 && monthDays[0].getDate() < lastDay.getDate()) {
      lastRow.unshift(monthDays[monthDays.length - i]);
      i++;
    }
    monthDays.splice(1 - i);
  }

  // 5. IF NECESSARY FILL A 5TH WEEK
  const fifthRow = [];
  if (monthDays.length !== 0 && fifthRow.length <= 7) {
    let i = 0;
    while (fifthRow.length < 7) {
      fifthRow.push(monthDays[i]);
      i++;
    }
    monthDays.splice(0, i);
  }

  // ---- TABLE HEAD WITH DAY SHORTEN NAMES
  // const weekDays = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ];
  const weekDays = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const headNames = weekDays.map((d, i) => <th key={`d-${i}`} >{d[0]}</th>);
  //-----

  // Function to get all usefull data on the chosen day
  const handleDayClick = (value) => {
    //console.log(value)
    const convertedValue = value.toLocaleDateString()
    setDiplayedDate(convertedValue);
    dispatch(settingDate(convertedValue))
  };
  
  // Dynamical style for cells
  const checkDayStyle = (value) => {
    switch (value.toLocaleString().slice(0, 10)) {
      case today.toLocaleString().slice(0, 10):
        return "today";
      case displayedDate.slice(0, 10):
        return "selected";
      default:
        if (value.getMonth() !== baseMonth) {
          return "out";
        } else {
          return "";
        }
    }
  };

  // ---- FINAL CALENDAR
  const calendar = (
    <div>
      <table className="Cal-Body" id="calendar">
        <thead>
          <tr>{headNames}</tr>
        </thead>
        <tbody>
          {firstRow.length !== 0 && (
            <tr id="firstRow">
              {firstRow.map(
                (cell, i) =>
                  cell && (
                    <td
                      key={`r1-${ i }`}
                      className={checkDayStyle(cell)}
                      onClick={() => handleDayClick(cell)}
                    >
                      {cell.getDate()}
                    </td>
                  )
              )}
            </tr>
          )}
          {secondRow.length !== 0 && (
            <tr id="secondRow">
              {secondRow.map(
                (cell, i) =>
                  cell && (
                    <td
                      key={`r2-${ i }`}
                      className={checkDayStyle(cell)}
                      onClick={() => handleDayClick(cell)}
                    >
                      {cell.getDate()}
                    </td>
                  )
              )}
            </tr>
          )}
          {thirdRow.length !== 0 && (
            <tr id="thirdRow">
              {thirdRow.map(
                (cell, i) =>
                  cell && (
                    <td
                      key={`r3-${ i }`}
                      className={checkDayStyle(cell)}
                      onClick={() => handleDayClick(cell)}
                    >
                      {cell.getDate()}
                    </td>
                  )
              )}
            </tr>
          )}
          {fourthRow.length !== 0 && (
            <tr id="fourthRow">
              {fourthRow.map(
                (cell, i) =>
                  cell && (
                    <td
                      key={`r4-${ i }`}
                      className={checkDayStyle(cell)}
                      onClick={() => handleDayClick(cell)}
                    >
                      {cell.getDate()}
                    </td>
                  )
              )}
            </tr>
          )}
          {fifthRow.length !== 0 && (
            <tr id="fifthRow">
              {fifthRow.map(
                (cell, i) =>
                  cell && (
                    <td
                      key={`r5-${ i }`}
                      className={checkDayStyle(cell)}
                      onClick={() => handleDayClick(cell)}
                    >
                      {cell.getDate()}
                    </td>
                  )
              )}
            </tr>
          )}
          {lastRow.length !== 0 && (
            <tr id="lastRow">
              {lastRow.map(
                (cell, i) =>
                  cell && (
                    <td
                      key={`r6-${ i }`}
                      className={checkDayStyle(cell)}
                      onClick={() => handleDayClick(cell)}
                    >
                      {cell.getDate()}
                    </td>
                  )
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  //-----

  return (
    <div id="Container">
      <div className="Picker-header">
        <h2>Schedule Response</h2>
      </div>
      <div className="Picker-body">
          <div id="Calendar">
        <div>
          <span className="small-Text">Date</span>{" "}
          <input
            id="date-Input"
            readOnly
            defaultValue={displayedDate}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></input>
        </div>
          <div className="Cal-Header">
            <h3 className="blueText">
              {" "}
              {firstDay
                .toLocaleString("default", { month: "long" })[0]
                .toUpperCase() +
                firstDay
                  .toLocaleString("default", { month: "long" })
                  .slice(1)}{" "}
              {displayedYear}
            </h3>

            <span className="Arrows">
              <FontAwesomeIcon
                icon={faChevronLeft}
                id="left"
                onClick={() => {
                  handlePrevMonth();
                }}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                id="right"
                onClick={() => {
                  handleNextMonth();
                }}
              />
            </span>
          </div>
          {calendar}
        </div>
        <Timer />
      </div>
      <div className="Picker-footer">
        <button className="blueButton" onClick={() => handleSchedule()}>
          Schedule
        </button>
        <button onClick={() => handleCancel()}>Cancel</button>
      </div>
    </div>
  );
}

export default DatePicker;
