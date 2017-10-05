import {logger} from 'logger'
import {generator} from 'generator'



export class GameUniverse {

	constructor(props) {
		this.players = []
		this.playersHash = {}
		this.locations = []
	}
	
	init(props) {
		let pcGroove = generator.generateActor({name: "Groove", control: "player",	assetId: "droid"})
		this.players.push(pcGroove)
		this.playersHash[pcGroove.id] = pcGroove

		let pcMonkeyWrench = generator.generateActor({name: "Monkey Wrench", control: "player",	assetId: "droid"})
		this.players.push(pcMonkeyWrench)

		this.locations.push( generator.generateLocation() )
		logger.log("Game World created.")
	}

	getLocations(props) {
		return this.locations
	}

	getPlayers(props) {
		return this.players
	}	
	
	printWorld() {
		console.dir(this.locations[0])
	}
	
}