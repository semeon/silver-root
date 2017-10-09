import {logger} from 'logger'
import {Q} from 'qObject'

Q.PlayerSprite = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "R2-D2",
			sheet: "Player"
		}
		super(p)
	}
}