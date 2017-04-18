
define(['app', 'core/UIComponent', 'core/UIView', 'core/t'],function(app, UIComponent, UIView, __t) {

  'use strict';

  var template = 'CCCD <div id="mjpricegrid"></div>';

  var Input = UIView.extend({

    prefix: 'customs/uis/',

    templateSource: template,

    serialize: function() {
      return {
        value: this.options.value,
        name: this.options.name,
        rows: this.options.settings.get('rows'),
        placeholder_text: this.options.settings.get('placeholder_text'),
        comment: this.options.schema.get('comment'),
        readonly: !this.options.canWrite
      };
    },

    initialize: function() {
      console.log('MJinit');
    },

    afterRender: function() {
      this.$el.find('#mjpricegrid').html('TEST');
    }

  });

  var Component = UIComponent.extend({
    id: 'mj_price_grid',
    dataTypes: ['TEXT'],
    variables: [
      // The number of text rows available for the input before scrolling
      {id: 'rows', type: 'Number', default_value: 20, ui: 'numeric', char_length: 3},
      {id: 'placeholder_text', default_value:'', type: 'String', ui: 'textinput', char_length:200},
    ],
    Input: Input,
    validate: function(value, options) {
      if (options.schema.isRequired() && _.isEmpty(value)) {
        // TODO: fix this line, it is too repetitive
        // over all the UIs
        return __t('this_field_is_required');
      }
    },
    list: function(options) {
      return _.isString(options.value) ? options.value.replace(/<(?:.|\n)*?>/gm, '').substr(0,100) : '<span class="silver">--</span>';
    }
  });

  return Component;
});
