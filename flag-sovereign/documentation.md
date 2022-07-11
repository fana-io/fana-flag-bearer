# Example payload from flag manager to flag bearer:
- expects to receive entire set of flags and audiences for all SDK keys
- each SDK ruleset requires `sdkKey` and `flags`
- `flags` is empty array if no flags created yet
- `status` represents if flag is on (`true`) or off (`false`)
- evaluation of flags will default to whether ANY audience logic is met for a user
```js
[
  {
    sdkKey: str,
    flags: [ 
      {
        flagKey: String,
        status: bool, 
        audiences: [audienceKey]
      }
    ],
    audiences: [
      {
        audienceKey: String,
        combination: String, // "ANY" or "ALL"
        conditions: [
          {
          attribute: String, // name of attribute
          type: String, // type of attribute, defined in data model
          operator: String,
          value: String
          },
        ],
      }
    ]
  }
]
```
# Example payload from flag manager to flag bearer when one flag is updated
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

# Example payload from flag bearer to client-sdk when a flag is toggled off
- Note that SDKs must be subscribed and listening for events with a `type` that equals it's own SDK, and can ignore all other messages
- SSE events are sent only when flags are toggled OFF
- `message` property contains a flag object with an updated `status` value (aka `false`)
```js
{
  type: CLIENT_SDK_KEY, 
  message: {
    name: "new-button",
    status: false,
    value: false,
  }
}
```
# Parsing the complete flag data from Flag Manager
- When receiving a client SDK initialization request, Flag bearer will parse through full flag dataset to identify flags pertaining to specific instance (`sdkKey`).
- Flag bearer will:
  - filter flag data based on `sdkKey`
  - loop through all audiences and evaluate each set of conditions if they match `userId`
  - loop through all flags and for each `audienceId`, return flag evaluation based on whether ANY of the audiences evaluate to `true`
  - memoize the flag evaluation object for future client SDK requests for same `userId` in `cache` object

## Data modeling: Flag bearer cache data structure
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
# POST `/connect/clientInit`
Client SDK initialization request route. Returns an object of flag names and the flag evaluation for a specific user context.

## Expected Payload
- expects `sdkKey` and a `userContext` object
  - `userContext` must provide a `userId` 

```js
{
  sdkKey: String,
  userContext: {
    userId: String,
    // ... optional attributes
  },
}
```
## Example Successful Response
- returns object of key/value pairs, where `flagKey` is the key, and evaluation `value` is a boolean. 
  - 
```js
{
  flagName1: Boolean,
  flagName2: Boolean,
  // ... more flags
} 
```
### Error Response
- `400` status code will be returned if SDK key or userId is not provided or invalid. 