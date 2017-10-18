import {logger} from 'logger'
import {QueueItem} from './queueItem.js'

export class QueueController {

	constructor(props) {
		this.first = null
		this.active = false
	}

	start(props) {
		console.log("QUEUE: start()")
		this.active = true
		this.first.start()
	}

	addItem(props) {
		console.log("QUEUE: addItem()")
		let item = new QueueItem({action: props.action, data: props.data, control: this})
		if (this.first == null) { 
			this.first = item
		} else {
			let last = this.getLastItem()
			last.setSuccessor(item)
		}
		if(!this.isActive()) this.start()
	}

	onItemCompletion(props) {
		console.log("QUEUE: onItemCompletion()")
		this.first = props.item.getSuccessor()
	}

	onQueueCompletion(props) {
		this.active = false
		console.log("QUEUE: onQueueCompletion()")
	}

	isActive() {
		return this.active
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
