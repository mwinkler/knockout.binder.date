knockout.binder.date
====================

A two way knockout date binder

bind and format a date string to a html element

requires
  date.js -> http://www.datejs.com/

binding options
```
  date                           date value as string in viewmodel
  dateFormatModel     [optional] date format in viewmodel (default: iso 8601 format -> yyyy-MM-ddTHH:mm:ss)
  dateFormatView      [optional] date format to display (default: dd.MM.yyyy)
  dateBindTo          [optional] bind to html element property (default: value)
```

 useage
```
  <input data-bind="date: Field" />
  <span data-bind="date: Field, dateBindTo: 'text', dateFormatView: 'dd.MM.yyyy HH:mm'"></span>
```
by M. Winkler
