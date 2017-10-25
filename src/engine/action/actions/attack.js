import {dice} from 'dice'
import {logger} from 'logger'
import {Action} from './_action.js'

export class Attack extends Action {

	constructor(props) {
		if (!props) props = {}
		props.name = "Attack"
  	super(props)
	}
	
	
	preconditionTest() {
		let result = {success: true, error: ""}
		
		let targetDistance = this.session.gm.calculateDistance({
			from: this.actor.getGridCoordinates(),
			to: this.target.getGridCoordinates()
		})

		if ( this.actor.attackDistance() < targetDistance ) {
			result.success = false
			result.error = "The target is out of range."
		}
		return result
	}	

	
	perform(props) {
		let self = this
		let name = self.name
		let transaction = function(props) {
			let attack = self.actor.attackThrow()
			let dodge = self.target.dodgeThrow()
			if (dodge && dodge.success) {
				// nothing
			} else {
				self.target.receiveAttack({attack: attack, source: self.actor})
			}
			console.log( self.target.name + ": " + self.target.getHp() + "/" + self.target.getHpMax() + " HP" )
		}
		self.session.queueController.addItem({transaction: transaction, name: name})
	}

}
