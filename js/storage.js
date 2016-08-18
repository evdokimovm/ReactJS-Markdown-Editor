$(document).ready(function() {
	if (window.localStorage) {
		$('textarea').on('input', function(e) {
			var markdown = $('textarea').val()
			localStorage.setItem('markdownStorage', markdown)
		})
	}
})
