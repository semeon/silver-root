import {logger} from 'logger'
// import {ActionFactory} from '../action/actionsFactory.js'


export class GameMaster {

	constructor(props) {
		this.actions = props.actions
		this.pathfinder = props.pathfinder
		this.actors = []
		this.session = null
		
		this.isBusyFlag = false
	}
	
	init(props) {
		this.session = props.session
	}
	
	isBusy(props) {
		return this.isBusyFlag
	}
	
	startGame(props){
		this.customFlow1()
	}

	do(props) {
		if (this.isBusyFlag) {
			logger.log("Game Master is busy at the moment")
			return
		}

		let actionId = props.action
		let action = this.actions[actionId]

		if (!action) {
			logger.log("Game Master does not approve this action: " + actionId)
		} else {
			this.isBusyFlag = true
			logger.log("Game Master is performing action: " + actionId)

			action({ 
				actor: props.actor, 
				target: props.target, 
				data: props.data, 
				session: this.session, 
				callback: this.onActionCompletion.bind(this) 
			})
		}
		this.session.queueController.start()
	}

	abortAction() {
		this.session.queueController.stop()
		this.isBusyFlag = false
		console.log("GM: Aborting current queue")
	}
	
	onActionCompletion(props) {
		this.isBusyFlag = false
		console.log("GM: Queue has stopped")
	}

	buildPath(props) {
		let path = null
		props.matrix = this.session.currentLocation.collisionMatrix
		path = this.pathfinder.find(props)
		return path
	}


	customFlow1(props) {
		for (let i=0; i<2; i++) {
			// this.actions.attack({actor: this.actors[0].object, target: this.actors[1].object})
			// this.actions.attack({actor: this.actors[1].object, target: this.actors[0].object})
		}
	}
}
