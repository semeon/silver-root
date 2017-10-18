import {logger} from 'logger'

export class QueueItem {

	constructor(props) {
		this.action = props.action
		this.data = props.data
		this.queueController = props.control
		this.successor = null
	}
	
	start(props) {
		console.log("COR: START ITEM")
		this.action(this.data)
		this.onFinish()
	}

	onFinish(props) {
		console.log("COR: END ITEM")
		this.queueController.onItemCompletion({item: this})

		if (this.successor) {
			this.successor.start()
		} else {
			this.queueController.onQueueCompletion()
		}
	}

	getSuccessor(props) {
		return this.successor
	}
	
	setSuccessor(props) {
		this.successor = props.successor
	}
	
}
