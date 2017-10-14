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
	let path = props.data
	let session = props.session

	console.log("Action started: WALK")
	console.log(" --   actor: " + actor.name)
	console.log(" --  target: ")
	console.dir(target)
	
	for (let i=0; i<path.length; i++) {

		setTimeout(function(){
			let step = path[i]
			let from = actor.getGridCoordinates()
			let to = step
			console.log(" --  STEP " + i )
			console.dir(step)
			actor.setGridCoordinates({x: step[0], y: step[1]})
		}, (i+1) * 500)


	}
	


	console.log("Action ended: WALK")
	
}