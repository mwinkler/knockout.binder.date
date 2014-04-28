// bind and format a date string to a html element

// requires
//  date.js -> http://www.datejs.com/

// arguments
//  date                           date value as string in viewmodel
//  dateFormatModel     [optional] date format in viewmodel (default: iso 8601 format -> yyyy-MM-ddTHH:mm:ss)
//  dateFormatView      [optional] date format to display (default: dd.MM.yyyy)
//  dateBindTo          [optional] bind to html element property (default: value)

// useage
//  <input data-bind="date: Field" />
//  <span data-bind="date: Field, dateBindTo: 'text', dateFormatView: 'dd.MM.yyyy HH:mm'"></span>

// by M. Winkler

ko.bindingHandlers.date = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var allBindings = allBindingsAccessor();
        var overrideRead = null;
        var dateFormatView = (allBindings.dateFormatView || 'dd.MM.yyyy');
        var dateFormatSource = (allBindings.dateFormatModel || 'yyyy-MM-ddTHH:mm:ss');
        var htmlProperty = (allBindings.dateBindTo || 'value');

        var dateConverter = ko.computed({
            read: function () {
                var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());    // important to access valueAccessor that knockout keep tracking this computed observable

                if (overrideRead)
                    return overrideRead;

                // convert date string from model to a 'date object' and convert back to desired view date format
                if (valueUnwrapped) {
                    var d = Date.parseExact(valueUnwrapped.substr(0, dateFormatSource.length), dateFormatSource);
                    return (d ? d.toString(dateFormatView) : '');
                } else {
                    return '';
                }
            },
            write: function (value) {
                overrideRead = value;   // set overrideRead value to prevent the backwrite of the convertet value into the bounded element

                // convert view date string to 'date object' and convert back to desired model date format
                var d = Date.parseExact(value, dateFormatView);
                valueAccessor()(d ? d.toString(dateFormatSource) : null);

                overrideRead = null;
            }
        });

        var binder = {};
        binder[htmlProperty] = dateConverter;

        ko.applyBindingsToNode(element, binder);
    }
}; 
