# Fana Flag Bearer
The Flag Bearer is a reverse proxy responsible for:
1. serving as an endpoint for SDKs to request flag data upon initialization (see [[#Initializing SDKs with flag data]] for more information)
2. serving as a streaming endpoint for SDK clients connecting via server-sent events
3. forwarding real-time updates to SDKs regarding flags and their toggle status

## Usage
The Flag bearer is one component of the Fana feature flagging platform and should be used in conjunction with the [Fana Manager Platform](https://github.com/fana-io/fana-manager) and the software development kit (SDK) of the developers choice. 

There are two options to get started in a self-hosted environment.

1. Deploy the entire Fana Platform stack using Docker Compose yaml file found [here](https://github.com/fana-io/fana-deploy).

2. Pull the Docker image from DockerHub and run the container in an existing Docker network with the prerequisite components:
```bash
$ docker pull fanaff/fana-flag-bearer
```

Prerequisites include: 
- PostgreSQL running on port `5432`
- Redis Cluster running on port `6379`
- Manager Platform running on `3000`

Currently available SDKs:
- [NodeJS](https://github.com/fana-io/fana-node-sdk)
- [React](https://github.com/fana-io/fana-react-sdk)

## Initializing SDKs with flag data
Flag targeting rules can potentially be set up with sensitive user information, such as names, email addresses, or IP addresses. This can be a concern when working with client-side SDKs, since, if targeting information (embedding in the flag rules) is being sent to the browser, anyone can see the HTTP response. 

To mitigate the exposure of sensitive user information, we designed the Flag Bearer to act as a sort of proxy for the data, as described above. This means the only thing that the client browser receives is a list of keys and booleans, and the potentially sensitive targeting information stays hidden.

See below for high level overview of the process. 
### Server-side SDKs
- SDKs receive the entirety of the flag ruleset (including user information) and flags are evaluated at *run-time* 
- To initialize, a server-side SDK provides the SDK key in it's request to the Flag Bearer. 
- Upon verification, the Bearer sends back the entire flag ruleset, which the SDK stores in memory to evaluate at run-time.
- An SSE connection is established with the Flag Bearer using the EventSource API to allow the SDK to receive real-time updates to flag data from the Flag Bearer.


### Client-side SDKs
- SDKs receive pre-evaluated flags in an object, limited to the flag name and the evaluation result.
- After verifying the SDK key, the Bearer pre-evaluates all of the flag keys using the provided user context, and only sends back a hashmap of flag keys with true and false values.
- This hashmap is then stored in memory in the SDK.
 - An SSE connection is established with the Flag Bearer using the EventSource API to allow the SDK to receive real-time updates to flag data from the Flag Bearer.

