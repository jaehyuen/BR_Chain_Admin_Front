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

import Popover from "@material-ui/core/Popover";
// import MemberDetails from "./MemberDetails";

const ChannelDetails = (props) => {
  const [channelListPeer, setChannelListPeer] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [memberList, setMemberList] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ApiService.getChannelListPeerByChannelName(
      props.match.params.channelName
    ).then((result) => {
      setChannelListPeer(result.data.resultData);
    });
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
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
    </div>
  );
};

export default ChannelDetails;
