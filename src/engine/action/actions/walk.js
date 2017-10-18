import {dice} from 'dice'
import {logger} from 'logger'
import {Action} from './_action.js'

export class ActionWalk extends Action {

	constructor(props) {
  	super({
			id: "step", 
			name: "step", 
			caption: "attacks", 
			data: props.data
		})
		// this.data = props.data
	}
	
	action(props) {
		super.action()

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
	
		super.complete()


		console.log("Action ended: WALK")
	}
	

}