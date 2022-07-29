happy path:

Redis server is running
manager connects to redis server

FB boots up

- cache inits
- makes GET request to manager for full flagset
- sets cache.keys & cache.flags to response.data
  - log error: if AJAX fails, then cache.keys & cache.flags are undefined &&
- ISSUE: event emits 'cache-filled' event e
  ven if bearer couldn't connect to to manager and fill cache

when does this happen to reproduce error:

- flag bearer container spins up first & manager is unavailable 
  - results in cache.sdkKeys undefined or empty object
try: sdk connect to FB (/stream)
  - validateParams fails -- CM.sdkKeys was never populated by cache instance.  


why would a clientInit with sdkKey succeed but a stream with sdkKey fails
- clientInit checks against cache.sdkKey 


Cache
- connect to redis
- 