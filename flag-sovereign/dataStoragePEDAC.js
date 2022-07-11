/*
Questions:
1. When we send flag value back: an array/obj of flag with value.

2. We want to transform the data so that we can eval the flag quickly based on userContext. Or do we just ask manager to send it a different format lol

3. Do we need to cache the result?

*/
// current setup: How does this doesn't work with ALL combinations?
{
  sdkKey: {
    userId: {
      flagName: value		
    }
  }
}

// I'm thinking:
// userContext = { sdk:"123", userId = "abc", location: "USA", device: "iOS" } 
// isolate attribute from  userContext: { sdk, ...userAttributes } = useContext

// if my "saved" flagset looks like this:
{
  sdk: "123"
  flags: {
    flagName1: {
      //assume that audience has only 1 attribute in the rule,
      // operator is only '='
      audiences: {location: "USA", device: "ios"}, //each key-pair is an audience
      // audience1: location === USA
      // audience2: device === ios
      combintaion: "all",
      status: TRUE,
    },
  }
}

  // userAttributes = { location: "USA", device: "iOS" } 
  // allFlags = cache[sdk][flags]
  // allFlagValues = {}

  // for flag of allFlags:
  // audienceAttributes = flag.audiences.key
    // if flag.combination == all
      // allFlagValues[flag.name] = audienceAttributes.every(attribute => userAttributes.keys.includes(attribute))
      // IT MATCHES
		// else flag.combination == any
       // allFlagValues[flag.name] = audienceAttributes.any(attribute => userAttributes.keys.includes(attribute))

  // evaluatedCache = 
  // {
  //   'my-sdk-key': {
  //     jjuy: {
  //       'new-button': true,
  //       'new-nav-bar': false,
  //       'flag-without-audience': false
  //     }
  //   }
  // }