import {logger} from 'logger'
import {Q} from 'qObject'

Q.SpriteMarker = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Marker",
			sheet: "Marker",
			frame: 1
		}
		super(p)
	}
}
