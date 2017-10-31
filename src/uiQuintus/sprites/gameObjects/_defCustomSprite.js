import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteCustom = class extends Q.Sprite {

	constructor(p) {
		if (!p) p = {}
		if (!p.isCollidable) p.isCollidable = false
		if (!p.isDestroyed) p.isDestroyed = false
		super(p)
		this.on("touch", this, "onTouch")
	}
	
  onTouch(col) {
 		// logger.log("You see: " + this.p.name)
		this.stage.context.eventController.onAnyGameObjectTouch({target: this})
  }

	onExamine() {
		if (this.p.model) {
			this.p.model.onExamine()
		} else {
			logger.log("You see: " + this.p.name)
		}
	}

	onDestroy(){
		if (this.p.isDestroyed) return
		this.p.frame = 1
		this.p.isCollidable = false
		this.p.isDestroyed = true
	}

	getName() {
		let result = ""
		if (this.p.model)	result = this.p.model.getName()
		else result = this.p.name
		return result
	}

	linkModel(props) {
		this.p.model = props.model
		this.p.model.linkSprite({sprite: this})
	}

	moveToTile(props) {
		this.moveTo({ x: Q.tileToPoint(props.x), y: Q.tileToPoint(props.y) })
	}

	moveTo(props) {
		this.p.x = props.x
		this.p.y = props.y
	}
	
	isCollidable() {
		return this.p.isCollidable
	}

	getType() {
		let type = null
		if (this.p.model) type = this.p.model.getType()
		return type
	}

	getPointCoordinates(props) {
		let coord = {
			x: this.p.x,
			y: this.p.y
		}
		return coord
	}
		
	getGridCoordinates(props) {
		let coord = {
			x: Q.pointToTile(this.p.x),
			y: Q.pointToTile(this.p.y)
		}
		return coord
	}

}

