import React from "react"

const PlayerList = ({ players }) => {
    return (
        <div>
            <h5 className="card-title">Attending Players:</h5>
            <ul>
                {players.map(player => 
                    <li key={player.id}>
                        {player.username}
                        {player.isHost && ' 👑'}
                    </li>)}
            </ul>
        </div>
    )
}
export default PlayerList