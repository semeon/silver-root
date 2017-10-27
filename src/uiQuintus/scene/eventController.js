import {logger} from 'logger'
import {Q} from 'qObject'

const clone = require('clone')

export class EventController {
  constructor(props) {
		this.context = props.context
		this.target = null
		this.hover = null
  }	

	resetState() {
		this.target = null
		// this.context.uiController.reset()
	}
	
	onAnyGameObjectTouch(props) {
		this.target = props.target
		if ( !this.target ) return

		if ( this.context.gm.isBusy() ) this.context.gm.abortAction()
		console.log("!!! ANY TOUCH !!! Target: " + this.target.getName())

		this.context.uiController.resetMarker()
		this.context.uiController.resetPath()
		let cursorState = this.context.uiController.getCursorState()

		switch (cursorState) {

			//  GoTo Request
			// -----------------------------------------------------------------
			case "goto":
				if ( !this.target.isCollidable() ) {
					this.context.uiController.updateMarker({ target: this.target })
					this.context.uiController.showPath({target: this.target})
				} else {
					console.log(">> Cannot get there.")
				}
				break

			// Examine Request
			// -----------------------------------------------------------------
			case "examine":
				this.context.uiController.updateMarker({target: this.target})
				this.target.onExamine()
				break


			// Attack Request
			// -----------------------------------------------------------------
			case "attack":
				this.context.uiController.updateMarker({target: this.target})
				this.prepareAttack()
				break


			// Player Selection Request
			// -----------------------------------------------------------------
			case "select":
				if (this.target.p.model.getControl() == "player") {
					for (let i=0; i<this.context.players.length; i++) {
						this.context.players[i].hideHl()
					}
					this.target.select()
				}

				break

			default: 
		}
	}

	// ===========================================================================
	onMouseMove(props) {
		let newObject = props.sprite
		
		this.context.uiController.updateCursorCoords({ coords: props.coords })

		if ( this.hover && this.hover === newObject ) {
			
		} else {
			this.hover = newObject
			this.context.uiController.updateCursor({ hover: this.hover })
		}
	}

	
	// ===========================================================================
	onKeyDown(props) {
		if (!this.target) return

		let event = props.event
		let code = event.code
		console.log("Key Down: " + code)
		switch(code) {
		    case "Space":
						// let marker = this.context.uiController.marker.toggle({target: this.target})
						this.context.uiController.resetMarker()
						this.context.uiController.toggleCursor()
		        break
		    default:
		}
	}	


	// ===========================================================================
	onGotoMarkerTouch(props){
		// Request GM to move the selected player to X.Y

		let self = this
		let marker = props.marker
		let coord = marker.getGridCoordinates() // {x: .., y: .. }
		
		this.context.uiController.resetPath()

		this.context.gm.do({
			action: "walk",
			actor: this.context.selectedPlayer.p.model,
			target: coord,
			data: {matrix: this.context.collisionMatrix.update()},
			success: function(props) {
				console.log("WALK success callback")
				self.context.uiController.resetMarker()
				self.context.uiController.resetPath()
				self.context.uiController.resetCursor()
			},
			fail: function(props) {
				let m = "WALK Action failed" 
				if (props && props.reason) m = m + ": " + props.reason
				logger.log(m)
			}
		})
	}


	// ===========================================================================
	onExamineMarkerTouch(props) {
		if (this.target && this.target.p && this.target.p.model) {
			this.target.p.model.onExamine()
		} else {
			logger.log("You see nothing.")
		}
	}

	// ===========================================================================
	onAttackMarkerTouch(props) {
		let self = this

		let actor = this.context.selectedPlayer
		let target = this.target

		if (this.target && this.target.p && this.target.p.model) {

			this.context.gm.do({
				action: "attack",
				actor: actor.p.model,
				target: target.p.model,
				data: null,
				success: function(props) {
					// console.log("ATTACK success callback")

					if (target.p.model.isDestroyed()) {
						console.log(target.getName() + " is destroyed.")
						self.context.uiController.resetMarker()
						self.context.uiController.updateCursor()
					}
				},
				fail: function(props) {
					let m = "ATTACK Action failed" 
					if (props && props.reason) m = m + ": " + props.reason
					logger.log(m)
				}
			})


		} else {
			logger.log("There is no taget.")
		}
	}


	// ===========================================================================
	prepareAttack(props) {
		let actor = this.context.selectedPlayer
		let target = this.target
		let distance = this.context.gm.calculateDistance({ from: actor.getGridCoordinates(), 	to: target.getGridCoordinates()	})
		
		console.log("Attack Mode is ON:")
		console.log(" --  Actor: " + actor.getName() + " [" + actor.getGridCoordinates().x + ", " +  actor.getGridCoordinates().y + "]")
		console.log(" -- Target: " + target.getName() + " [" + target.getGridCoordinates().x + ", " +  target.getGridCoordinates().y + "]")
		console.log(" --   Dist: " + distance + " m")
	}

}