## Preliminary Day 1 Database Model
# Disclaimer:
This is incomplete in every way; just thought it would be helpful to maintain transparency regarding the current data model and how the DB is taking shape.

I need to document it; it's not commented at all, so don't stress if the code makes no sense. A priority is combing through it and adding clarity

The API is incomplete and only has routes to create *Flags*, *Audiences*, and *Attributes*
It's cumbersome as is. I wouldn't recommend it. But you can successfully curl//postman requests if you launch the App.

_However_ errors for violating the respective Schemas when you try to create an object are not specific.
Eg., if you POST a request to make a flag with a key that already exists, or a field with the value of the inappropriate type, you'll recieve only: `'Creating flag failed, please try again'`

---

## Requests to the API:

**URL is probably `localhost:8080/api`**

Currently connected to the group Mongo account under collection `mvp_test_db`
Since this is a public repo, I'll post the URI in discord

# POST /attributes | Create Attribute:

Expected Payload:
```json
'{
    "name": "student",
    "attrType": "BOOL"
}'
```

Response:
```json
{
    "name": "student",
    "attrType": "BOOL",
    "createdAt": "2022-07-09T18:20:52.338Z",
    "updatedAt": "2022-07-09T18:20:52.338Z"
}
```

# POST /audiences | Create Audience

Expected Payload:
```json
{
    "name": "california_students",
    "combine": "ALL",
    "conditions": [
        {
        "attribute": "62c9c35e12c5e0ceaac10eec", // possible name instead, WIP see below
        "operator": "EQ",
        "value": "california"
        },
        {
        "attribute": "62c9c70412c5e0ceaac10ef4",
        "operator": "EQ",
        "value": "true"
        }        
    ]
}
```

Response:
```json
{
    "name": "california_students",
    "combine": "ALL",
    "conditions": [
        {
            "attribute": "62c9c35e12c5e0ceaac10eec",
            "operator": "EQ",
            "value": "california",
            "_id": "62c9cda554b51c71f940103f"  // probably prune this WIP
        },
        {
            "attribute": "62c9c70412c5e0ceaac10ef4",
            "operator": "EQ",
            "value": "true",
            "_id": "62c9cda554b51c71f9401040"
        }
    ],
    "createdAt": "2022-07-09T18:49:09.296Z",
    "updatedAt": "2022-07-09T18:49:09.296Z"
}
```

# POST /flags | Create Flag

Expected Payload:
```json
{
    "key": "fake_flag_1",
    "sdkKey": "beta_sdk_0",
    "combine": "ALL",
    "audiences": ["62c9cc2f54b51c71f940103b", "62c9cda554b51c71f940103e"]
}
```

Response:
```json
{
    "key": "fake_flag_1",
    "sdkKey": "beta_sdk_0",
    "audiences": [
        "62c9cc2f54b51c71f940103b",  // maybe unique name later
        "62c9cda554b51c71f940103e"
    ],
    "combine": "ALL",
    "status": false,    // this is not a string
    "createdAt": "2022-07-09T19:13:36.696Z",
    "updatedAt": "2022-07-09T19:13:36.696Z"
}
```

---

# WIP:
- Better error on creating duplicate unique keys (generic error ATM)
- Operators for Conditions: what are we using? (`EQ` alone sufficient for MVP)
- Strongly considering `ObjectId` model cross-references to be the referenced model's unique name/key field instead (would require some middleware, and not sure it ultimately saves anything with ultimate implementation. TBD)



MVP Ruleset Object:
```js
[
  {
    sdkKey: str,
    flags: [ 
      {
        key: str,
        status: bool, 
        combination: str
        audiences: [audienceId]
      }
    ],
    audiences: [
      {
        name: audience.name,
        conditions: {
          attribute: ${attribute.name},
          operator: String,
          value: String
        }
      }
    ]
  }
]
```

Possible Ruleset Object (multiple environments):
```js
res.body = {
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
