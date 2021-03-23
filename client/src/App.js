import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import WaitingRoom from './pages/WaitingRoom'
import ArtistView from './pages/ArtistView'
import PageNotFound from './pages/PageNotFound'
import ScoreBoard from './pages/ScoreBoard'

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
			window.history.replaceState(null, '', '/' + defaultPage)
			history?.push(defaultPage)
		}
	}

	if (!isAuthenticated) {
		console.log({isAuthenticated});
		fixURL('login', 'home', 'waiting-room', 'active-game', 'score-board')
	} else {
		fixURL('home', 'login', 'signup')
	}

	return (
		<LobbyContext.Provider value={lobby}>
			<WordBankProvider>
				{
				// true ? <ArtistView/>: //TODO: remove this line
				<Router>
					<PageHeader loggedIn={isAuthenticated}/>

					<main>
						{!isAuthenticated ? (
							<Switch>
								<Route exact path='/login' component={Login} />
								<Route exact path='/signup' component={Signup} />
								<Route render={_ => <div>PageNotFound (logged out)</div>} />
							</Switch>
						) : (
							<Switch>
								<Route exact path='/home' render={_ => <Home setLobby={setLobby}/>} />
								<Route exact path='/waiting-room/:roomId' component={WaitingRoom} />
								<Route exact path='/active-game/:roomId' component={ArtistView} />
								<Route exact path='/score-board/:roomId' component={ScoreBoard} />
								<Route render={_ => <div>PageNotFound (logged in)</div>} />
								{/* <Route render={PageNotFound} /> */}
							</Switch>
						)}
					</main>
					
				</Router>
				}
				<PageFooter />
			</WordBankProvider>
		</LobbyContext.Provider>
	)
}
export default App
