import {logger} from 'logger'
import {Attack} from './actions/attack.js'
import {Walk} from './actions/walk.js'

export let ActionFactory = {
	

	createInstance(props) {
		
		let actionInstance = null
		let actionKey = props.actionKey

		switch(actionKey) {
	    case "attack":
	      actionInstance = new Attack (props)
        break

	    case "walk":
	      actionInstance = new Walk (props)
				break
		}
		
		return actionInstance
	}
	
}

