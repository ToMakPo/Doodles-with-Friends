import { useRef } from "react"
import { useLogin } from '../utils/auth'
import '../styles/palette.css'
import '../styles/Login.css'

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();

    // Get the helper login function from the `useLogin` hook.
    const login = useLogin();

    const handleSubmit = async e => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try {

            await login({ username, password });

            // User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.

        } catch (err) {

            // Handle error responses from the API
            if (err.response && err.response.data) console.log(err.response.data);

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="text" ref={usernameRef} placeholder="Your username" /><br />
            <input type="password" ref={passwordRef} placeholder="Your password" /><br />
            <button>Submit</button>
        </form>
    )
}

export default Login