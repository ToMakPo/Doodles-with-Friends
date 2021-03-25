import { useRef, useState } from "react"
import { useLogin } from "../utils/auth"
import { Link, useHistory } from "react-router-dom"

import '../styles/palette.css'
import '../styles/Login.css'
import swal from "sweetalert"

const Login = _ => {
    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const [errorMsg, setErrorMsg] = useState('')
    const history = useHistory()

    const login = useLogin();

    const handleSubmit = async e => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        try {

            await login({ username, password });

            // User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.

        } catch (err) {

            // Handle error responses from the API

            if (err.response && err.response.data) {
                swal({
                    title: "Invalid Code",
                    text: err.response.data.default || err.response.data.password,
                    icon: "error",
                });
            };

        }
    }

    return (
        <div
            id="bootstrap-overrides"
            className="login-main main sketchBackground">
            <div className="card-deck">
                <div className="card">
                    <h2 className="card-header">Existing Users</h2>
                    <div className="card-body d-flex justify-content-around align-items-center">
                        <form
                            className="d-flex"
                            onSubmit={handleSubmit}>
                            <input
                                id='username'
                                type="text"
                                autoComplete="username"
                                ref={usernameInput}
                                autoFocus
                                placeholder="USERNAME"
                            />
                            <input
                                id='password'
                                type="password"
                                ref={passwordInput}
                                autoComplete="current-password"
                                placeholder="PASSWORD"
                            />
                            <button type="submit" className="btn btn-primary">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
            <p>Don't have an account yet?
                <Link to='/signup'> Sign up</Link>
            </p>
        </div>
    )
}

export default Login