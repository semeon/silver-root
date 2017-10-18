import {logger} from 'logger'
import {QueueItem} from '../queue/queueItem.js'

export class Action {

	constructor(props) {
		this.data = props.data

		this.result = {
			success: false
		}
	}

	action(props) {
		// logger.log({m: "" + props.actor.getName() + " " + this.caption + " " + props.target.getName() + " ["})
		console.log("ACTION: action()")
	
		
	}

	complete(props) {
		// logger.log({m: "]"})
	}
}
