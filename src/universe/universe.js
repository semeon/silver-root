import {logger} from 'logger'
import {generator} from 'generator'

export class Universe {

	constructor(props) {
		this.data = {}
		this.data.locations = props.locations
		this.data.players = props.players
	}

	getDataObject() {
		return this.data
	}
	
	getLocations() {
		return this.data.locations
	}

	getPalyers() {
		return this.data.players
	}


	printWorld() {
		console.dir(this.data.locations[0])
	}
	
}