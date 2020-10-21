import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import ChaincodeListChannel from "../Chaincode/ChaincodeListChannel";

import Popover from "@material-ui/core/Popover";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockJS = new SockJS("http://localhost:8080/");
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};

const ChannelDetails = (props) => {
  const [channelListPeer, setChannelListPeer] = useState([]);
  const [chaincodeListChannel, setChaincodeListChannel] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState({});

  // const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState("");

  const channelName = props.match.params.channelName;

  useEffect(() => {
    console.log("z");
    stompClient.connect({}, () => {
      stompClient.subscribe("/event", (data) => {
        setContents(data.body);
      });
    });
  }, [contents]);

  useEffect(() => {
    ApiService.getChannelListPeerByChannelName(channelName).then((result) => {
      setChannelListPeer(result.data.resultData);
    });
    ApiService.getCcListChannel(channelName).then((result) => {
      setChaincodeListChannel(result.data.resultData);
    });
  }, [channelName]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const registerEventListener = () => {
    ApiService.registerEventListener(props.match.params.channelName).then(
      (result) => {
        // props.history.push("/org");
      }
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Typography component="h1" variant="h5">
        {props.match.params.channelName} 채널 상세정보
      </Typography>
      <br></br>
      <Typography component="h1" variant="h6">
        {props.match.params.channelName}에 가입된 피어 리스트
      </Typography>
      <br></br>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>컨테이너 이름</TableCell>
              <TableCell>앵커피어 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channelListPeer.map((channelList, index) => (
              <TableRow key={index}>
                <TableCell>{channelList.conName}</TableCell>
                <TableCell>{channelList.anchorYn.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Typography component="h1" variant="h6">
        {props.match.params.channelName}에 활성화된 체인코드 리스트
      </Typography>
      <br></br>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>체인코드 이름</TableCell>
              <TableCell>체인코드 버전</TableCell>
              <TableCell>체인코드 언어</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chaincodeListChannel.map((chaincodeList, index) => (
              <TableRow key={index}>
                <TableCell>{chaincodeList.ccName}</TableCell>
                <TableCell>{chaincodeList.ccVersion}</TableCell>
                <TableCell>{chaincodeList.ccLang}</TableCell>
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
        onClick={(event) => {
          setSelectedMember("zz");
          setAnchorEl(event.currentTarget);
        }}
      >
        체인코드 활성화
      </Button>
      <Popover
        id={id}
        open={open}
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
        {" "}
        <ChaincodeListChannel 
          channelName={props.match.params.channelName}
          loading={props.loading}
        ></ChaincodeListChannel>
      </Popover>

      <br></br>
      <br></br>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={registerEventListener}
      >
        이벤트 리슨 활성화
      </Button>
    </div>
  );
};

export default ChannelDetails;
