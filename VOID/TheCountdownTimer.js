//I MOVED THE CONTENT OF THIS COMPONENT INTO THE ACTIVE GAME TO TEST THE FUNCTIONALITY

import React, { useState } from 'react';
import Countdown from 'react-countdown';
import ReactDOM from "react-dom";
function TheCountdownTimer({times}){
    const [currentTimeIndex, setCurrentTimeIndex] =useState(0)

const [currentTime, setCurrentTime] = useState(null)

    return(
        <Countdown 
            date={currentTime}
            key={currentTimeIndex}
            onComplete ={()=>{
                if (times.length-1 <= times.indexOf(currentTime)) return;
                setCurrentTimeIndex(currentTimeIndex+1)
                setCurrentTime(new Date(times[currentTimeIndex+1]))
                console.log("onComplete fired")
            }}
            renderer={({seconds, completed})=>{
                if (completed) return <span>Next</span>
                return <span>{seconds}</span>
            }}
        />
    );
}
    export default TheCountdownTimer;