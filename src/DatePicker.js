import {useState} from 'react';
import Calendar from './components/Calendar';
import Timer from './components/Timer';

import './DatePicker.css';

function DatePicker() {

  const [ date, setDate ] = useState(Date.now);


  const schedule = () => {
    console.log(date)
  }

  return (
    <div className="DatePicker">
      <div className="Picker-header">
        <h2>Schedule Response</h2>
      </div>
      <div className="Picker-body">
        <Calendar/>
        <Timer />
        <div>

        </div>
      </div>
      <div className="Picker-footer">
      <button className='main' onClick={()=>{schedule()}}>Schedule</button>
      <button>Cancel</button>
      </div>
    </div>
  );
}

export default DatePicker;
