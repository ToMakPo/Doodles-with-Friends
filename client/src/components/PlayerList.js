import React from "react"

const PlayerList = ({ playersProp }) => {
    return (
        <div>
            <h5 className="card-title">Attending Players:</h5>
            <ol>
                {/* {playersProp
                    ? ( */}
                        {/* playersProp.map((player) => ( */}
                            
                            <li key={playersProp.id}>{playersProp.username}</li>
                        {/* )) */}


                    {/* ) : (
                        <li> No Players Yet</li>
                    )} */}
            </ol>
        </div>
    )
}
export default PlayerList