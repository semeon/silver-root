import {logger} from 'logger'
import {generator} from 'generator'
import {QueueController} from '../queue/queueController.js'

export class GameSession {

	constructor(props) {
		this.active = false
		this.universe = props.universe
		this.gm = props.gm
		this.queueController = new QueueController({session: this})
		this.gm.init({session: this})
		this.currentLocation = null
		this.players = []
	}
	
	start(props) {
		logger.log("Starting new game session..")
		if (!this.currentLocation) this.currentLocation = this.universe.getLocations()[0]
			
		this.generatePlayers()
			
		this.gm.init({session: this})
		this.gm.startGame()
	}

	generatePlayers(props) {
		this.players = []

		let pcGroove = generator.generateChar({
			name: "Groove", 
			control: "player",	
			assetId: "player1Img"
		})
		this.players.push(pcGroove)

		let pcMonkeyWrench = generator.generateChar({
			name: "Monkey Wrench", 
			control: "player",	
			assetId: "player2Img"
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