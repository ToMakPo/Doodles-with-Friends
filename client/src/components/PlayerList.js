import React from "react"

const PlayerList = ({playersProp}) => {
    return(
        <div>
            <h5 className="card-title">Attending Players:</h5>
        <ol> 
            {playersProp.length
        ?(
            playersProp.map((player) =>(

            <li>{player.name}</li>
            ))


        ):(
        <li> No Players Yet</li>
        )}
        </ol>
        </div>
    )
}
export default PlayerList