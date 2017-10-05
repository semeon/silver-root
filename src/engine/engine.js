import {logger} from 'logger'
import {GameSession} from './session/session.js'
import {GameMaster} from './master/master.js'
import {ActionSet} from './action/actionSet.js'

// export class GameEngine {
class GameEngine {

	constructor(props) {
		this.session = null
		this.actions = new ActionSet()
		this.master = new GameMaster({actions: this.actions})
		console.log("Game Engine created.")
	}
	
	newSession(props){
		this.session = new GameSession({universe: props.universe, gm: this.master})
		this.session.start()
		return this.session
	}

	currentSession(props){
		return this.session
	}

}

export let engine = new GameEngine()