import {dice} from 'dice'
import {logger} from 'logger'

export let Special = {

	getSpecial: function(props){
		let result = {}
		if (props.attribute) {
			result = this.special[props.attribute]
		} else {
			result = this.special
		}
		return result
	}
}