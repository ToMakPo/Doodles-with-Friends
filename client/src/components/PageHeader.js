// import { Link } from 'react-router-dom'
import Jumbotron from "./Jumbotron"
import LogoutButton from "./LogoutButton"

import '../styles/PageHeader.css'
import '../styles/palette.css'

const PageHeader = () => {
    return (
        <>
            <header>
                <Jumbotron />

                <div>
                    <LogoutButton />
                </div>
            </header>
            <hr />
        </>
    )
}

export default PageHeader