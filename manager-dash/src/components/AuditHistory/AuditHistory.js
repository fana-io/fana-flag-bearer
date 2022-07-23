import { Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { useEffect, useState, useCallback } from "react"
import apiClient from "../../lib/apiClient";
import { LogRow } from "./LogRow";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import { initializationErrorMessage } from "../../lib/messages";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const AuditHistory = () => {
  const [logs, setLogs] = useState([]);
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [ready, setReady] = useState(false);
  const [newestFirst, setNewestFirst] = useState(false);
  const [searchText, setSearchText] = useState('');

  const sortLogs = useCallback((logs) => {
    if (newestFirst) {
      return logs.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)
    } else {
      return logs.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
    }
  }, [newestFirst])

  const fetchLogs = useCallback(async () => {
    const l = await apiClient.getLogs();
    const flagLogs = l.flagLogs.map(f => {
      return {...f, type: 'flags', logID: `flag${f.logID}`};
    });
    const audienceLogs = l.audienceLogs.map(a => {
      return {...a, type: 'audiences', logID: `audience${a.logID}`};
    });
    const attributeLogs = l.attributeLogs.map(a => {
      return {...a, type: 'attributes', logID: `attribute${a.logID}`};
    })
    const compiledLogs = flagLogs.concat(audienceLogs, attributeLogs);
    setLogs(compiledLogs);

    return compiledLogs;
  }, [])

  useEffect(() => {
    const initialize = async () => {
      try {
        const l = await fetchLogs();
        console.log('initializing', l)
        setDisplayedLogs(l);
        setReady(true);
      } catch (e) {
        alert(initializationErrorMessage)
      }
    }
    initialize();
  }, [fetchLogs])

  useEffect(() => {
    console.log('logs', logs)
    const lcSearchText = searchText.toLowerCase();
    const filteredLogs = logs.filter(l => {
      console.log('this log', l)
      return (l.type.toLowerCase().includes(lcSearchText) ||
              l.key.toLowerCase().includes(lcSearchText) ||
              l.action.toLowerCase().includes(lcSearchText))
    })
    setDisplayedLogs(sortLogs(filteredLogs));
  }, [searchText, logs, sortLogs])

  if (!ready) {
    return (<>Loading...</>)
  }

  return (
    <Box container="true" spacing={1}>
      <Typography variant="h3">Audit History</Typography>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Search logs"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>
      <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Entity Type</TableCell>
            <TableCell>Entity Key</TableCell>
            <TableCell style={{ width: 300 }}>Event</TableCell>
            <TableCell>
              Date
              <IconButton onClick={() => setNewestFirst(!newestFirst)} >
                <SortIcon />  
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedLogs.map(log => {
            return (<LogRow key={log.logID} log={log} />)
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}