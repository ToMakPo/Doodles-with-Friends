import { useContext } from "react"
import { Link } from 'react-router-dom'
import Jumbotron from "./Jumbotron"
import GameContext from "../utils/GameContext"

const PageHeader = ({logUserOut}) => {
    const {user} = useContext(GameContext)

    return (
        <>
        <header>
        <Jumbotron/>
            {/* <h1>Doodles with Friends</h1> */}
                <div>
                {user && (<>
                    <span>{user.username}</span>
                    <Link to='/login' onClick={logUserOut}>Log out</Link>
                </>)}
                </div>
        </header>
        <hr/>
        </>
    )
}

export default PageHeader