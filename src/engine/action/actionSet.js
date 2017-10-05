import {logger} from 'logger'
import {Attack} from './actions/attack.js'

export class ActionSet {

	constructor(props) {
		this.actions = {}

		this.actions["attack"] = new Attack()
	}

	attack(props) {
		this.actions["attack"].perform(props)
	}
	

}
