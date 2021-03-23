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
            console.log(err.response?.data);
        }
    }

    return (
        <div
            id="bootstrap-overrides"
            className=" sketchBackground">
            <div className="main container">
                <div className="card-deck">
                    <div className="card">
                    <h2 className="card-header">Sign Up</h2>
                    <div className="card-body d-flex justify-content-around align-items-center">
                        {/* <form
                            className="d-flex justify-content-around align-items-center"
                            onSubmit={handleSubmit}>
                            <div className="">
                                <span>
                                    <label htmlFor="username:"></label>
                                    <input
                                        id='username'
                                        type="text"
                                        placeholder="USERNAME"
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
                                        ref={passwordInput}
                                        autoComplete="new-password" />
                                </span>
                            </div>

                            <button className="btn btn-primary btn-block">Submit</button>
                        </form> */}
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
        </div>
    )
}

export default Signup