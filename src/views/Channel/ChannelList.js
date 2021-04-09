import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';

import { Box, Container, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import Typography from '@material-ui/core/Typography';

import Page from 'src/components/Page';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ChannelList = props => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    ApiService.getChannelList().then(result =>
      setChannelList(result.data.resultData)
    );
    console.log('useEffect');
  }, []);

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
                  {channelList.map((channel, index) => (
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
                            navigate(
                              '/app/channel/' + channel.channelName
                            )
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
            <Button variant="contained" color="primary" href="/app/create/channel" disabled>
              Add Channel
            </Button>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default ChannelList;
