// import { useContext } from "react"
// import { Link } from 'react-router-dom'
import Jumbotron from "./Jumbotron"
// import {LobbyContext} from "../utils/LobbyState"
import LogoutButton from "./LogoutButton"
import '../styles/PageHeader.css'
import '../styles/palette.css'


const PageHeader = () => {
    // const { user } = useContext(LobbyContext)

    return (
        <>
            <header>
                <Jumbotron />

                <div>

                    <>

                        <LogoutButton />
                    </>

                    {/* {user && (<>
                    <span>{user.username}</span>
                    <Link to='/login' onClick={logUserOut}>Log out</Link>
                </>)} */}
                </div>
            </header>
            <hr />
        </>
    )
}

export default PageHeader