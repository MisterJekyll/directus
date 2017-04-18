
define(['app', 'core/UIComponent', 'core/UIView', 'core/t'],function(app, UIComponent, UIView, __t) {

  'use strict';

  var template = '<div id="mjpricegrid"></div>';

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
      console.log('MJ mjpricegrid init');
    },

    afterRender: function() {
      //this.$el.find('#mjpricegrid').html('TEST');
      var csv_data = ',Ford,Volvo,Toyota,Honda' +'\n'+
                     'test,test2,,,';
      var csv = $.csv.toArrays(csv_data);

      var container = document.getElementById('mjpricegrid');
      var hot = new Handsontable(container, {
        data: csv,
        width: 584,
        height: 320,
        startRows: 8,
        startCols: 5,
        minSpareRows: 1,
        fixedRowsTop: 1,
        fixedColumnsLeft: 1,
        contextMenu: true,
        rowHeaders: false,
        colHeaders: false,
        currentRowClassName: 'currentRow',
        currentColClassName: 'currentCol',
        cells: function (row, col, prop) {
          var cellProperties = {};

          //if (row === 0 || this.instance.getData()[row][col] === 'readOnly') {
          //  cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
          //}
          if (row === 0 || col === 0) {
            cellProperties.renderer = function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
              Handsontable.renderers.TextRenderer.apply(this, arguments);
              td.style.fontWeight = 'bold';
              td.style.background = '#ddd';
              //td.style.color = 'green';
            }; // uses function directly
          }
          //else {
          //  cellProperties.renderer = "negativeValueRenderer"; // uses lookup map
          //}

          return cellProperties;
        }
      });

      var temp_data = hot.getData();
      var temp_csv = $.csv.fromArrays(temp_data);
      console.log(temp_csv);
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
