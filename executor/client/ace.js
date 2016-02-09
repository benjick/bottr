/* globals ace */
const editor = ace.edit('editor');
editor.setTheme('ace/theme/twilight');
editor.getSession().setMode('ace/mode/javascript');
editor.getSession().setTabSize(2);
editor.setFontSize(20);

export default editor;
