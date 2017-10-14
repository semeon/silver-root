import {logger} from 'logger'
import * as PF from 'pathfinding'

export class Pathfinder {
	constructor(props) {
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
		let matrix = props.matrix

		let grid = new PF.Grid(matrix)
		let path = this.finder.findPath(fromX, fromY, toX, toY, grid)

		return path
	}
}
