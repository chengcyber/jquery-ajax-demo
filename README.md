# jquery-ajax-demo
Demo: jQuery Ajax with RESTful API

```javascript
$.ajax({
  type: 'POST',
  url: 'api/foo',
  data: { ... } // request body, GET don't have
  success: function (response) { ... } // success callback
  error: function(err) { ... } // error callback err.status, err.statusText
});
```
