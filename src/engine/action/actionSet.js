import {logger} from 'logger'
// import {Attack} from './actions/attack.js'

export let actionSet = {}

actionSet.walk = function(props) {

	let actor = props.actor
	let target = props.target
	let path = props.data.path

	let session = props.session
	let queueController = session.queueController

	console.log("Action started: WALK")
	console.log(" --   actor: " + actor.name)
	console.log(" --  target: " + path[path.length-1])
	
	for (let i=1; i<path.length; i++) {

		let step = path[i]
		let name = "Step " + i
		
		let transaction = function(props) {
			let step = path[i]
			let from = actor.getGridCoordinates()
			let to = step
			// console.log(" --  " + name )
			actor.setGridCoordinates({x: step[0], y: step[1]})
		}

		queueController.addItem({transaction: transaction, name: name})
	}
}

actionSet.attack = function(props) {

	let actor = props.actor
	let target = props.target
	let path = props.data
	let session = props.session
	let callback = props.callback
	let queueController = session.queueController

	console.log("Action started: ATTACK")
	console.log(" --   actor: " + actor.name)
	console.log(" --  target: " + target.name)
	
	// for (let i=1; i<path.length; i++) {
	//
	// 	let step = path[i]
	// 	let name = "Step " + i
	//
	// 	let transaction = function(props) {
	// 		let step = path[i]
	// 		let from = actor.getGridCoordinates()
	// 		let to = step
	// 		// console.log(" --  " + name )
	// 		actor.setGridCoordinates({x: step[0], y: step[1]})
	// 		props.callback()
	// 	}
	//
	// 	queueController.addItem({transaction: transaction, name: name})
	// }
}