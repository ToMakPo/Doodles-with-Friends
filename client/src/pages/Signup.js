import { useState, useRef } from "react"
import '../styles/palette.css'
import '../styles/Signup.css'

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
        <div
        id="bootstrap-overrides" 
        className=" sketchBackground">
            <main className="container">
                {/* <div className="card-deck"> */}
                    <div class="card">
                        <h2 className="card-header">Sign Up</h2>
                        <div class="card-body d-flex justify-content-around align-items-center">
                            <form 
                            class="d-flex justify-content-around align-items-center"
                            onSubmit={signup}>
                                {/* <div class=" "> */}
                                    <div class="">
                                        <span>
                                            <label htmlFor="username:"></label>
                                            <input 
                                            id='username' 
                                            type="text" 
                                            placeholder="EMAIL"
                                            onBlur={checkUsername} ref={usernameInput} autoComplete="username" autoFocus/>
                                        </span>
                                    </div>
                                    <br></br>
                                    <div className="">
                                        <span>
                                            <label htmlFor="password:"></label>
                                            <input 
                                            id='password' type="password" 
                                            placeholder="PASSWORD"
                                            onBlur={checkPassword} ref={passwordInput} autoComplete="new-password"/>
                                        </span>
                                    </div>
                                    
                                    {/* <div className=""> */}
                                        <button className="btn btn-primary btn-block">Submit</button>
                                    {/* </div> */}
                                {/* </div> */}
                            </form>

                    </div>
                {/* </div> */}
            </div>
            <br></br>
                <small>Already have an account? <strong onClick={() => setLoginDisplay('login')}>Sign in</strong></small>
            </main>
        </div>
    )
}

export default Signup