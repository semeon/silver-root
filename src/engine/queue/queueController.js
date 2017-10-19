import {logger} from 'logger'
import {QueueItem} from './queueItem.js'

// QUEUE IS ON HOLD

export class QueueController {

	constructor(props) {
		this.session = props.session
		this.first = null
		this.isActiveFlag = false
		this.isStopFlag = false
		this.defaultDelay = 500
	}

	start(props) {
		logger.log("QUEUE: start()")
		this.isActiveFlag = true
		this.first.start()
	}

	stop(props) {
		this.isStopFlag = true
		this.first = null
		logger.log("QUEUE: Interruption")
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

	onStop(props) {
		this.isStopFlag = false
		delete this.first
		this.first = null
		logger.log("QUEUE: Reset")
		this.session.gm.onActionCompletion()
	}

	onItemCompletion(props) {
		logger.log("QUEUE: Item Completed: " + props.item.name)
		this.first = props.item.getSuccessor()
		if (!this.first) this.onQueueCompletion()
	}

	onQueueCompletion(props) {
		this.isActiveFlag = false
		logger.log("QUEUE: End of the Queue")
		this.session.gm.onActionCompletion()
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
