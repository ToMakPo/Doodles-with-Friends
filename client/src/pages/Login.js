import { useState, useRef } from "react"

const Login = ({logUserIn, setLoginDisplay}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameInput = useRef('')
    const passwordInput = useRef('')

    const login = event => {
        event.preventDefault()

        if (username === '') {
            usernameInput.current.focus()
            //TODO display message to let user know there was an issue.
            return
        }

        if (password === '') {
            passwordInput.current.focus()
            //TODO display message to let user know there was an issue.
            return
        }
        
        const confirmed = true// TODO check username and password against database
            
        if (confirmed) {
            const user = {}// TODO get user profile from database

            logUserIn(user)
        } else {
            //TODO display message to let user know that the username or password did not match.
        }
    }

    return (
        <main>
            <h2>Sign Up</h2>
            
            <form onSubmit={login}>
                <span>
                    <label htmlFor="username:">Username</label>
                    <input id='username' type="text" onBlur={event => setUsername(event.target.value)} autoComplete="username" ref={usernameInput} autoFocus/>
                </span>
                <span>
                    <label htmlFor="password:">Password</label>
                    <input id='password' type="password" onBlur={event => setPassword(event.target.value)} ref={passwordInput} autoComplete="current-password"/>
                </span>
                <button>Submit</button>
            </form>

            <small>Already have an account? <strong onClick={() => setLoginDisplay('login')}>Sign up</strong></small>
        </main>
    )
}

export default Login