import {logger} from 'logger'

export class GameSession {

	constructor(props) {
		this.active = false
		this.universe = props.universe
		this.engine = props.engine
		this.master = props.gm
		this.currentLocation = null
	}
	
	start(props) {
		console.log("Starting new game session..")
		if (!this.currentLocation) this.currentLocation = this.universe.getLocations()[0]
		this.master.init({location: this.currentLocation})
		this.master.startGame()
	}

}