import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiClient from "../../lib/apiClient";
import { AudienceCondition } from "./AudienceCondition";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

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
    <Box container="true" spacing={1} sx={{
      marginLeft: 8,
      maxWidth: 1000
    }}>
      <Stack container="true" spacing={2}>
        <Typography variant="h3">Audience Details</Typography>
        <Stack>
          <Typography variant="caption">Title</Typography>
          <Typography variant="subtitle1">{audience.displayName}</Typography>
        </Stack>
        <Stack>
          <Typography variant="caption">Key</Typography>
          <Typography variant="subtitle1">{audience.key}</Typography>
        </Stack>
        <h2>Conditions:</h2>
        <ul>
          {audience.conditions.map((condition, idx) => {
            return (<AudienceCondition key={idx} condition={condition} />)
          })}
        </ul>
      </Stack>
    </Box>
  )
}