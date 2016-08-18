var MarkdownEditor = React.createClass({
	getInitialState: function() {
		return {
			content: localStorage.getItem('markdownStorage') || '### Type Markdown Here'
		}
	},
	handleChange: function(event) {
		this.setState({
			content: event.target.value
		})
	},
	rawMarkup: function() {
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
			highlight: function (code) {
				return hljs.highlightAuto(code).value
			}
		})

		var rawMarkup = marked(this.state.content, {sanitize: true})
		return {
			__html: rawMarkup
		}
	},
	componentWillMount: function() {
		const script = document.createElement('script')

		script.src = './js/storage.js'
		script.async = true

		document.body.appendChild(script)
	},
	render: function() {
		return (
			<div className="container-fluid">
				<div className="row">
					<h1 className="text-center">
						ReactJS Markdown Editor
					</h1>
					<div className="col-xs-12 col-sm-6">
						<h3>Markdown</h3>
						<textarea className="markdown" defaultValue={this.state.content} onChange={this.handleChange}></textarea>
					</div>
					<div className="col-xs-12 col-sm-6">
						<h3>Preview</h3>
						<div dangerouslySetInnerHTML={this.rawMarkup()}></div>
					</div>
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<MarkdownEditor />, 
	document.getElementById('app')
)
