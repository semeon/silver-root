import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteCustom = class extends Q.Sprite {

	constructor(props) {
		super(props)
		this.on("touch", this, "onTouch")
	}
	
  onTouch(col) {
 		logger.log("You see: " + this.p.name)
		this.stage.context.marker.hide()		
 		// console.log(col)
 		// console.dir("this.p.model")
 		// console.dir(this.p.model)
  }

	linkModel(props) {
		this.p.model = props.model
	}

	moveTo(props) {
		this.p.x = props.x
		this.p.y = props.y
	}

}

