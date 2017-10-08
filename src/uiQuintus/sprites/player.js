import {logger} from 'logger'
import {Q} from 'qObject'

Q.PlayerSprite = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			sheet: "Player",
		}
		super(p)
	}
}