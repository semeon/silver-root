import {logger} from 'logger'

export class Action {

	constructor(props) {
		this.id = props.id
		this.name = props.name
		this.caption = props.caption
		this.result = {
			success: false
		}
	}
	
	// Private
	_start(props) {
		logger.log({m: "" + props.actor.getName() + " " + this.caption + " " + props.target.getName() + " ["})
	}

	_complete(props) {
		logger.log({m: "]"})
	}
}
