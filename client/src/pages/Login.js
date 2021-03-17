import { useState, useRef } from "react"
import '../styles/palette.css'
import '../styles/Login.css'
import { useLogin } from "../utils/auth"

const Login = ({ logUserIn, setLoginDisplay }) => {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const login = useLogin();

    const handleSubmit = async e => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        console.log(username, password)
        try {
            const res = await login({ username, password });
            console.log(res)
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
        <div className="container">


            <main>
                <h2>ENTER PLAYER</h2>

                <div className="card-deck">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-body">

                                <form onSubmit={handleSubmit}>
                                    <div class="row ">
                                        <div class="col">
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
                                        <div class="col">
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

                                        <div >
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">GET STARTED</button>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        </div>

                    </div>


                    <div class="card">
                        <div class="card-body">
                            {/* <small>Already have an account?  */}
                            <div class="card-body">
                                <p>Already have an account?</p>

                            </div>
                            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => setLoginDisplay('login')}>SIGN IN</button>
                            {/* </small> */}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Login