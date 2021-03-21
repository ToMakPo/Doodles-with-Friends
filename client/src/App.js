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

import LobbyProvider from './utils/GameContext'
import { WordBankProvider } from './utils/GlobalState'
import { useAuthenticatedUser, useAuthTokenStore, useIsAuthenticated } from "./utils/auth";

import "./styles/palette.css"

const App = () => {
	useAuthTokenStore();
	const isAuthenticated = useIsAuthenticated();
	const AuthUser = useAuthenticatedUser()
	console.log(AuthUser);
	return (
		<LobbyProvider>
			<WordBankProvider>
				<PageHeader/>

				{true ? <ArtistView/>: //TODO: remove this line
				<Router>
					<Switch>
						<Route exact path='/' component={isAuthenticated ? Home : Login} />
						<Route exact path='/login' component={isAuthenticated ? Home : Login} />
						<Route exact path='/signup' component={isAuthenticated ? Home : Signup} />
						{isAuthenticated && <Route path='/waiting-room/:roomId' component={WaitingRoom} />}
						{isAuthenticated && <Route path='/active-game/:roomId' component={ArtistView} />}
						{isAuthenticated && <Route path='/score-board/:roomId' component={ScoreBoard} />}
						<Route component={PageNotFound} />
					</Switch>
					
				</Router>
				}
				<PageFooter />
			</WordBankProvider>
		</LobbyProvider>
	)
}
export default App
