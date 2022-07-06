if you ever worked with "async" module

this function is like "async.eachLimit" but it doesnt wait to complete all requests

if you have bunch of request to send and set 100 for limit it will send all 100 requests

and when any of those got the respond this function will fire next request without waiting for all 100 to be get their response
