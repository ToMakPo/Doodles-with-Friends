import React from 'react'
import '../styles/Timer.css'

import { useState, useEffect } from 'react';
const Timer = () => {
 
        let initialSeconds = 5
        let initialTurns = 3
        let initialRounds = 2

    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [turns, setTurns ] =  useState(initialTurns-1);
    const [rounds, setRounds ] =  useState(initialRounds);
    // let turns = 3
    // let rounds = 2
    
    useEffect(()=>{

        var countdown = setInterval(() => {

            setSeconds(seconds - 1);
            console.log("Seconds: ", seconds)
            console.log("turns: ", turns)
            console.log("rounds: ", rounds)

            if (seconds === 0  ) {
                console.log("END ROUND")
                console.log("Update Word")
                console.log("Change Artist")
                setTurns(turns-1);

                setSeconds(initialSeconds)

                if (turns === 0 ) {
                    console.log("NEW ROUND")
                    console.log("Update the Round")

                    setRounds(rounds-1)
                    setTurns(initialTurns-1)

                }
            }

        }, 1000);

        if(!rounds){
            clearInterval(countdown)
            console.log("VIEW SCOREBOARD")
        }
        return ()=> {
            clearInterval(countdown);
        };
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
export default Timer;