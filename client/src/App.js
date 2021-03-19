import { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

import WaitingRoom from './pages/WaitingRoom'
import ArtistView from './pages/ArtistView'

import ScoreBoard from './pages/ScoreBoard'
// import GameContext from './utils/GameContext'
import GameContext from './utils/GameContext'
import { WordBankProvider } from './utils/GlobalState'
import PageNotFound from './pages/PageNotFound'
import "./styles/palette.css"
import { useAuthenticatedUser, useAuthTokenStore, useIsAuthenticated } from "./utils/auth";

const App = () => {

	const [lobby, setLobby] = useState({})

	useAuthTokenStore();
	const isAuthenticated = useIsAuthenticated();
	const AuthUser = useAuthenticatedUser()
	console.log(AuthUser);
	return (
		<WordBankProvider>
			<GameContext.Provider value={{ lobby, setLobby }}>
				<BrowserRouter>
					<PageHeader /*logUserOut={logUserOut}*/ />


					{/* { console.log('User is logged in:', activeUser)} */}
					<Switch>
						<Route exact path='/' component={isAuthenticated ? Home : Login} />
						<Route exact path='/login' component={isAuthenticated ? Home : Login} />
						<Route exact path='/signup' component={isAuthenticated ? Home : Signup} />
						{isAuthenticated && <Route exact path='/waiting-room' component={WaitingRoom} />}
						{isAuthenticated && <Route exact path='/active-game/:roomId' component={ArtistView} />}
						{isAuthenticated && <Route exact path='/score-board/:roomId' component={ScoreBoard} />}
						<Route component={PageNotFound} />
					</Switch>
				</BrowserRouter>

				<PageFooter />
			</GameContext.Provider>
		</WordBankProvider>
	)
}

export default App
