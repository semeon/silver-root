import {logger} from 'logger'
import {engine} from 'engine'

export class GameObject {

	constructor(props) {
		this.id = props.id
		this.type = "generic"
		this.name = props.name
		this.assetId = props.assetId
		this.hpMax = props.hpMax
		this.hp = this.hpMax
		this.destructable = true

		this.location = null
		this.gridCoordinates = null

		this.sprite = null
	}

	getId() {
		return this.id
	}
	getName() {
		return this.name
	}

	getHp() {
		return this.hp
	}

	getHpMax() {
		return this.hpMax
	}

	isDestroyed() {
		let result = this.destructable && this.hp<=0
		return result
	}

  increaseHP(props) {
    if ( (this.hp + props.d) >= this.hpMax ) {
      this.hp = this.hpMax
    } else {
      this.hp += props.propsd
    }
  }

  takeDamage(props) {
    if ( (this.hp - props.damage) <= 0 ) {
      this.hp = 0
    } else {
      this.hp -= props.damage
    }
  }

	dodgeThrow() {
		return false
	}

	receiveAttack(props) {
		// props.damage, props.critical
		this.takeDamage({damage: props.attack.damage})

		let message = " - "
		message += this.getName() + " was"
		if (props.attack.critical) message = message + " critically"
		message += " hit for " + props.attack.damage + " HP"
		logger.log({m: message})
	}
	
	linkSprite(props) {
		this.sprite = props.sprite
	}

	setLocation(props) {
		this.location = props.location
	}

	setGridCoordinates(props) {
		this.gridCoordinates = {
			x: props.x,
			y: props.y
		}
	}

	getGridCoordinates(props) {
		return this.gridCoordinates
	}

}

import {print} from '../../utils/print.js'
GameObject.prototype.print = print