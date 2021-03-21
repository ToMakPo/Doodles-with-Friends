// import { useContext } from "react"
// import { Link } from 'react-router-dom'
import Jumbotron from "./Jumbotron"
// import LobbyProvider from "../utils/LobbyProvider"
import LogoutButton from "./LogoutButton"
import '../styles/PageHeader.css'
import '../styles/palette.css'


const PageHeader = () => {
    // const { user } = useContext(LobbyProvider)

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