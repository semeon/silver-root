import {logger} from 'logger'
import {Q} from 'qObject'

const markerStates = ["goto", "examine", "attack"]


Q.SpriteMarker = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Marker",
			sheet: "Marker",
			frame: 1
		}
		super(p)
	}
	
	hide() {
		super.hide()
		this.moveTo({x: -100, y: -100})
	}

	show(props) {
		this.moveTo({x: props.x, y: props.y})
		super.show()
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

	onTouch(col) {
		let x = this.p.x
		let y = this.p.y

		let gridX = Q.pointToTile( x )
		let gridY = Q.pointToTile( y )

		super.onTouch(col)
		
		console.log("Marker state: " + this.getCurrentState())
		
		if (this.getCurrentState() == "goto") {
			// Request GM to move the selected player to X.Y
			this.stage.context.uiController.clearPath()
			this.stage.context.gm.do({
				action: "walk",
				actor: this.stage.context.selectedPlayer,
				target: {x: gridX, y: gridY}
			})
			
		
		} else if (this.getCurrentState() == "examine") {
			console.log("Switching to attack")
			this.switchToAttack()
			this.show({x: x, y: y})
			
		} else {
			
		}

		
	}
	
	
}


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
