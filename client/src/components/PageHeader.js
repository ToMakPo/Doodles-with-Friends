// import { useContext } from "react"
// import { Link } from 'react-router-dom'
import Jumbotron from "./Jumbotron"
// import GameContext from "../utils/GameContext"
import LogoutButton from "./LogoutButton"

const PageHeader = () => {
    // const { user } = useContext(GameContext)

    return (
        <>
            <header>
                <Jumbotron />

                <div>

                    <>

                        <LogoutButton />
                    </>

                </div>
            </header>
            <hr />
        </>
    )
}

export default PageHeader