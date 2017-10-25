import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteCustom = class extends Q.Sprite {

	constructor(p) {
		if (!p) p = {}
		if (!p.isCollidable) p.isCollidable = false
		super(p)
		this.on("touch", this, "onTouch")
	}
	
  onTouch(col) {
 		// logger.log("You see: " + this.p.name)
		this.stage.context.eventController.onAnyGameObjectTouch({target: this})
  }

	linkModel(props) {
		this.p.model = props.model
		this.p.model.linkSprite({sprite: this})
	}

	moveToTile(props) {
		this.moveTo({ x: Q.tileToPoint( props.x ), y: Q.tileToPoint( props.y ) })
	}

	moveTo(props) {
		this.p.x = props.x
		this.p.y = props.y
	}
	
	isCollidable() {
		return this.p.isCollidable
	}
	
	getGridCoordinates(props) {
		let coord = {
			x: Q.pointToTile(this.p.x),
			y: Q.pointToTile(this.p.y)
		}
		return coord
	}

}

