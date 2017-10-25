import {logger} from 'logger'

export class Action {

	constructor(props) {
		this.name = props.name
		this.actor = props.actor
		this.target = props.target
		this.data = props.data
		this.session = props.session

		this.result = {
			success: false
		}
	}

	preconditionTest() {
		let result = {success: true, error: ""}
		
		return result
	}

	perform(props) {
		
	}

}
