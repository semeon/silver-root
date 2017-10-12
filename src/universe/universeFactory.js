import {logger} from 'logger'
import {Universe} from './universe.js'
import {generator} from 'generator'

export class UniverseFactory {

	constructor(props) {
		this.locations = []
	}
	
	init(props) {
	}

	createUniverse() {
		// This would load or so far generate an instance of universe
		let locations = []

		locations.push( generator.generateLocation() )
		locations.push( generator.generateLocation() )
		locations.push( generator.generateLocation() )

		let players = this.generatePlayers()

		let universe = new Universe({locations: locations, players: players })
		logger.log("Game World created.")
		
		return universe
	}


	generatePlayers(props) {
		let players = []

		let pcGroove = generator.generateActor({name: "Groove", control: "player",	assetId: "droid"})
		players.push(pcGroove)

		let pcMonkeyWrench = generator.generateActor({name: "Monkey Wrench", control: "player",	assetId: "droid"})
		players.push(pcMonkeyWrench)

		return players
	}	
	
	printWorld() {
		console.dir(this.locations[0])
	}
	
}