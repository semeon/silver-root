import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteAreaObjectDefault = class extends Q.SpriteCustom {
	constructor(p) {
		if (!p) p = {
			sheet: "Bush_1"
		}
		if (!p.isCollidable) p.isCollidable = true
		super(p)
	}

	onTouch(col) {
		super.onTouch(col)
		// this.stage.context.eventController.onAreaObjectTouch({ areaObject: this })
	}

	onDestroy(){
		if (this.p.model.isDestroyed()) return
			
		console.log("SPRITE ON DESTROY")
		this.p.frame = 1
		this.p.isCollidable = false
	}
}

Q.SpriteBush_1 = class extends Q.SpriteAreaObjectDefault {
	constructor(props) {
		let p = {
			name: "Bush",
			sheet: "Bush_1"
		}
		super(p)
	}
}

Q.SpriteRock_1 = class extends Q.SpriteAreaObjectDefault {
	constructor(props) {
		let p = {
			name: "Rock",
			sheet: "Rock_1"
		}
		super(p)
	}
}