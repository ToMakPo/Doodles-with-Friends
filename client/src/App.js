import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
	const isAuthenticated = useIsAuthenticated();

	const home = _ => <Home setLobby={setLobby}/>
	const pathname = window.location.pathname.split('/')[1]
	function fixURL(...ifs) {
		ifs.includes(pathname) && window.history.replaceState(null, '', '/')
	}

	return (
		<LobbyContext.Provider value={lobby}>
			<WordBankProvider>
				{
				// false ? <ArtistView/>: //TODO: remove this line
				<Router>
					<PageHeader/>

					<main>
						{!isAuthenticated ? (
							<Switch>
								{fixURL('home', 'waiting-room', 'active-game', 'score-board')}
								<Route exact path='/' component={Login} />
								<Route exact path='/login' component={Login} />
								<Route exact path='/signup' component={Signup} />
								<Route component={PageNotFound} />
							</Switch>
						) : (
							<Switch>
								{fixURL('login', 'signup')}
								<Route exact path='/' render={home}/>
								<Route exact path='/home' render={home} />
								<Route exact path='/waiting-room/:roomId' component={WaitingRoom} />
								<Route exact path='/active-game/:roomId' component={ArtistView} />
								<Route exact path='/score-board/:roomId' component={ScoreBoard} />
								<Route render={PageNotFound} />
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
