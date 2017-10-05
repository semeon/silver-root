import {dice} from 'dice'
import {logger} from 'logger'

export let Abilities = {

	getBaseDamage: function(props) {
		// TODO - make depending on weapons
		let baseDamage = {
			min: Math.floor(this.getSpecial({attribute: "S"})/2), 
			max: Math.floor(this.getSpecial({attribute: "S"}))
		}
		return baseDamage
	},

	getCritChance: function(props) {
		let critChance = this.getSpecial({attribute: "L"}) * 5
		return critChance
	},

	getCritMultiplier: function(props) {
		// TODO - make depending on weapons
		let critMultiplier = this.getSpecial({attribute: "S"})
		return critMultiplier
	},

	getDT: function(props) {
		// TODO - make depending on armour
		let dt = this.getSpecial({attribute: "E"})
		return dt
	},

	getDodgeChance() {
		// TODO - make depending on armour
		let dodgeChance = Math.floor( this.getSpecial({attribute: "A"}) + this.getSpecial({attribute: "P"}) + this.getSpecial({attribute: "L"}) )
		return dodgeChance
	}
}