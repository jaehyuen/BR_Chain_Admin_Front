import React, { useState,useEffect } from "react";
import ApiService from "../../service/ApiService";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

const ChannelList  =(props)=> {
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
ApiService.getChannelList().then((result)=> setChannelList(result.data.resultData));
    console.log("useEffect")
  }, []);
  
    

    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>채널 이름</TableCell>
                <TableCell>채널 트렌젝션 개수</TableCell>
                <TableCell>채널 블록 개수</TableCell>
                <TableCell>오더링 조직</TableCell>
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
                      props.history.push("/channel/"+channel.channelName)
                    }
                  >
                    채널 상세 정보
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <Button variant="contained" color="primary" href="/create/channel">
          채널 추가
        </Button>
      </div>
    );
  
}

export default ChannelList;
