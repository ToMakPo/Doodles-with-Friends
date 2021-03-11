import { useContext } from "react"
import { Link } from 'react-router-dom'
import ActiveUserContext from "../utils/ActiveUserContext"
import Jumbotron from "./Jumbotron"

const PageHeader = ({logUserOut}) => {
    const {activeUser} = useContext(ActiveUserContext)

    return (
        <>
        <header>
        <Jumbotron/>
            {/* <h1>Doodles with Friends</h1> */}
                <div>
                {activeUser && (
                    <>
                    <span>{activeUser.username}</span>
                    <Link to='/login' onClick={logUserOut}>Log out</Link>
                    </>
                )}
                </div>
        </header>
        <hr/>
        </>
    )
}

export default PageHeader