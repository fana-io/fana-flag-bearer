MVP Ruleset Object:
```js
[
  {
    sdkKey: str,
    flags: [ 
      {
        name: str,
        status: bool, 
        combination: str
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

Possible Ruleset Object:
```js
req.body = {
  sdkKeys: [
    {
      sdkkey: String,
      flag: [key]
    }
  ]

  flags: [
    {
      key: flagname,
      status: bool,
      audiences: [audienceId]
    }
  ]

  audiences: [
    {
      audienceId: id,
      conditions: {
        attribute: ${attributeId},
        operator: String,
        value: String /*depends, but it's JSON*/
      }
    }
  ]
}
```

```js
{ 
  sdkkey: string,
  attributes: {
    state: california,
    beta: true,
    student: false
  }
}
```