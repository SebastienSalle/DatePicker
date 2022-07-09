import {useState} from 'react';
import Calendar from './components/Calendar';
import Timer from './components/Timer';

import './DatePicker.css';

function DatePicker() {

  const today = new Date().toLocaleDateString()
  const [ date, setDate ] = useState(today);

  const schedule = () => {
    console.log(date)
  }

  const cancel = () => {
    setDate(today)
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
      <button className='main' onClick={()=>schedule()}>Schedule</button>
      <button onClick={()=>{cancel()}}>Cancel</button>
      </div>
    </div>
  );
}

export default DatePicker;
