import {logger} from 'logger'
import {Q} from 'qObject'

Q.PlayerSprite = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: props.name,
			sheet: "Player"
		}
		super(p)
	}

  onTouch(col) {
		super.onTouch(col)
		this.stage.context.eventController.onPlayerTouch({ player: this })
  }

	linkHighlight(props) {
		this.p.hl = props.hl
		this.hideHl()
		this.p.hl.moveTo({ x: this.p.x, y: this.p.y })
	}

	moveTo(props) {
		super.moveTo(props)
		this.p.hl.moveTo({ x: this.p.x, y: this.p.y })
	}

	showHl(props) {
		this.p.hl.show()
	}

	hideHl(props) {
		this.p.hl.hide()
	}

	select(props) {
		this.stage.context.selectedPlayer = this
		this.showHl()
	}
	
}