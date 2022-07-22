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

export const AuditHistory = () => {
  const [logs, setLogs] = useState([]);
  const [ready, setReady] = useState(false);
  const [newestFirst, setNewestFirst] = useState(false);

  const sortLogs = useCallback((logs) => {
    if (newestFirst) {
      return logs.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
    } else {
      return logs.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
    }
  }, [newestFirst])

  const fetchLogs = useCallback(async () => {
    const l = await apiClient.getLogs();
    const flagLogs = l.flags.map(f => {
      return {...f, type: 'flags'};
    });
    const audienceLogs = l.audiences.map(a => {
      return {...a, type: 'audiences'};
    });
    const attributeLogs = l.attributes.map(a => {
      return {...a, type: 'attributes'};
    })
    const compiledLogs = flagLogs.concat(audienceLogs, attributeLogs);

    setLogs(sortLogs(compiledLogs));
  }, [sortLogs])

  useEffect(() => {
    const initialize = async () => {
      await fetchLogs();
      setReady(true);
    }
    initialize();
  }, [fetchLogs])

  if (!ready) {
    return (<>Loading...</>)
  }

  return (
    <Box container="true" spacing={1}>
      <Typography variant="h3">Audit History</Typography>
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
          {logs.map(log => {
            const logIdentifier = String(log.id) + log.type + log.createdAt;
            return (<LogRow key={logIdentifier} log={log} />)
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}