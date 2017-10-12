import {logger} from 'logger'
import {engine} from 'engine'
import {UI} from './uiQuintus/ui.js'

class App {
  constructor(props) {
		this.ge = engine
		this.ui = new UI()
		logger.log("App initialized.")
  }	
	
	start(props) {
		let self = this

		let session = this.ge.newSession()
		// session.universe.printWorld()

		window.addEventListener('load',
			function() {
				logger.log("EVERYBODY KNOWS THAT THE APP IS LOADED")
				self.ui.launch({session: session})
			}
		)
	}
	
}

export let app = new App()