import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SnackbarProvider, useSnackbar } from 'notistack';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
let sockJS = new SockJS('http://localhost:8080/sock');

// let sockJS = new SockJS('http://192.168.65.169:8080/sock');
let stompClient = Stomp.over(sockJS);
// stompClient.debug = () => {};




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [contents, setContents] = useState('');


  const { enqueueSnackbar } = useSnackbar();
  stompClient.connect({}, () => {
    stompClient.subscribe('/rooms', data => {
      setContents(data.body);
      enqueueSnackbar("on event block num is"+data.body);
    });
  });
  useEffect(() => {
    console.log('z');
    stompClient.connect({}, () => {
      stompClient.subscribe('/event', data => {
        setContents(data.body);
        enqueueSnackbar("on event zz "+data.body);
      });
    });
  }, [contents]);
  return (

    <div className={classes.root}>
      
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet {...props} children="zzz" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default DashboardLayout;
