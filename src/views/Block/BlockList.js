import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

import { Box, Container, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import Typography from "@material-ui/core/Typography";

import Page from "src/components/Page";
import { useNavigate } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const BlockList = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("");

  useEffect(() => {
    ApiService.getChannelList().then((result) => {
      // var result =result.data.resultData
      setChannelList(result.data.resultData);
    });
    console.log("useEffect");
  }, []);

  useEffect(() => {
    ApiService.getBlockListByChannel(currentChannel).then((result) => {
      // var result =result.data.resultData
      setBlockList(result.data.resultData);
      console.log(result.data.resultData);
    });
  }, [currentChannel]);

  const handleChange = (event) => {
    setCurrentChannel(event.target.value);
  };

  const stringStyle = {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "200px",
    whiteSpace: "nowrap",
  };

  return (
    <div>
      <Page className={classes.root} title="Blocks">
        <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            <Select onChange={handleChange}>
              {channelList.map((channel) => (
                <MenuItem value={channel.channelName}>
                  {channel.channelName}
                </MenuItem>
              ))}
            </Select>
            채널 블록 정보
          </Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>blockDataHashblockDataHashblockDataHashblockDataHash</TableCell>
                    <TableCell>blockNum</TableCell>
                    <TableCell>prevDataHash</TableCell>
                    <TableCell>timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blockList.map((block, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <LightTooltip title={block.blockDataHash}>
                          <div style={stringStyle}>{block.blockDataHash}</div>
                        </LightTooltip>
                      </TableCell>
                      <TableCell>{block.blockNum}</TableCell>
                      <TableCell>
                        <LightTooltip title={block.prevDataHash}>
                          <div style={stringStyle}>{block.prevDataHash}</div>
                        </LightTooltip>
                      </TableCell>
                      <TableCell>{block.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default BlockList;
