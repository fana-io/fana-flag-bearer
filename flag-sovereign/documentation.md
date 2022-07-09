# Example payload from flag manager to flag provider:
- expects to receive entire set of flags and audiences for all SDK keys
- each SDK ruleset requires `sdkKey` and `flags`
- `flags` is empty array if no flags created yet
- `status` represents if flag is on (`true`) or off (`false`)

```json
[
  {
    sdkKey: str,
    flags: [ 
      {
        name: str,
        status: bool, 
        audiences: []
      }
    ]
  }
]
```
# Example payload from flag manager to flag provider when one flag is updated
- `sdkKey` and `flag` object with `name` is required
- `status` and `audiences` are optional (if updated) 
```json
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
```json
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
```json
{
  type: CLIENT_SDK_KEY, 
  message: {
    name: "new-button",
    status: false
  }
}
```