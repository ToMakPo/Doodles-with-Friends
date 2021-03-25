import React from 'react'
import '../styles/Timer.css'

import { useState, useEffect } from 'react';
const Timer2 = () => {
    // const {
        // initialMinute = 0, 
        let initialSeconds = 7
        let initialPlayers = 3
        let initialRounds = 2
    // const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);

    let players = 3
    let rounds = 2
    
    useEffect(()=>{
        var secondsLeft =7
        function setTime () {
            var timerInterval = setInterval(function() {
              secondsLeft--;
              setSeconds(secondsLeft);
          
              if(secondsLeft === 0) {
                clearInterval(timerInterval);
                console.log("time's up");
              }
          
            }, 1000);
          }
        setTime()

    });
    return (
        <div >
        { seconds === 0
            ? null
            : <p className="timerElement"> {seconds }</p> 
        }
        </div>
    )
}
export default Timer2;