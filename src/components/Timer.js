import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  settingTime,
} from "../redux/scheduling";

import './DatePicker.css';
import './Timer.css';

function Timer() {
    const dispatch = useDispatch();

    const timeToSchedule = useSelector((state) => state.scheduling.timeToSchedule);

    const [selectTime, setSelectTime] = useState(undefined)

    const handleTimeClick = (data) => {
        setSelectTime(data)
        dispatch(settingTime(data))
    };

    // Dynamic style for list items 
    const checkItemStyle = (value) => {
        if(value === selectTime){
        return 'selected'
        }else{
        return ''
        }
    }

    // Create the timer list only plain hours
    const timeList = [];

    for(let i = 0; i < 25; i++){
        const base = new Date()
        base.setHours(i,0)
        const time = base.toLocaleString('default', {hour:'2-digit', minute:'2-digit', hourCycle:'h12'})
        timeList.push(
            <li key={`t-${i}`} className={checkItemStyle(time)}  onClick={()=>handleTimeClick(time)} >
                {time} 
            </li>
        )
    };

      useEffect(() => {
        timeToSchedule
        ? setSelectTime(timeToSchedule) 
        : setSelectTime(new Date().toLocaleString('default', {hour:'2-digit', minute:'2-digit', hourCycle:'h12'}))

  }, [timeToSchedule]);

    return(
        <div id='Timer'>
            <div id='timer-Head'>
                <span className="small-Text">Time</span>
                <input id='timer-Input' format="hh:mm" defaultValue={selectTime} readOnly onChange={(e)=>{console.log(e.target.value)}}></input>
            </div>
            <div id='timer-Scroll'>
                {timeList}  
            </div>
        </div>
    )
};

export default Timer;