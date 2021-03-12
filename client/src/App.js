import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Options from './pages/Options'
import WaitingRoom from './pages/WaitingRoom'
import ActiveGame from './pages/ActiveGame'
import ScoreBoard from './pages/ScoreBoard'
import GameContext from './utils/GameContext'
import PageNotFound from './pages/PageNotFound'
import "./styles/palette.css"

const App = () => {
	const [activeUser, setActiveUser] = useState(null)
	const [loginDisplay, setLoginDisplay] = useState(true)

	const logUserIn = user => setActiveUser(user)
	const logUserOut = () => setActiveUser(null)

	return (
		<GameContext.Provider value={{activeUser}}>
			<PageHeader logUserOut={logUserOut}/>

			{
				// If the user is not logged in, then direct the user to the login page. Other wise, take them to the page requested page.
				true ? <WaitingRoom/> :
				activeUser === null ? (
					loginDisplay 
						? <Login {...{logUserIn, setLoginDisplay}}/>
						: <Signup {...{logUserIn, setLoginDisplay}}/>
				) : (
					<Router>
						{ console.log('User is logged in:', activeUser) }
						<Switch>
							<Route exact path='/' component={Home}/>
							<Route exact path='/home' component={Home}/>
							<Route exact path='/options' component={Options}/>
							<Route exact path='/waiting-room/:roomId' component={WaitingRoom}/>
							<Route exact path='/active-game/:roomId' component={ActiveGame}/>
							<Route exact path='/score-board/:roomId' component={ScoreBoard}/>
							<Route path='/' component={PageNotFound}/>
						</Switch>
					</Router>
				)
			}

			<PageFooter/>
		</GameContext.Provider>
	)
}

export default App
