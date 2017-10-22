import {logger} from 'logger'
import {Q} from 'qObject'

Q.SpritePathStep = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Path",
			sheet: "PathStep",
			frame: 0
		}
		super(p)
	}
}

Q.SpritePlayerHighlight = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "PlayerHighlight",
			sheet: "PlayerHighlight",
			frame: 0
		}
		super(p)
	}
}


Q.InfoLabel = class extends Q.UI.Text  {
	constructor(props) {
		let p = {
			align: "left",
			color: "white",
			x: props.x, 
		  y: props.y,
			size: 12,
		  label: props.labelText
		}
		super(p)
	}
}
