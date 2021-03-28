/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import WaitingRoom from './pages/WaitingRoom'
import ActiveGame from './pages/ActiveGame'
import ScoreBoard from './pages/ScoreBoard'
// import PageNotFound from './pages/PageNotFound'

import LobbyContext from './utils/LobbyContext'
import { WordBankProvider } from './utils/GlobalState'
import { useAuthTokenStore, useIsAuthenticated } from "./utils/auth";

import "./styles/palette.css"

const App = () => {
	const [lobby, setLobby] = useState()

	useAuthTokenStore();
	const isAuthenticated = useIsAuthenticated() || false;

	const history = useHistory()

	function fixURL(defaultPage, ...ifs) {
		const pathname = window.location.pathname.split('/')[1]

		if (pathname === '' || ifs.includes(pathname)) {
			// window.history.replaceState(null, '', '/' + defaultPage)
			history?.push(defaultPage)
		}
	}

	useEffect(() => {
		if (!isAuthenticated) {
			fixURL('login', 'home', 'waiting-room', 'active-game', 'score-board')
		} else {
			fixURL('home', 'login', 'signup')
		}
	}, [])

	return (
		<LobbyContext.Provider value={lobby}>
			<WordBankProvider>
				{
					<Router>
						<PageHeader loggedIn={isAuthenticated} />

						{/* {true ? <ScoreBoard/>: //TODO: remove this line */}

						<main>
							{!isAuthenticated ? (
								<Switch>
									<Route exact path='/login' component={Login} />
									<Route exact path='/signup' component={Signup} />

									<Route component={Login} />
									{/* <Route render={_ => <div>PageNotFound (logged out)</div>} /> */}
								</Switch>
							) : (
								<Switch>
									<Route exact path='/home' render={_ => <Home setLobby={setLobby} />} />
									<Route exact path='/waiting-room/:lobbyCode' component={WaitingRoom} />
									<Route exact path='/active-game/:lobbyCode' component={ActiveGame} />
									<Route exact path='/score-board/:lobbyCode' component={ScoreBoard} />
									<Route render={_ => <Home setLobby={setLobby} />} />
									{/* <Route render={PageNotFound} /> */}
								</Switch>
							)}
						</main>
						{/* }  */}


					</Router>

				}
				<PageFooter />
			</WordBankProvider>
		</LobbyContext.Provider>
	)
}
export default App
