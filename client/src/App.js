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
import { useAuthTokenStore, useIsAuthenticated } from "./utils/auth";

const App = () => {
	// const [activeUser, setActiveUser] = useState(null)
	// const [loginDisplay, setLoginDisplay] = useState(true)

	// const logUserIn = user => setActiveUser(user)
	// const logUserOut = () => setActiveUser(null)
	useAuthTokenStore();
	const isAuthenticated = useIsAuthenticated();
	return (
		<WordBankProvider>
			{/* <GameContext.Provider value={{activeUser}}> */}
			<PageHeader /*logUserOut={logUserOut}*/ />

			<BrowserRouter>

				{/* { console.log('User is logged in:', activeUser)} */}
				<Switch>
					{/* {!isAuthenticated && <Login />} */}
					{!isAuthenticated && <Route exact path='/' component={Login} />}
					{!isAuthenticated && <Route exact path='/signup' component={Signup} />}
					{isAuthenticated && <Route exact path='/' component={Home} />}
					{/* {isAuthenticated && <Route exact path='/options' component={Options} />} */}
					{isAuthenticated && <Route exact path='/waiting-room/:roomId' component={WaitingRoom} />}
					{isAuthenticated && <Route exact path='/active-game/:roomId' component={ArtistView} />}
					{isAuthenticated && <Route exact path='/score-board/:roomId' component={ScoreBoard} />}
					{!isAuthenticated && <Route component={PageNotFound} />}
				</Switch>
			</BrowserRouter>

			<PageFooter />
			{/* </GameContext.Provider> */}
		</WordBankProvider>
	)
}

export default App
