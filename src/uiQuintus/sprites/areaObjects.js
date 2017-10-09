import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteAreaObjectDefault = class extends Q.SpriteCustom {
	constructor(p) {
		if (!p) p = {
			sheet: "Bush_1"			
		}
		super(p)
	}

	onTouch(col) {
		super.onTouch(col)

		this.stage.context.marker.hide()
		this.stage.context.marker.p.frame = 1
		this.stage.context.marker.moveTo({x: this.p.x, y: this.p.y})
		this.stage.context.marker.show()
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


Q.SpriteBush_2 = class extends Q.SpriteAreaObjectDefault {
	constructor(props) {
		let p = {
			name: "Bush",
			sheet: "Bush_2"
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