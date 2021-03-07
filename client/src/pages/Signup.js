import { useState, useRef } from "react"

const Signup = ({logUserIn, setLoginDisplay}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameInput = useRef('')
    const passwordInput = useRef('')

    const checkUsername = event => {
        const value = event.target.value
        
        let passed = true
        //TODO: check username; set passed to false if failed

        setUsername(passed ? value : '')
        return passed
    }

    const checkPassword = event => {
        const value = event.target.value
        
        let passed = true
        //TODO: check password; set passed to false if failed

        setPassword(passed ? value : '')
        return passed
    }

    const signup = event => {
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

        const user = {
            username,
            hash: hashPassword(password)
        }

        //TODO signup user

        logUserIn(user)
    }

    const hashPassword = password => {
        const hash = password //TODO: create a password hash.
        return hash
    } 

    return (
        <main>
            <h2>Sign Up</h2>
            
            <form onSubmit={signup}>
                <span>
                    <label htmlFor="username:">Username</label>
                    <input id='username' type="text" onBlur={checkUsername} ref={usernameInput} autoComplete="username" autoFocus/>
                </span>
                <span>
                    <label htmlFor="password:">Password</label>
                    <input id='password' type="password" onBlur={checkPassword} ref={passwordInput} autoComplete="new-password"/>
                </span>
                <button>Submit</button>
            </form>

            <small>Already have an account? <strong onClick={() => setLoginDisplay('login')}>Sign up</strong></small>
        </main>
    )
}

export default Signup