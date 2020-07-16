// Import TinyMCE
@@include('../../../node_modules/tinymce/tinymce.min.js');
@@include('../../../node_modules/tinymce/jquery.tinymce.min.js');

// A theme is also required
@@include('../../../node_modules/tinymce/themes/silver/theme.min.js');

// Any plugins you want to use has to be imported
@@include('../../../node_modules/tinymce/plugins/paste/plugin.min.js');
@@include('../../../node_modules/tinymce/plugins/link/plugin.min.js');

// Initialize the app
function activateEditor(selector) {
	tinymce.EditorManager.editors = [];
	tinymce.init({
		menubar: false,
		selector: selector,
		plugins: ['paste', 'link']
	});
}