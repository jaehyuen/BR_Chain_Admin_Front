import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import ChaincodeListChannel from '../chaincode/ChaincodeListChannel';
import { Box, Container, makeStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import Page from 'src/components/Page';
import { useNavigate, useParams } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ChannelDetails = props => {
  const classes = useStyles();
  const [channelInfo, setChannelInfo] = useState([]);
  const [channelListPeer, setChannelListPeer] = useState([]);
  const [chaincodeListChannel, setChaincodeListChannel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState({});
  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState('');

  let { channelName } = useParams();


  useEffect(() => {
    ApiService.getChannelListPeerByChannelName(channelName).then(result => {
      setChannelListPeer(result.data.resultData);
    });
    ApiService.getCcListChannel(channelName).then(result => {
      console.log(channelName)
      setChaincodeListChannel(result.data.resultData);
      console.log(result.data.resultData)
    });
    ApiService.getChannelListByChannelName(channelName).then(result => {
      setChannelInfo(result.data.resultData);
    });
  }, [channelName]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const registerEventListener = () => {
    ApiService.registerEventListener(channelName).then(result => {
      console.log(result.data);
      alert(result.data.resultMessage);
      // props.history.push("/org");
    });
  };
  const setLoadingStauts = value => {
    setIsLoading(value);
  };

  const finActiveCc = () => {
    navigate('/app/channel/');
  };

  const setAnchorPeer = (conName) => {
    
    ApiService.updateAnchor(channelName,conName).then(result => {
      
      alert(result.data.resultMessage);
      // props.history.push("/org");
    }).catch(error =>{
      alert(error.response.data.resultData);
    });

  };

  const updateChannelConfig=()=>{

  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      {isLoading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <Page className={classes.root} title="Channels">
            <Container maxWidth="lg">
              <Typography component="h1" variant="h5">
              {channelName} Channel Detail Info
              </Typography>
              <Box mt={3}>
                <br></br>
                <Typography component="h1" variant="h6">
                  Joined Peer List in {channelName} Channel
                </Typography>
                <br></br>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Container Name</TableCell>
                        <TableCell>Anchor YN</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {channelListPeer.map((channelList, index) => (
                        <TableRow key={index}>
                          <TableCell>{channelList.conInfoDto.conName}</TableCell>
                          <TableCell>
                            {channelList.anchorYn.toString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" color="secondary"
                            onClick={()=>setAnchorPeer(channelList.conInfoDto.conName)}>
                              Setting Anchor
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <Typography component="h1" variant="h6">
                  Actived Chaincode List in {channelName} Channel
                </Typography>
                <br></br>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Chaincode Name</TableCell>
                        <TableCell>Chaincode Version</TableCell>
                        <TableCell>Chaincode Lang</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chaincodeListChannel.map((chaincodeList, index) => (
                        <TableRow key={index}>
                          <TableCell>{chaincodeList.ccInfoDto.ccName}</TableCell>
                          <TableCell>{chaincodeList.ccVersion}</TableCell>
                          <TableCell>{chaincodeList.ccInfoDto.ccLang}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <Button
                  aria-describedby={id}
                  variant="contained"
                  color="primary"
                  value="zz"
                  // onClick={()=>{test("z")},handleClick}
                  onClick={event => {
                    setSelectedMember('zz');
                    setAnchorEl(event.currentTarget);
                  }}
                  // disabled
                >
                  Active Chaincode
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                  style={{ shadows: ['none'] }}
                >
                  {' '}
                  <ChaincodeListChannel
                    channelName={channelName}
                    loading={setLoadingStauts}
                    finish={finActiveCc}
                  ></ChaincodeListChannel>
                </Popover>
                <br></br>
                <br></br>
                <Typography component="h1" variant="h6">
                  {channelName} Channel Setting
                </Typography>
                <br></br>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                      <TableCell></TableCell>
                        <TableCell>Application Admin</TableCell>
                        <TableCell>Channel Admin</TableCell>
                        <TableCell>Orderer Admin</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                        <TableRow >
                        <TableCell>Type</TableCell>
                          <TableCell>{channelInfo.appAdminPolicyType}</TableCell>
                          <TableCell>{channelInfo.channelAdminPolicyType}</TableCell>
                          <TableCell>{channelInfo.ordererAdminPolicyType}</TableCell>
                        </TableRow>
                        <TableRow >
                        <TableCell>Value</TableCell>
                          <TableCell>{channelInfo.appAdminPolicyValue}</TableCell>
                          <TableCell>{channelInfo.channelAdminPolicyValue}</TableCell>
                          <TableCell>{channelInfo.ordererAdminPolicyValue}</TableCell>
                        </TableRow>
                      
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                      
                        <TableCell>Batch Timeout</TableCell>
                        <TableCell>BatchSize Absolute Max Bytes</TableCell>
                        <TableCell>BatchSize Preferred Max Bytes</TableCell>
                        <TableCell>BatchSize Max Message</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                        <TableRow >
                        
                          <TableCell>{channelInfo.batchTimeout}</TableCell>
                          <TableCell>{channelInfo.batchSizeAbsolMax}</TableCell>
                          <TableCell>{channelInfo.batchSizePreferMax}</TableCell>
                          <TableCell>{channelInfo.batchSizeMaxMsg}</TableCell>

                        </TableRow>
                      
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <Button
                  aria-describedby={id}
                  variant="contained"
                  color="primary"
                  // onClick={updateChannelConfig}
                  href={"/app/update/channel/"+channelName}
                  // disabled
                >
                  Change Channel Setting
                </Button>
                <br></br>
                <br></br>
                <Button
                // disabled
                  aria-describedby={id}
                  variant="contained"
                  color="primary"
                  onClick={registerEventListener}
                >
                  Active Event Listen
                </Button>
              </Box>
            </Container>
          </Page>
        </div>
      )}
    </div>
  );
};

export default ChannelDetails;
