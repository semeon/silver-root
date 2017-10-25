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
		this.destroyed = false

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

	// Hit points
	// ====================
	getHp() {
		return this.hp
	}

	getHpMax() {
		return this.hpMax
	}

  increaseHP(props) {
    if ( (this.hp + props.d) >= this.hpMax ) {
      this.hp = this.hpMax
    } else {
      this.hp += props.propsd
    }
  }

	// Taking Damage
	// ====================

	receiveAttack(props) {
		// props.damage, props.critical
		let message = ""
		if (!this.isDestructuble()) {
			message += this.getName() + " cannot be damaged."
			
		} else {
			this.takeDamage({damage: props.attack.damage})
			message += this.getName() + " was"
			if (props.attack.critical) message = message + " critically"
			message += " hit for " + props.attack.damage + " HP"
		}
		logger.log(message)
	}
	
	isDestructuble() {
		return this.destructable
	}

  takeDamage(props) {
		if (!this.isDestructuble()) return
			
    if ( (this.hp - props.damage) <= 0 ) {
      this.hp = 0
			this.onDestroy()
    } else {
      this.hp -= props.damage
    }
  }

	onDestroy() {
		if (this.sprite) this.sprite.onDestroy() // MUST BE CALLED BEFORE THE OBJ IS DESTROYED
		this.destroyed = true
	}

	isDestroyed() {
		return this.destroyed
	}



	dodgeThrow() {
		return {success: false}
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
		if (this.sprite) {
			this.sprite.moveToTile(this.gridCoordinates)
		}
	}

	getGridCoordinates(props) {
		return this.gridCoordinates
	}
	
	onExamine() {
		logger.log("You see: " + this.getName())
		logger.log(this.getName() + " has " + this.getHp() + "/" + this.getHpMax() + " HP")
	}

}

import {print} from '../../utils/print.js'
GameObject.prototype.print = print