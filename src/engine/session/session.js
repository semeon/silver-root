import {logger} from 'logger'
import {generator} from 'generator'

export class GameSession {

	constructor(props) {
		this.active = false
		this.universe = props.universe
		this.gm = props.gm
		this.gm.init({session: this})
		this.currentLocation = null
		this.players = []
	}
	
	start(props) {
		logger.log("Starting new game session..")
		if (!this.currentLocation) this.currentLocation = this.universe.getLocations()[0]
			
		this.generatePlayers()
			
		this.gm.init({location: this.currentLocation})
		this.gm.startGame()
	}

	generatePlayers(props) {
		this.players = []

		let pcGroove = generator.generateActor({
			name: "Groove", 
			control: "player",	
			assetId: "droid"
		})
		this.players.push(pcGroove)

		let pcMonkeyWrench = generator.generateActor({
			name: "Monkey Wrench", 
			control: "player",	
			assetId: "droid"
		})
		this.players.push(pcMonkeyWrench)

		this.addPlayersToLocation()
	}	

	addPlayersToLocation(props) {
		for (let i=0; i<this.players.length; i++) {
			let player = this.players[i]
			player.setLocation({location: this.currentLocation})
			player.setGridCoordinates({x: 1, y: 1+i})
		}
	}	

	getPlayers(props) {
		return this.players
	}


}