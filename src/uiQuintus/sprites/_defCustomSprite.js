import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteCustom = class extends Q.Sprite {

	constructor(props) {
		super(props)
		this.on("touch", this, "onTouch")
	}
	
  onTouch(col) {
 		logger.log("Custom Sprite Touch: " + this.p.name)
 		// console.log(col)
 		// console.dir("this.p.model")
 		// console.dir(this.p.model)
  }

	linkModel(props) {
		this.p.model = props.model
	}

}
