import React, { Component } from "react";
import ApiService from "../../service/ApiService";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelList: [],
    };
  }

  async componentDidMount() {
    let result = await ApiService.getChannelList();
    console.log(result)

    this.setState({
      channelList: result.data.resultData,
    });
  }

  render() {
    const channelList = this.state.channelList;

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
              </TableRow>
            </TableHead>
            <TableBody>
              {channelList.map((org, index) => (
                <TableRow key={index}>
                  <TableCell>{org.channelName}</TableCell>
                  <TableCell>{org.channelTx}</TableCell>
                  <TableCell>{org.channelBlock}</TableCell>
                  <TableCell>{org.orderingOrg}</TableCell>
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
}

export default ChannelList;
