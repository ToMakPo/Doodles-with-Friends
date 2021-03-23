import React from 'react'
import { useLogout } from '../utils/auth'
import '../styles/PageHeader.css'
import '../styles/palette.css'

function LogoutButton() {
    const logout = useLogout();
    return (
        <div id="bootstrap-overrides" >
            <button
                className= "btn logout mt-2 ml-2" 
                onClick={logout}>
                    Logout
            </button>
        </div>

    )
}

export default LogoutButton
