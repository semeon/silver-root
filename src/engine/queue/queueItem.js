import {logger} from 'logger'

export class QueueItem {

	constructor(props) {
		this.transaction = props.transaction
		this.name = props.name
		this.queueController = props.control
		this.delay = this.queueController.defaultDelay
		if (props.delay) this.delay = props.delay
		this.successor = null
	}
	
	start(props) {
		let self = this

		setTimeout( 
			function() {	
				if (self.queueController.isStopFlag) { 
					self.onStop()
					return
				}
				self.transaction( {callback: self.onFinish.bind(self) } )
			}, self.delay)
	}

	onFinish(props) {
		this.queueController.onItemCompletion({item: this})
		if (this.successor) this.successor.start()
	}

	onStop(props) {
		this.queueController.onStop()
	}

	getSuccessor(props) {
		return this.successor
	}
	
	setSuccessor(props) {
		this.successor = props.successor
	}
	
}
