import { useState, useRef } from "react"
import API from "../utils/API";
import { useLogin } from "../utils/auth";
import '../styles/palette.css'
import '../styles/Signup.css'

const Signup = ({ logUserIn, setLoginDisplay }) => {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const login = useLogin();

    const handleSubmit = async e => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = usernameInput.current.value;

        try {

            // Register the user.
            await API.register({ username, password });

            // User has been successfully registered, now log them in with the same information.
            await login({ username, password });

            // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.

        } catch (err) {

            // Handle error responses from the API. This will include
            if (err.response && err.response.data) console.log(err.response.data);

        }
    }

    // const checkUsername = event => {
    //     const value = event.target.value

    //     let passed = true
    //     //TODO: check username; set passed to false if failed

    //     setUsername(passed ? value : '')
    //     return passed
    // }

    // const checkPassword = event => {
    //     const value = event.target.value

    //     let passed = true
    //     //TODO: check password; set passed to false if failed

    //     setPassword(passed ? value : '')
    //     return passed
    // }

    // const signup = event => {
    //     event.preventDefault()

    //     if (username === '') {
    //         usernameInput.current.focus()
    //         //TODO display message to let user know there was an issue.
    //         return
    //     }

    //     if (password === '') {
    //         passwordInput.current.focus()
    //         //TODO display message to let user know there was an issue.
    //         return
    //     }

    //     const user = {
    //         username,
    //         hash: hashPassword(password)
    //     }

    //     //TODO signup user

    //     logUserIn(user)
    // }

    // const hashPassword = password => {
    //     const hash = password //TODO: create a password hash.
    //     return hash
    // } 

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
                            onSubmit={handleSubmit}>
                            {/* <div class=" "> */}
                            <div class="">
                                <span>
                                    <label htmlFor="username:"></label>
                                    <input
                                        id='username'
                                        type="text"
                                        placeholder="USERNAME"
                                        // onBlur={checkUsername}
                                        ref={usernameInput}
                                        autoComplete="username" autoFocus />
                                </span>
                            </div>
                            <br></br>
                            <div className="">
                                <span>
                                    <label htmlFor="password:"></label>
                                    <input
                                        id='password' type="password"
                                        placeholder="PASSWORD"
                                        // onBlur={checkPassword}
                                        ref={passwordInput}
                                        autoComplete="new-password" />
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
                <small>Already have an account? <button type="button" className="btn btn-primary" onClick={() => window.location.assign('/')}>Login</button></small>
            </main>
        </div>
    )
}

export default Signup