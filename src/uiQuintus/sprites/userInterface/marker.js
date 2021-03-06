import {logger} from 'logger'
import {Q} from 'qObject'

const markerStates = ["goto", "examine", "attack"]


Q.SpriteMarker = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Marker",
			sheet: "Marker",
			frame: 1,
			isActive: false,
			state: null
		}
		super(p)
	}

	getType() {
		let type = "marker"
		return type
	}
	
	hide() {
		super.hide()
		this.p.isActive = false
		this.moveTo({x: -100, y: -100})
	}

	show(props) {
		this.moveTo({x: props.x, y: props.y})
		this.p.isActive = true
		super.show()
	}

	isActive(props) {
		return this.p.isActive
	}

	switchToGoTo() {
		this.p.frame = 0
	}

	switchToExamine() {
		this.p.frame = 1
	}

	switchToAttack() {
		this.p.frame = 2
	}

	getCurrentState() {
		return markerStates[this.p.frame]
	}

	onTouch(col, e) {
		// super.onTouch(col)
		if (this.getCurrentState() == "goto") {
			this.stage.context.eventController.onGotoMarkerTouch({ marker: this })			

		} else if (this.getCurrentState() == "examine") {
			this.stage.context.eventController.onExamineMarkerTouch({ marker: this })

		} else if (this.getCurrentState() == "attack") {
			this.stage.context.eventController.onAttackMarkerTouch({ marker: this })
			console.log()
			
		} else {
			
		}
	}
}
