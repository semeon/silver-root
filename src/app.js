import {logger} from 'logger'
import {engine} from './engine/engine.js'
import {GameUniverse} from './universe/universe.js'
// import {UI} from './uiStage/ui.js'
import {UI} from './uiQuintus/ui.js'

class App {
  constructor(props) {
		this.ge = engine
		this.universe = new GameUniverse()
		this.universe.init()
		logger.log("App initialized.")
		
		this.ui = new UI()
		// this.ui.init()
  }	
	
	start(props) {
		this.universe.printWorld()

		let self = this
		let session = this.ge.newSession({universe: this.universe})

		window.addEventListener('load',
			function() {
				logger.log("LOAD")
				self.ui.launch({session: session})
			}
		)
	}

	getUniverse(props) {
		return this.universe
	}

	getGM(props) {
		return this.ge.master
	}

	getCurrentLocation(props) {
		return this.universe.getCurrentLocation()
	}

	getPlayers(props) {
		return this.universe.getPlayers()
	}	
	
}

export let app = new App()