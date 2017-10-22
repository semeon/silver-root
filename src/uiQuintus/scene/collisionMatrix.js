import {logger} from 'logger'
import {Q} from 'qObject'
const clone = require('clone')

export class CollisionMatrix {
  constructor(props) {
		this.stage = props.stage
		this.template = props.stage.context.locData.emptyGrid
		this.collisionMatrix = []
  }	
	
	update(props) {
		let stageItems = this.stage.index
		this.collisionMatrix = clone(this.template)

		for(let i in stageItems) {
			let item = stageItems[i]
			if (item.p.isCollidable) {
				let coord = item.p.model.getGridCoordinates()
				this.collisionMatrix[coord.y][coord.x] = item
			}
		}		
		return this.collisionMatrix
	}
	
	getMatrix() {
		return this.collisionMatrix
	}
}