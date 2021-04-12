import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import Grid from "@material-ui/core/Grid";
import { Box, Container, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";

import Page from "src/components/Page";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ChannelList = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState([]);

  const [noOfPages, setNoOfPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    ApiService.getChannelList().then((result) => {
      setChannelList(result.data.resultData);
      setNoOfPages(Math.ceil(result.data.resultData.length / 10));
    });
    console.log("useEffect");
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Page className={classes.root} title="Channels">
        <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            Channel List
          </Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>TxCount</TableCell>
                    <TableCell>BlockCount</TableCell>
                    <TableCell>OrderingOrg</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {channelList
                    .slice((page - 1) * 10, page * 10)
                    .map((channel, index) => (
                      <TableRow key={index}>
                        <TableCell>{channel.channelName}</TableCell>
                        <TableCell>{channel.channelTx}</TableCell>
                        <TableCell>{channel.channelBlock}</TableCell>
                        <TableCell>{channel.orderingOrg}</TableCell>
                        <TableCell>
                          <Button
                            value={channel.channelName}
                            variant="contained"
                            // color="secondary"
                            onClick={() =>
                              navigate("/app/channel/" + channel.channelName)
                            }
                          >
                            detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br></br>
            <Grid
                  justify="space-between" // Add it here :)
                  container
                >
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
            <Button
              variant="contained"
              color="primary"
              href="/app/create/channel"
              // disabled
            >
              Add Channel
            </Button>
            </Grid>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default ChannelList;
