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

		let universe = new Universe({locations: locations})
		logger.log("Game World created.")
		
		return universe
	}

	printWorld() {
		console.dir(this.locations[0])
	}
	
}