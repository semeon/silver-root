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

	let session = props.session
	let queueController = session.queueController

	// console.log("Action started: ATTACK")
	// console.log(" --   actor: " + actor.name)
	// console.log(" --  target: " + target.name)

	let name = "Attack"
	let transaction = function(props) {

		// Step 1: calculate actors attack params
		let attack = actor.attackThrow()

		// Step 2: target attempt dodge
		let dodge = target.dodgeThrow()

		// Step 3: target receive damage
		if (dodge && dodge.success) {
			// nothing
		} else {
			target.receiveAttack({attack: attack, source: actor})
		}

		console.log( target.name + ": " + target.getHp() + "/" + target.getHpMax() + " HP" )
	}
	queueController.addItem({transaction: transaction, name: name})

}