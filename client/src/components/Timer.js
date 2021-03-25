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
                setTurns(turns-1);
                // console.log("turns: ", turns)
                // console.log("rounds: ", rounds)
                setSeconds(initialSeconds)

                if (turns === 0 ) {
                    console.log("NEW ROUND")
                    // rounds--
                    setRounds(rounds-1)
                    // console.log("turns: ", turns)
                    // console.log("rounds: ", rounds)
                    setTurns(initialTurns-1)
                    // setSeconds(initialSeconds)
                }
            }
                // if(rounds === 0){
                //     console.log("GAME OVER")
                //     //     console.log("Update Word")
                //     //     console.log("Change Artist")
                //     //     console.log("Update the Round")
                //     //     console.log("Restart the clock")
                //         clearInterval(countdown)
                //     } 

                
        }, 1000);

        if(!rounds){
            clearInterval(countdown)
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