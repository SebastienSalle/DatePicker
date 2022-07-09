import '../DatePicker.css';

function Timer() {

    return(
        <div className='Timer'>
            <div className='TimerHead'>
                Time
                <input value={'01:00 AM'}>
                </input>
            </div>
            <div className='TimerScroll'>
                <ul>
                    <li>12:00 AM</li>
                    <li>01:00 AM</li>
                    <li>02:00 AM</li>
                    <li>03:00 AM</li>
                    <li>04:00 AM</li>
                    <li>05:00 AM</li>
                    <li>06:00 AM</li>
                    <li>07:00 AM</li>
                </ul>
            </div>
        </div>
    )
};

export default Timer;