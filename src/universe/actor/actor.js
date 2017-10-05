import {dice} from 'dice'
import {logger} from 'logger'
import {GameObject} from '../_prototype/gameObject.js'


export class Actor extends GameObject {

	constructor(props) {
		let hpMax = props.special.E * 10

  	super({
			id: props.id, 
			name: props.name, 
			assetId: props.assetId,
			hpMax: hpMax
		})
		this.type = "actor"
		this.cotrol = props.control
		this.special = props.special
		this.hpMax = hpMax
	}
	
  isAlive() {
    return this.hp>0
  }
}


// SPECIAL
import {Special} from './special.js'
Actor.prototype.getSpecial = Special.getSpecial

// Abilities
import {Abilities} from './abilities.js'
Actor.prototype.getBaseDamage = Abilities.getBaseDamage
Actor.prototype.getCritChance = Abilities.getCritChance
Actor.prototype.getCritMultiplier = Abilities.getCritMultiplier
Actor.prototype.getDodgeChance = Abilities.getDodgeChance
Actor.prototype.getDT = Abilities.getDT


// Combat actions
import {CombatActions} from './combatActions.js'
Actor.prototype.attackThrow = CombatActions.attackThrow
Actor.prototype.dodgeThrow = CombatActions.dodgeThrow
// Actor.prototype.receiveAttack = CombatActions.receiveAttack


// Debug
import {print} from '../../utils/print.js'
Actor.prototype.print = print
