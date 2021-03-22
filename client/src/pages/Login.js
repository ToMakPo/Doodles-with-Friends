import { useRef } from "react"
import { useLogin } from "../utils/auth"
import { Link } from "react-router-dom"

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

    return (
        <div
            id="bootstrap-overrides"
            className=" sketchBackground">
            <div className="main container" >
                <div className="card-deck">
                    <div className="card">
                        <h2 className="card-header">Existing Users</h2>
                        <div className="card-body d-flex justify-content-around align-items-center">
                            <form 
                                className="d-flex justify-content-around align-items-center"
                                onSubmit={handleSubmit}>
                                <div className="">
                                    <span>
                                        <input
                                            id='username'
                                            type="text"
                                            autoComplete="username"
                                            ref={usernameInput}
                                            autoFocus
                                            placeholder="USERNAME"
                                        />
                                    </span>
                                </div>
                                <br></br>
                                <div className="">
                                    <span>
                                        <input
                                            id='password'
                                            type="password"
                                            ref={passwordInput}
                                            autoComplete="current-password"
                                            placeholder="PASSWORD"
                                        />
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block ">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
                <p>Don't have an account yet?
                    <Link to='/signup'> Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login