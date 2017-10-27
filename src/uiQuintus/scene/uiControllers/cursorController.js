import {logger} from 'logger'
import {Q} from 'qObject'

export class CursorController {
  constructor(props) {
		this.ui = props.ui
		this.states = {
			goto:			{ key: "goto", 			asset: Q.assets["uiCursorGoTo"] 		},
			examine: 	{ key: "examine", 	asset: Q.assets["uiCursorExamine"] 	},
			attack: 	{ key: "attack", 		asset: Q.assets["uiCursorAttack"] 	},
			interact: { key: "interact",	asset: Q.assets["uiCursorInteract"] },
			select: 	{ key: "select", 		asset: Q.assets["uiCursorSelect"] 	},
			talk: 		{ key: "talk", 			asset: Q.assets["uiCursorTalk"] 		}
		}
		
		this.hoverTarget = null

		this.defaultState = this.states["examine"]
		this.state = this.defaultState
		this.lastCoords = {}
		this.cursorObj = document.getElementById(Q.CONST.rootNodeId)
  }	

	updateState(props) {
		let type = ""
		if (props && props.hover) this.hoverTarget = props.hover
		if ( !this.hoverTarget ) this.hoverTarget = this.ui.stage.locate(this.lastCoords.x, this.lastCoords.y)
		if ( this.hoverTarget ) type = this.hoverTarget.getType()

		// console.log("Type: " + type)

		let state = this.state.key

		if (type == "creature") {
			if (this.hoverTarget.p.model.getControl() == "player") {	
				state = "select"
			}	else {
				state = "attack"
			}

		} else if (type == "terrain" && !this.hoverTarget.isCollidable()  )	{ 
			state = "goto" 

		} else if (type == "terrain")	{ 
			state = "examine" 

		} else if (type == "ground") { 
			state = "goto"  		

		} else if (type == "marker") {
			// state = "goto"
			let markerState = this.ui.getMarkerState()
			console.log("sss: " + markerState)
			state = markerState

		} else { 
			state = "examine"
		}
		
		this.setState({state: state})
	}

	toggleState(props) {
		switch(this.state.key) {
	    case "goto":
				this.setState({ state: "examine" })
	      break

	    case "examine":
				this.setState({ state: "attack" })
        break

	    case "attack":
				this.setState({ state: "goto" })
        break
		}
	}

	getState(props) {
		return this.state.key
	}
	
	setState(props) {
		if( props.state && this.states[props.state] ) {
			this.state = this.states[props.state]
			this.updateCursor()
		} 
	}
	
	reset() {
		this.state = this.defaultState
		this.updateCursor()
	}
	
	updateCursor(props) {
		this.cursorObj.style.cursor = "url('" + this.state.asset + "'), auto"
	}

	updateCoords(props) {
		this.coords = props.coords
	}
	
}
