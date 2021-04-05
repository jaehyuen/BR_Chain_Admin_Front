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

const BlockDetail = (props) => {
  const classes = useStyles();
  const [block, setBlock] = useState([]);
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    ApiService.getBlockListByHash(props.blockDataHash).then((result) =>{
    setBlock(result.data.resultData)
    setChannel(result.data.resultData.channelInfoDto)}
    );
  }, []);

  return (
    <div>
      <Page className={classes.root} title="Orgs">
        <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            Block Detail
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
                        Timestamp :
                      </Typography>
                    </TableCell>
                    <TableCell>{block.timestamp}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Block Number :
                      </Typography>
                    </TableCell>
                    <TableCell>{block.blockNum}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Number of Transactions :
                      </Typography>
                    </TableCell>
                    <TableCell>{block.txCount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Block Data Hash :
                      </Typography>
                    </TableCell>
                    <TableCell>{block.blockDataHash}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography component="h1" variant="h6">
                        Prev Block Data Hash :
                      </Typography>
                    </TableCell>
                    <TableCell>{block.prevDataHash}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default BlockDetail;
