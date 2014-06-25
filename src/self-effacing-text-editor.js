var selfEffacingTextEditor = function () {
    this.initialize.apply(this,arguments);
};

selfEffacingTextEditor.prototype = {
    initialize : function ( opt ) {
        this.opt = { 
            prefixClassName : opt.prefixClassName || 'se-',
            textArea   : opt.textArea   || '#textArea',
            buttonArea : opt.buttonArea || '#buttonArea'
        }
    }
    ,registerAction: function(funcName,action) {
        $('.' + this.opt.prefixClassName + funcName).click(function(e){
            action();
        });
    }
    ,wrapSelectedText: function(startTag,endTag,opt) {
        var textArea = document.getElementById('textArea');
        var inputText = textArea.value;

        var beforeSelectedText = inputText.substring(0,textArea.selectionStart);
        var selectedText = inputText.substring(textArea.selectionStart, textArea.selectionEnd);
        var afterSelectedText = inputText.substring(textArea.selectionEnd);

        textArea.value = [
            beforeSelectedText,
            startTag,
            selectedText,
            endTag,
            afterSelectedText,
        ].join('');

        var forcus_pos = (selectedText.length == 0) ? textArea.selectionStart + startTag.length
                                                    : startTag.length + textArea.selectionEnd + endTag.length;
        textArea.setSelectionRange(forcus_pos,forcus_pos);

    }
};
