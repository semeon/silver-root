import {dice} from 'dice'
import {logger} from 'logger'

export let CombatActions = {

	attackThrow: function(props){
			let attack = {damage: dice.rollD20().value, critical: dice.rollBool(20)}
			let message = " - "
			message += this.getName() + " performs attack throw: "
			message += attack.damage
			if (attack.critical) message += " (critical)"
			logger.log({m: message})
			return attack
	},

	dodgeThrow: function(props) {
		let dodge = {success: dice.rollBool(20)}

		let message = " - "
		message += this.getName() + " performs dodge throw: "
		if (dodge.success) {
			message += "success"
		} else {
			message += "fail"
		}
		logger.log({m: message})

		return dodge
	},
		
	// receiveAttack: function(props) {
	// 	// props.damage, props.critical
	// 	this.takeDamage({damage: props.attack.damage})
	//
	// 	let message = " - "
	// 	message += this.getName() + " was"
	// 	if (props.attack.critical) message = message + " critically"
	// 	message += " hit for " + props.attack.damage + " HP"
	// 	logger.log({m: message})
	// }
	
}