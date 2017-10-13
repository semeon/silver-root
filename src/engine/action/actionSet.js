import {logger} from 'logger'
import {Attack} from './actions/attack.js'

// export class ActionSet {
//
// 	constructor(props) {
// 		this.actions = {}
//
// 		this.actions["attack"] = new Attack()
//
// 		this.actions["walk"] = new Attack()
//
//
//
//
// 	}
//
// 	// attack(props) {
// 	// 	this.actions["attack"].perform(props)
// 	// }
//
//
// }


export let actionSet = {}

actionSet.walk = function(props) {
	
	let actor = props.actor
	let target = props.target
	let session = props.session
	
}