class Logger {

  constructor(props) {
    this.feed = []
		this.toConsole = true
		console.log("A Logger instance created.")
  }

  log(props) {
    this.feed.push(props)
		if (this.toConsole) {
			console.log("LOG: " + props)
		}
  }

}


export let logger = new Logger()