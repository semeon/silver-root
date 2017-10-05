import {logger} from 'logger'

export class GameMaster {

	constructor(props) {
		this.actions = props.actions
		this.location = {}
		this.actors = []		
	}
	
	init(props) {
		this.location = props.location
		this.actors = props.location.objectMap
	}
	
	startGame(props){
		this.customFlow1()
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
