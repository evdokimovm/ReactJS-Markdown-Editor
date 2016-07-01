var MarkdownEditor = React.createClass({
	getInitialState: function() {
		return {
			content: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a\u0020\u0020\nline break\n\nText attributes * italic *, ** bold **,\n `monospace`, ~~strikethrough~~.\n\nShopping list : \n\n * apples\n * oranges\n * pears\n\nNumbered list : \n\n 1. apples\n 2. oranges\n 3. pears\n\nThe rain __not the reign__ in\nSpain.\n```javascript\nMath.randomBetween = function (a, b) {\n	return Math.floor(Math.random() * (b - a + 1) + a); \n}\n```\n'
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
