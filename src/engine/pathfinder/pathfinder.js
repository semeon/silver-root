import {logger} from 'logger'
import * as PF from 'pathfinding'

export class Pathfinder {
	constructor(props) {
		this.grid
		this.finder = new PF.AStarFinder({
			allowDiagonal: true,
			dontCrossCorners: true
		})
	}

	find(props) {
		let fromX = props.fromX
		let fromY = props.fromY
		let toX = props.toX
		let toY = props.toY
		let grid = PF.Grid(props.matrix)
		let path = this.finder.findPath(fromX, fromY, toX, toY, grid)

		return path
	}
}
