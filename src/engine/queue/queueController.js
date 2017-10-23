import {logger} from 'logger'
import {QueueItem} from './queueItem.js'

// QUEUE IS ON HOLD

export class QueueController {

	constructor(props) {
		this.session = props.session
		this.first = null

		this.isActiveFlag = false
		this.isAbortFlag = false

		this.onSuccess = function(){}
		this.onFail = function(){}
		this.defaultDelay = 500
	}

	setCallback(props) {
		if (props.success) this.onSuccess = props.success
		if (props.fail) this.onFail = props.fail
	}
	
	start(props) {
		// logger.log("QUEUE: start()")
		this.isActiveFlag = true
		
		if(!this.first) {
			this.onAbort({reason: "Queue is empty"})
			
		} else {
			this.first.start()
		}
	}

	abort(props) {
		this.isAbortFlag = true
		this.first = null
		// logger.log("QUEUE: Interruption")
	}

	addItem(props) {
		// console.log("QUEUE: addItem()")
		let item = new QueueItem({transaction: props.transaction, name: props.name, control: this})
		
		if (this.first == null) { 
			this.first = item
			
		} else {
			let last = this.getLastItem()
			last.setSuccessor({successor: item})
		}
	}

	onAbort(props) {
		// logger.log("QUEUE: Aborting Action")
		this.onFail({reason: props.reason})
		this.resetQueue()
		this.session.gm.onActionCompletion()		
	}

	onQueueCompletion(props) {
		// logger.log("QUEUE: End of the Queue")
		this.onSuccess()
		this.resetQueue()
		this.session.gm.onActionCompletion()
	}

	resetQueue(props) {
		// logger.log("QUEUE: Reseting Queue")
		delete this.first
		this.first = null

		this.onSuccess = function(){}
		this.onFail = function(){}
		
		this.isAbortFlag = false
		this.isActiveFlag = false
	}


	isActive() {
		return this.isActiveFlag
	}

	getFirstItem(props) {
		return this.first
	}

	getLastItem(props) {
		let last = null
		let current = this.getFirstItem()
		if (current) {
			let safety = 100
			while (safety>0) {
				safety--
				let next = current.getSuccessor()

				if (next) {
					current = next
				} else {
					last = current
					safety = 0
					break
				}
			}
		}
		return last
	}

	
}
