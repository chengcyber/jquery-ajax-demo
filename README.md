# jquery-ajax-demo
Demo: jQuery Ajax with RESTful API

# Dependencies
- Mustashe.js (template)

# Dev
- json-server
- http-server

# Usage
Installation
```
npm install -g json-server http-server
```

backend setup
```
npm run start:backend
```

frontend setup
```
npm start
```

# Snippet
```javascript
$.ajax({
  type: 'POST',
  url: 'api/foo',
  data: { ... } // request body, GET don't have
  success: function (response) { ... } // success callback
  error: function(err) { ... } // error callback err.status, err.statusText
});
```
