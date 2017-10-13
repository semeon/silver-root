import {logger} from 'logger'
import {UniverseFactory} from '.././universe/universeFactory.js'
import {GameSession} from './session/session.js'
import {GameMaster} from './master/master.js'
import {actionSet} from './action/actionSet.js'
import {Pathfinder} from './pathfinder/pathfinder.js'


// export class GameEngine {
class GameEngine {

	constructor(props) {
		this.universeFactory = new UniverseFactory()
		this.pathfinder = new Pathfinder()
		this.actions = actionSet
		
		console.log("Game Engine created.")
	}
	
	newSession(props){
		let universeInstance = this.universeFactory.createUniverse()
		let gm = new GameMaster({actions: this.actions})
		let session = new GameSession({universe: universeInstance, gm: gm})
		session.start()
		return session
	}

}

export let engine = new GameEngine()