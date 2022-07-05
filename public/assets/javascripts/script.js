
tinymce.init({
    selector: "#msg",
    plugins: "emoticons autoresize",
    toolbar: "bold italic strikethrough link numlist bullist blockquote emoticons undo redo styleselect",
    toolbar_location: "bottom",
    placeholder: "type and press send to send message ...",
    menubar: false,
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    statusbar: true,
    height: 50,
    width: 800,
    branding: false,
    icons: 'material',
    resize: 'both'
});



