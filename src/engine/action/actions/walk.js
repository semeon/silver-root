import {dice} from 'dice'
import {logger} from 'logger'
import {Action} from './_action.js'

export class Walk extends Action {

	constructor(props) {
		if (!props) props = {}
		props.name = "Attack"
  	super(props)
	}
	
	
	preconditionTest() {
		let result = {success: true, error: ""}
		return result
	}	

	
	perform(props) {
		let self = this

		let path = self.data.path

		console.log("Action started: WALK")
		console.log(" --   actor: " + self.actor.name)
		console.log(" --  target: " + path[path.length-1])
	
		for (let i=1; i<path.length; i++) {

			let step = path[i]
			let name = "Step " + i
		
			let transaction = function(props) {
				let step = path[i]
				let from = self.actor.getGridCoordinates()
				let to = step
				// console.log(" --  " + name )
				self.actor.setGridCoordinates({x: step[0], y: step[1]})
			}
			self.session.queueController.addItem({transaction: transaction, name: name})
		}

	}

}
