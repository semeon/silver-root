import {dice} from 'dice'
import {logger} from 'logger'

export let CombatActions = {

	attackThrow: function(props){
			let attack = {damage: dice.rollD20().value, critical: dice.rollBool(20), source: this}
			let message = ""
			message += this.getName() + " performs attack throw: "
			message += attack.damage
			if (attack.critical) message += " (critical)"
			// logger.log(message)

			return attack
	},

	dodgeThrow: function(props) {
		let dodge = {success: dice.rollBool(20)}

		let message = ""
		message += this.getName() + " attepts a dodge throw: "
		if (dodge.success) {
			message += "success"
		} else {
			message += "fail"
		}
		logger.log(message)

		return dodge
	}

	
}