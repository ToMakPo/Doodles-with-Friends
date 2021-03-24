import { useRef } from "react"
import { useLogin } from "../utils/auth";
import { Link } from "react-router-dom";
import API from "../utils/API";

import '../styles/palette.css'
import '../styles/Signup.css'

const Signup = _ => {
    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const login = useLogin();

    const handleSubmit = async e => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        try {
            // Register the user.
            await API.register({ username, password });

            // User has been successfully registered, now log them in with the same information.
            await login({ username, password });

            // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
        } catch (err) {
            // Handle error responses from the API. This will include
            console.error(err.response?.data);
        }
    }

    return (
        <div
            id="bootstrap-overrides"
            className="signup-main main sketchBackground">
            <div className="card-deck">
                <div className="card">
                <h2 className="card-header">Sign Up</h2>
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
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                </div>
            </div>
            <p>Already have an account? 
                <Link to='/login'> Login</Link>
            </p>
        </div>
    )
}

export default Signup