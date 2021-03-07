import { BrowserRouter as Router, Route } from 'express'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
import ActiveGame from './pages/ActiveGame'
import Home from './pages/Home'
import Login from './pages/Login'
import ScoreBoard from './pages/ScoreBoard'
import WaitingRoom from './pages/WaitingRoom'

function App() {
	return (
		<>
			<PageHeader/>

			<Router>
				<Route exact path='/login' component={Login}/>
				<Route exact path='/home' component={Home}/>
				<Route exact path='/waiting-room/:roomId' component={WaitingRoom}/>
				<Route exact path='/active-game/:roomId' component={ActiveGame}/>
				<Route exact path='/score-board/:roomId' component={ScoreBoard}/>
			</Router>

			<PageFooter/>
		</>
	)
}

export default App
