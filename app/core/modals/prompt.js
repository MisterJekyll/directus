define(['core/Modal', 'underscore'], function(Modal, _) {

  'use strict';

  return Modal.extend({

    template: 'modal/prompt',

    attributes: {
      'id': 'modal',
      'class': 'modal confirm'
    },

    serialize: function() {
      var message = (this.options.text) ? this.options.text : '';
      var data = {message: message};

      switch(this.options.type) {
        case 'prompt':
          data.isPrompt = true;
          data.showInput = true;
          break;
        case 'yesnocancel':
          data.isYesNoCancelConfirm = true;
          break;
        case 'yesno':
          data.isYesNoConfirm = true;
          break;
        case 'alert':
          data.isAlert = true;
          break;
        default:
          data.isPrompt = true;
          break;
      }

      return data;
    },

    events: {
      // 'click .modal-bg': function(event) {
      //   event.stopPropagation();
      // },
      //
      // 'click .smoke': 'close',
      //
      // 'click .js-close-modal': 'close',

      'click #cancel': function() {
        this.closePrompt();
      },

      'click #save': function() {
        this.save();
      },

      'click #noBtn': function() {
        this.closePrompt();
        this.options.callback('no');
      },

      'click #yesBtn': function() {
        this.closePrompt();
        this.options.callback('yes');
      },

      'click #okBtn': function() {
        this.closePrompt();
      }
    },

    // onKeydown: function(e) {
    //   var key = e.keyCode || e.which;
    //
    //   // enter
    //   if (key === 13) {
    //     this.save();
    //   }
    //
    //   // esc
    //   if (key === 27) {
    //     this.close();
    //   }
    // },

    // close: function() {
    //   $(document).off('keydown.modal');
    //   this.remove();
    // },

    closePrompt: function() {
      if (this.container) {
        this.container.close();
      } else {
        Modal.prototype.close.apply(this, arguments);
      }
    },

    save: function() {
      var val = '';

      if (this.$el.find('input')) {
        val = this.$el.find('input').val();
      }

      if (_.isFunction(this.options.callback)) {
        this.options.callback(val);
      }

      this.closePrompt();
    },

    afterRender: function(view) {
      this.$el.find('input[type="text"]').focus();
    },

    initialize: function (options) {
      this.options = options;
    }
  });
});