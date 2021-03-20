import React from "react"

const WordList = ({playersProp}) => {
    return(
        <div>
            <h5 className="card-title">Attending Players:</h5>
        <ol> 
            {playersProp.length
        ?(
            playersProp.map((player) =>(

            <li key={ player.id}>{player.name}</li>
            ))


        ):(
        <li> No Players Yet</li>
        )}
        </ol>
        </div>
    )
}
export default WordList