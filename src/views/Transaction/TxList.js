import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

import { Box, Container, makeStyles, Link } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import Page from "src/components/Page";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Popover from "@material-ui/core/Popover";
import Pagination from "@material-ui/lab/Pagination";
import TxDetail from "./TxDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const TxList = (props) => {
  const classes = useStyles();
  const [channelList, setChannelList] = useState([]);
  const [txList, setTxist] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("");
  const [currentTx, setCurrentTx] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const [noOfPages, setNoOfPages] = useState(0);
  const [page, setPage] = useState(1);

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentTx("");
  };

  const stringStyle = {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "200px",
    whiteSpace: "nowrap",
  };

  useEffect(() => {
    ApiService.getChannelList().then((result) => {
      // var result =result.data.resultData
      setChannelList(result.data.resultData);
    });
    console.log("useEffect");
  }, []);

  useEffect(() => {
    ApiService.getTxListByChannel(currentChannel).then((result) => {
      
      setTxist(result.data.resultData);
      setNoOfPages(Math.ceil(result.data.resultData.length / 10));
      
    });
  }, [currentChannel]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const channelChange = (event) => {
    setCurrentChannel(event.target.value);
  };

  return (
    <div>
      <Page className={classes.root} title="Blocks">
        <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            <Select onChange={channelChange}>
              {channelList.map((channel) => (
                <MenuItem value={channel.channelName}>
                  {channel.channelName}
                </MenuItem>
              ))}
            </Select>
            Transaction Info
          </Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Creator</TableCell>
                    <TableCell>TransactionID</TableCell>
                    <TableCell>TransactionType</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {txList.slice((page - 1) * 10, page * 10).map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>{tx.creatorId}</TableCell>
                      <TableCell>
                        <LightTooltip title={tx.txId}>
                          <Link
                            style={stringStyle}
                            onClick={(event) => {
                              setAnchorEl(event.currentTarget);
                              setCurrentTx(tx.txId);
                            }}
                          >
                            {tx.txId}
                          </Link>
                        </LightTooltip>

                        <Popover
                          id={tx.txId}
                          open={tx.txId == currentTx ? true : false}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          style={{ shadows: ["none"] }}
                        >
                          <TxDetail txId={tx.txId}></TxDetail>
                        </Popover>
                      </TableCell>
                      <TableCell>{tx.txType}</TableCell>
                      <TableCell>{currentChannel}</TableCell>
                      <TableCell>{tx.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br></br>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default TxList;
