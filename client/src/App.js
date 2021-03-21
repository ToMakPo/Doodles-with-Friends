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
    const [lobby, setLobby] = useState({id: 'D5EA12C14'})
	useAuthTokenStore();
	const isAuthenticated = useIsAuthenticated();

	const home = <Home setLobby={setLobby}/>

	return (
		<LobbyContext.Provider value={lobby}>
			<WordBankProvider>
				{
				// false ? <ArtistView/>: //TODO: remove this line
				<Router>
					<PageHeader/>

					<Switch>
						<Route exact path='/' render={_ => isAuthenticated ? home : <Login/>} />
						<Route exact path='/login' render={_ => isAuthenticated ? home : <Login/>} />
						<Route exact path='/signup' render={_ => isAuthenticated ? home : <Signup/>} />
						<Route exact path='/waiting-room/:roomId' component={isAuthenticated ? WaitingRoom : Login} />
						<Route exact path='/active-game/:roomId' component={isAuthenticated ? ArtistView : Login} />
						<Route exact path='/score-board/:roomId' component={isAuthenticated ? ScoreBoard : Login} />
						<Route component={PageNotFound} />
					</Switch>
					
				</Router>
				}
				<PageFooter />
			</WordBankProvider>
		</LobbyContext.Provider>
	)
}
export default App
