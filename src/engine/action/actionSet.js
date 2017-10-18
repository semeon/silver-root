import {logger} from 'logger'
// import {Attack} from './actions/attack.js'

export let actionSet = {}

actionSet.walk = function(props) {

	let actor = props.actor
	let target = props.target
	let path = props.data
	let gm = props.gm
	let callback = props.callback

	console.log("Action started: WALK")
	console.log(" --   actor: " + actor.name)
	console.log(" --  target: ")
	console.log(" --  	path: ")
	console.dir(path)

	
	for (let i=1; i<path.length; i++) {

		setTimeout( function(){
			let step = path[i]
			let from = actor.getGridCoordinates()
			let to = step
			console.log(" --  STEP " + i )
			// console.dir(step)
			actor.setGridCoordinates({x: step[0], y: step[1]})
			
			if( i >= path.length-1) callback()
			
		}, (i+1) * 300)

		

	}
	
}