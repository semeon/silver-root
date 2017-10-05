import {dice} from 'dice'
import {logger} from 'logger'
import {Action} from './_action.js'

export class Attack extends Action {

	constructor(props) {
  	super({id: "attack", name: "attack", caption: "attacks"})
	}
	
	perform(props) {
		// props.action.perform({actor: props.actor, target: props.subject})

		this._start(props)


		// Step 1: calculate actors attack params
		let attack = props.actor.attackThrow()

		// Step 2: target attempt dodge
		let dodge = props.target.dodgeThrow()

		// Step 3: target receive damage
		if (!dodge || !dodge.success) props.target.receiveAttack({attack: attack, source: props.actor})


		this._complete(props)
	}
	

}