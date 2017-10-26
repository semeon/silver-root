import {logger} from 'logger'
import {Q} from 'qObject'


		// Q.assets["uiCursorGoTo"] = uiCursorGoTo
		// Q.assets["uiCursorExamine"] = uiCursorExamine
		// Q.assets["uiCursorAttack"] = uiCursorAttack
		// Q.assets["uiCursorInteract"] = uiCursorInteract

export class CursorController {
  constructor(props) {
		this.ui = props.ui
		this.assetNames = ["uiCursorGoTo", "uiCursorExamine", "uiCursorAttack", "uiCursorInteract"]
		
		this.cursorObj = document.getElementById(Q.CONST.rootNodeId)
  }	
	
	reset() {
		let assetName = this.assetNames[0]

		if (this.ui && this.ui.state) {
			assetName = this.assetNames[this.ui.state]
		}
		
		if( Q.assets[assetName] ) this.setCursor({asset: Q.assets[assetName]})
	}
	
	setCursor(props) {
		this.cursorObj.style.cursor = "url('" + props.asset + "'), auto"
	}
	
	
	
}


// let elementToChange = document.getElementById("gameUi")
// if (marker == "goto") elementToChange.style.cursor = "url('" + Q.assets["uiCursorGoTo"] + "'), auto"
// if (marker == "examine") elementToChange.style.cursor = "url('" + Q.assets["uiCursorExamine"] + "'), auto"
