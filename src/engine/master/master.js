import {logger} from 'logger'
import {ActionFactory} from '../action/actionFactory.js'


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
			logger.log("Game Master is busy at the moment; please call later.")
			return
		}

		let actionProps = {
			actionKey: props.action,
			actor: props.actor, 
			target: props.target, 
			data: props.data, 
			session: this.session
		}

		let action = ActionFactory.createInstance(actionProps)

		if (!action) {
			let error = "Game Master does not approve this action: " + props.action
			props.fail({reason: error})
			return
		} 
		let preconditionTest = action.preconditionTest()
		if (!preconditionTest.success) {
			props.fail({reason: preconditionTest.error})
			return
		} 
    
		// queue props
    this.isBusyFlag = true
		action.perform()
		this.session.queueController.setCallback({success: props.success, fail: props.fail})
		this.session.queueController.start()
		
	}

	abortAction() {
		console.log("GM: Aborting current queue")
		this.session.queueController.abort()
	}
	
	onActionCompletion(props) {
		// console.log("GM: Action finished")
		this.isBusyFlag = false
	}


	// GM Routines

	buildPath(props) {
		let path = null
		path = this.pathfinder.find(props)
		return path
	}

	calculateDistance(props) {
		let distance = null
		let from = props.from
		let to = props.to
		
		let dx = from.x - to.x
		let dy = from.y - to.y
		distance = Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) )
		
		return distance
	}

	customFlow1(props) {
		for (let i=0; i<2; i++) {
			// this.actions.attack({actor: this.actors[0].object, target: this.actors[1].object})
			// this.actions.attack({actor: this.actors[1].object, target: this.actors[0].object})
		}
	}
}
