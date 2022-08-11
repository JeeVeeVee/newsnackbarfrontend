import logo from "../logo.svg";
import LoginButton from "../components/auth0/Login";
import Profile from "../components/auth0/Profile";
import LogoutButton from "../components/auth0/Logout";

export default function () {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Welcome home
                </p>
                <LoginButton />
                <Profile />
                <LogoutButton />
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>

        </div>
    )
}