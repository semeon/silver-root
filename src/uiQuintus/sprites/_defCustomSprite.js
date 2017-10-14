import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteCustom = class extends Q.Sprite {

	constructor(props) {
		super(props)
		this.on("touch", this, "onTouch")
	}
	
  onTouch(col) {
 		logger.log("You see: " + this.p.name)
  }

	linkModel(props) {
		this.p.model = props.model
		this.p.model.linkSprite({sprite: this})
	}

	moveTo(props) {
		this.p.x = props.x
		this.p.y = props.y
	}

}

