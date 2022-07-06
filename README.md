if you ever worked with "async" module

this function is like async.each but it doesnt wait to complete all requests

if you set 100 for limit it will send all 100

and when any of those got the respond this function will fire next request without waiting for all 100 to be get their response
