import { useEffect, useState } from "react"
import ChatBox from "../components/ChatBox"
import Timer from "../components/Timer"
import Timer2 from "../components/Timer2"
// import TheCountdownTimer from "../components/TheCountdownTimer"
import API from "../utils/API"
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
const { default: Canvas } = require("../components/Canvas")


// The Coutdown Timer START
let times = [7,5,7]
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
// The Coutdown Timer END







const ArtistView = () => {
    const [lobby, setLobby] = useState({})
    const [totalRounds, setTotalRounds] = useState()
    useEffect(() => {
        const lobbyCode = window.location.pathname.split('game/')[1]
        API.getLobby(lobbyCode)
            .then(data => {
                setLobby(data.data[0])
                setTotalRounds(data.data[0].games[0].maxRotations)
            })
            .catch(err => console.error(err))
    }, [])



// //Countdown elements pt1 START
//     const Completionist = () => <span>DO SOMETHING</span>;

    
//     const renderer = ({ seconds, completed }) => {
//         if (completed) {
//           // Render a complete state
//           //switch the user
//           //update the current round
//           //change the word
//           console.log("test complete")
//           return <Completionist />;
//         } else {
//           // Render a countdown
//             return (
//             <span>{seconds}</span>
//             )
//         }
//     }
// //Countdown elements pt1 END



    console.debug('lobby: ', lobby)
    console.debug(totalRounds);
    return (
        <div
            id="bootstrap-overrides"
            className="active-game-main main container sketchBackground">
            <h2 className="banner">
                <div className="d-flex justify-content-around align-items-center">

                    <div className="d-inline p-2">
                        THE WORD: { }
                    </div>
                    
                    <div className="d-inline p-2 ">
                        ROUND 1 OF {totalRounds}
                    </div>

                    <div className="d-inline p-2 ">
                        TIME REMAINING:     
                        <Timer />
                        {/* <Countdown date={Date.now() + 5000} renderer={renderer}/> */}
                        {/* <TheCountdownTimer times={times} /> */}
                        {/* <Timer2 /> */}

                        
                    </div>
                    {/* </div> */}
                </div>
            </h2>
            <div className="card-deck" style={{
                display: 'flex',
                alignItems: "stretch",
                // flexDirection: 'row'
                // flexWrap: 'wrap'
            }}>
                <div className="card">
                    <div className="card-body">
                        <div className="">
                            {/* TODO: Check if this is the active player */}
                            <Canvas active={true}/> 
                        </div>
                    </div>
                </div>
                <ChatBox lobby={{code: 'D5EA12C14'}} user={{username: 'ToMakPo'}}/>
            </div>
        </div>
    )
}
export default ArtistView