import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiClient from "../../lib/ApiClient";
import { AudienceCondition } from "./AudienceCondition";

export const Audience = () => {
  const audienceId = useParams().id;
  const [ready, setReady] = useState(false);
  const [audience, setAudience] = useState();

  useEffect(() => {
    const fetchFlag = async () => {
      const a = await apiClient.getAudience(audienceId);
      console.log('a', a);
      setAudience(a);
      setReady(true);
    }

    fetchFlag();
  }, [audienceId])

  if (!ready) {
    return <>Loading...</>
  }
  return (
    <div>
      <h1>Audience Details</h1>
      <h2>Name: {audience.displayName}</h2>
      <h3>Key: {audience.key}</h3>
      <h2>Conditions:</h2>
      <ul>
        {audience.conditions.map(condition => {
          return (<AudienceCondition condition={condition} />)
        })}
      </ul>
    </div>
  )
}