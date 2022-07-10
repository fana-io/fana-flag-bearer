## Preliminary Day 2 Database Model

# Changes since Day 1:

This is still incomplete and lowly documented. Included more context and explanation of general structure in this readme. In-file comments are still unfinished, but there should be some better sense of the flow of data in this document.

# Disclaimer:
This is incomplete in every way; just thought it would be helpful to maintain transparency regarding the current data model and how the DB is taking shape.

Still needs some commenting, but this document is better.

The API is incomplete and only has routes to create *Flags*, *Audiences*, and *Attributes*
It's cumbersome as is. I wouldn't recommend it. But you can successfully curl//postman requests if you launch the App.

*The validators are not particularly useful; they are much moreso just placeholders I borrowed from the React project*

And for the above reason, errors for violating the respective Schemas when you try to create an object are not specific, so it can be confusing to try to identify the issue.
Eg., if you POST a request to make a flag with a key that already exists, or a field with the value of the inappropriate type, you'll recieve only: `'Creating flag failed, please try again'`
---

# General Structure

Manager has two general purposes:

1. Serve the [Management API](#11-requests-to-the-management-api) through which to manage and query flag data in the database
  - [Create Attribute](#post-attributes--create-attribute)
  - [Create Audience](#post-audiences--create-audience)
  - [Create Flag](#post-flags--create-flag)
  - [WIP](#management-wip)

2. Serve the [Flag Bearer API](#21-flag-bearer-api) that provides the ruleset to the Flag Bearer server instances

**General Flow**
As always, `index.js` initializes the application to listen on the specified PORT
When a request is recieved, `routes/api.js` specifies how it will be handled according to the request's `METHOD` and `PATH`
The request moves along this flow: the appropriate `validators/validators.js` handler and then `controllers/<specificController>.js` handler.

As noted above, the validator is not particularly useful right now.
---

## 1.1 Requests to the Management API:

This works by way of `managementController.js`, which defines all the primary handlers that query the database when the routes below are called.

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

# Management WIP
- Update Flags, Audiences
  - Insert conditions into audiences
  - Insert audiences into flags

- Potentially, alter the API payload expectations to recieve more intuitive unique keys (attribute/audience `name`) over `ObjectId` for the embedded Mongo document cross-references.

- Better error on creating duplicate unique keys (generic error ATM)
---

# 2.1 Flag Bearer API
This is currently serves only `GET` requests made _from_ the Flag Bearer.
In other words, nothing is proactively pushed for the moment. This will almost certainly change.

`providerController` queries the DB and then translates each raw flag document into the object the flag bearer is expecting.
this is pretty convoluted mapping of objects into arrays, etc.

## GET /ruleset
This expects no payload and returns a [Ruleset Object](#mvp-ruleset-object)

# General WIP:
- Operators for Conditions: what are we using? (`EQ` alone sufficient for MVP)


## Unrelated, just random note on potential payload changes in future phases:

### MVP Ruleset Object:
```js
[
  {
    sdkKey: str,
    flags: [ 
      {
        name: str,    // I call this key in DB, arbitarily. was looking at another product maybe
        status: bool, 
        combination: str,
        audiences: [audienceId]
      }
    ],
    audiences: [
      {
        audienceId: id,
        conditions: [         // THIS IS NOW AN ARRAY (oops before)
          {
            attribute: ${attribute.name},  // THIS IS NOW NAME (not _id)
            operator: String,
            value: String
          }
        ]
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
