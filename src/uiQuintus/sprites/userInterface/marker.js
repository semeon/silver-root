import {logger} from 'logger'
import {Q} from 'qObject'

const markerStates = ["goto", "examine", "attack"]


Q.SpriteMarker = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Marker",
			sheet: "Marker",
			frame: 1,
			isActive: false
		}
		super(p)
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
	
	toggle(props) {
		
		let target = props.target
		
		
		if (this.getCurrentState() == "goto") {
			this.switchToExamine()

		} else if (this.getCurrentState() == "examine") {
			this.switchToAttack()

		} else if (this.getCurrentState() == "attack") {
			
			console.dir(target)
			
			if ( !target.isCollidable() ) {
				this.switchToGoTo()

			} else {
				this.switchToExamine()
			}
		}
		
		return markerStates[this.p.frame]
	}

	switchToGoTo() {
		this.p.frame = 0
		this.stage.context.eventController.onSwitchingToGoTo({ marker: this })
	}

	switchToExamine() {
		this.p.frame = 1
		this.stage.context.eventController.onSwitchingToExamine({ marker: this })
	}

	switchToAttack() {
		this.p.frame = 2
		this.stage.context.eventController.onSwitchingToAttack({ marker: this })
	}

	getCurrentState() {
		return markerStates[this.p.frame]
	}

	onTouch(col) {
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
