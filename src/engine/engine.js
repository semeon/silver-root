import {logger} from 'logger'
import {UniverseFactory} from '.././universe/universeFactory.js'
import {GameSession} from './session/session.js'
import {GameMaster} from './master/master.js'
import {ActionSet} from './action/actionSet.js'
import {Pathfinder} from './pathfinder/pathfinder.js'


// export class GameEngine {
class GameEngine {

	constructor(props) {
		this.universeFactory = new UniverseFactory()
		this.pathfinder = new Pathfinder()
		this.actions = new ActionSet()
		this.master = new GameMaster({actions: this.actions})

		this.session = null
		
		console.log("Game Engine created.")
	}
	
	newSession(props){
		let universeInstance = this.universeFactory.createUniverse()
		this.session = new GameSession({universe: universeInstance, gm: this.master})
		this.session.start()
		return this.session
	}

	currentSession(props){
		return this.session
	}

}

export let engine = new GameEngine()