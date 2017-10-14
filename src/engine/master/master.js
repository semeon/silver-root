import {logger} from 'logger'

export class GameMaster {

	constructor(props) {
		this.actions = props.actions
		this.pathfinder = props.pathfinder
		this.actors = []
		this.session = null
	}
	
	init(props) {
		this.session = props.session
	}
	
	startGame(props){
		this.customFlow1()
	}

	do(props) {
		let actionId = props.action
		let action = this.actions[actionId]
		
		console.log(props)
		
		if (!action) {
			logger.log("Game Master does not approve this action: " + actionId)
		} else {
			logger.log("Game Master is performing action: " + actionId)
			console.dir(action)
		}
	}

	buildPath(props) {
		let path = null
		props.matrix = this.session.currentLocation.collisionMatrix
		path = this.pathfinder.find(props)
		return path
	}

	performAttack(props) {
		this.actions.attack({actor: props.actor, target: props.target})
	}

	customFlow1(props) {
		
		for (let i=0; i<2; i++) {
			// this.actions.attack({actor: this.actors[0].object, target: this.actors[1].object})
			// this.actions.attack({actor: this.actors[1].object, target: this.actors[0].object})
		}

	}
}
