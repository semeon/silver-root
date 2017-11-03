import {logger} from 'logger'
import {generator} from 'generator'

// alignment scale
// 	-1: Enemy 
// 	 0: Neutral
// 	 1: Friendly
// const alignmentScale = ["E", "N", "F"]

const alignmentScale = {
	"F": {code: "F", value: 1},
	"N": {code: "N", value: 0},
	"E": {code: "E", value: -1}
}


export class ActorGroup {

	constructor(props) {
		this.id = props.id
		this.members = {}
		this.relations = {}
	}

	getId(props) {
		return this.id
	}

	getMembers(props) {
		return this.members
	}

	addMember(props) {
		if (this.members[props.member.getId()]) this.members[props.member.getId()] = props.member
	}

	resetRelations(props) {
		this.relations = {}
	}

	addEnemy(props) {
		// props: { group }
		this.addRelation({ group: props.group, alignmentCode: "E"})
	}

	addFriend(props) {
		// props: { group }
		this.addRelation({ group: props.group, alignmentCode: "F"})
	}


	addRelation(props) {
		// props: { group, alignmentCode }
		
		console.dir(props.group)
		
		let group = props.group
		let groupId = props.group.getId()
		
		if (this.id != groupId) {
			let relation = {
				groupId: groupId,
				group: group,
				alignment: alignmentScale[props.alignmentCode]
			}
			this.relations[groupId] = relation
		}
	}

	getGroupAlignment (props) {
		// props: { groupId }
		let result = this.relations[props.groupId].alignment
		if (!result) result = "N"
		return result
	}

	getListByAlignmentCode(props) {
		let result = []
		
		for (let r in this.relations) {
			let rel = this.relations[r]
			
			if (rel.alignment.code == props.alignmentCode) {
				let groupMembers = rel.group.getMembers()
				for (let m in groupMembers) result.push(groupMembers[m])
			}
		}
		return result
	}

	
}