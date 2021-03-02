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
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Page from 'src/components/Page';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ChannelList = props => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState([]);
  const [channelInfo, setChannelInfo] = useState([]);

  let { channelName } = useParams();

  useEffect(() => {
     ApiService.getChannelListByChannelName(channelName).then(result => {
      setChannelInfo(result.data.resultData);
    });
    console.log('useEffect');
  }, []);

  return (
    <div>
      {' '}
      <Page className={useStyles.root} title="OrgList">
        <Container maxWidth="lg">
          <Box mt={3}>
            <Container component="main">
              <CssBaseline />
              <div className={useStyles.paper}>
                <Typography component="h1" variant="h5">
                  채널 설정 변경 테스트
                </Typography>
                <br />
                Application Admin
                <br />
                <br />
                <form className={useStyles.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="appAdminPolicyValue"
                        variant="outlined"
                        fullWidth
                        id="appAdminPolicyValue"
                        label="Value"
                        required
                        defaultValue={channelInfo.appAdminPolicyValue}
                        // defaultValue="test"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Type"
                        id="appAdminPolicyType"
                        defaultValue={channelInfo.appAdminPolicyType}
                        
                        name="appAdminPolicyType"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        조직 생성
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default ChannelList;
