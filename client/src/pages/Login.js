import { useRef } from "react"
import { useLogin } from "../utils/auth"

import '../styles/palette.css'
import '../styles/Login.css'

const Login = _ => {
    const usernameInput = useRef('')
    const passwordInput = useRef('')

    const login = useLogin();

    const handleSubmit = async e => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        console.log(username, password)
        try {
            login({ username, password });
            // User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
        } catch (err) {
            // Handle error responses from the API
            if (err.response && err.response.data) console.log(err.response.data);
        }
    }
    // const login = event => {
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

    //     const confirmed = true// TODO check username and password against database

    //     if (confirmed) {
    //         const user = {}// TODO get user profile from database

    //         logUserIn(user)
    //     } else {
    //         //TODO display message to let user know that the username or password did not match.
    //     }
    // }

    return (
        <div
            id="bootstrap-overrides"
            className=" sketchBackground">
            <main className="container" >
                <div className="card-deck">
                    <div className="card">
                        <h2 className="card-header">Existing Users</h2>
                        {/* <div className="card-body"> */}
                            <div className="card-body d-flex justify-content-around align-items-center">

                                <form 
                                className="d-flex justify-content-around align-items-center"
                                onSubmit={handleSubmit}>
                                    {/* <div className=" "> */}
                                        <div className="">
                                            {/* One of three columns */}
                                            <span>
                                                {/* <label htmlFor="username:">Username</label> */}
                                                <input
                                                    id='username'
                                                    type="text"
                                                    // onBlur={event => setUsername(event.target.value)}
                                                    autoComplete="username"
                                                    ref={usernameInput}
                                                    autoFocus
                                                    placeholder="USERNAME"
                                                />
                                            </span>
                                        </div>
                                        <br></br>
                                        <div className="">
                                            {/* One of three columns */}
                                            <span>
                                                {/* <label htmlFor="password:">Password</label> */}
                                                <input
                                                    id='password'
                                                    type="password"
                                                    // onBlur={event => setPassword(event.target.value)}
                                                    ref={passwordInput}
                                                    autoComplete="current-password"
                                                    placeholder="PASSWORD"
                                                />
                                            </span>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block ">Log In</button>
                                    {/* </div> */}
                                </form>
                            </div>
                            {/* </div> */}
                            </div>
                    </div>
                    <br></br>

                    {/* <div className="card"> */}
                        {/* <h2 className="card-header">New Users</h2> */}
                        {/* <div className="card-body"> */}
                            {/* <div className="card-body d-flex justify-content-around align-items-center"> */}
                                {/* <div> */}
                                    {/* <div className="row"> */}
                                        {/* <div className="col"> */}

                                            <p>New User? <button type="button" 
                                        className="btn btn-primary " onClick={() => window.location.assign('/signup')}>Register</button>
                                            </p>
                                        {/* </div> */}
                                    {/* </div> */}
                                {/* </div> */}
                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                {/* </div> */}

            </main>
        </div>
    )
}

export default Login