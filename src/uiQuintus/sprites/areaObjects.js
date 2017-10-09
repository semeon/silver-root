import {logger} from 'logger'
import {Q} from 'qObject'

Q.SpriteBush_1 = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Bush",
			sheet: "Bush_1"
		}
		super(p)
	}
}


Q.SpriteBush_2 = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Bush",
			sheet: "Bush_2"
		}
		super(p)
	}
}


Q.SpriteRock_1 = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Rock",
			sheet: "Rock_1"
		}
		super(p)
	}
}