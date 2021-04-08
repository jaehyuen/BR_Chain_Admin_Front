import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

import { Box, Container, makeStyles } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";

import Page from "src/components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const TxDetail = (props) => {
  const classes = useStyles();
  const [tx, setTx] = useState([]);
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    // alert(props.txId)
    ApiService.getTxListByTx(props.txId).then((result) => {
      console.log(result.data.resultData);
      setTx(result.data.resultData);
      setChannel(result.data.resultData.channelInfoDto);
    });
  }, []);

  return (
    <div>
      <Page className={classes.root} title="Orgs">
        <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            Tx Detail
          </Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table aria-label="block table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Channel Name :
                      </Typography>
                    </TableCell>
                    <TableCell>{channel.channelName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Transaction ID :
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.txId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Timestamp :
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.timestamp}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Transaction Type :
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.txType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Creator Id :
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.creatorId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Chaincode Name :
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.ccName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Chaincode Version :
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.ccVersion}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        test :
                      </Typography>
                    </TableCell>
                    <TableCell>{tx.ccArgs}</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default TxDetail;
