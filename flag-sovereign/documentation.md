# Example payload from flag manager to flag provider:
- expects to receive entire set of flags and audiences for all SDK keys
- each SDK ruleset requires `sdkKey` and `flags`
- `flags` is empty array if no flags created yet
- `status` represents if flag is on (`true`) or off (`false`)
- `combination` represents "any" or "all" audience combination
```js
[
  {
    sdkKey: str,
    flags: [ 
      {
        name: str,
        status: bool, 
        combination: str,
        audiences: [audienceId]
      }
    ],
    audiences: [
      {
        audienceId: id,
        conditions: {
          attribute: ${attributeId},
          operator: String,
          value: String
        }
      }
    ]
  }
]
```
# Example payload from flag manager to flag provider when one flag is updated
- `sdkKey` and `flag` object with `name` is required
- `status` and `audiences` are optional (if updated) 
```js
{
  flag: {
    sdkKey: str,
    name: str,
    status: bool,
    audiences: []
  }
}
```

# Example response object from flag sovereign to client SDK upon initialization with user context
- `flagEvaluations` is required and is an array of flag objects
- only toggled on flags (`status` is `true`) are included to limit data sent over network
- `value` represents whether user should be served feature (defaults to false if flag isn't active)
```js
{
  flagEvaluations: [
      {
        name: "new-button",
      status: true, 
      value: bool 
    },
    {
      name: "new-navbar",
      status: true, 
      value: bool
    }
  ]
} 
```
# Example payload from flag provider to client-sdk when a flag is toggled off
- Note that SDKs must be subscribed and listening for events with a `type` that equals it's own SDK, and can ignore all other messages
- SSE events are sent only when flags are toggled OFF
- `message` property contains a flag object with an updated `status` value (aka `false`)
```js
{
  type: CLIENT_SDK_KEY, 
  message: {
    name: "new-button",
    status: false
  }
}
```
# Parsing the complete flag data from Flag Manager
- When receiving a client SDK initialization request, Flag Provider will parse through full flag dataset to identify flags pertaining to specific instance (`sdkKey`).
- Flag Provider will:
  - filter flag data based on `sdkKey`
  - loop through all audiences and evaluate each set of conditions if they match `userId`
  - loop through all flags and for each `audienceId`, return flag evaluation based on combination of audience logic
  - memoize in `cache` the flag evaluation for future client SDK requests for same userId

## Data modeling: Flag provider cache data structure
- memoized flag evaluation values organized by SDK key, then userId, then unique flag name
```js
// Shape of cache object
const cache = {
  sdkKey1: {
    userId1: {
      flageName1: VALUE_OF_FLAG (bool),
      flageName2: VALUE_OF_FLAG (bool),
    } ,
    userId2 : { ... }
  },
  sdkKey2 : { ... }
}

// Example cache lookup for a user -- allows O(1) lookup
const userFlagValues = cache[sdkKey][userId]

{
  flagName1: true,
  flageName2: false,
  ...
}
```