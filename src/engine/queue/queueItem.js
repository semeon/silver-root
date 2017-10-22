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

		if (self.queueController.isAbortFlag) { 
			self.onAbort({reason: "Action aborted"})
			return
		}

		setTimeout( 
			function() {	
				if (self.queueController.isAbortFlag) { 
					self.onAbort({reason: "Action aborted"})
					return
				}
				self.transaction()
				self.onTransactionFinish()
			}, self.delay)
	}

	onTransactionFinish(props) {
		// this.queueController.onItemCompletion({item: this})
		logger.log("QUEUE ITEM: Completed " + this.name)		

		if (this.successor) {
			this.successor.start()
		} else {
			this.queueController.onQueueCompletion()
		}
	}

	onAbort(props) {
		this.queueController.onAbort(props)
	}

	getSuccessor(props) {
		return this.successor
	}
	
	setSuccessor(props) {
		this.successor = props.successor
	}
	
}
