import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import MoneyIcon from "@material-ui/icons/Money";
import ApiService from "../../../service/ApiService";
import Flip from "react-reveal/Flip";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  icon: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  increaseIcon: {
    color: colors.green[900],
  },
  decreaseIcon: {
    color: colors.red[900],
  },
  increaseValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
  decreaseValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

const ChannelSummary = ({ className, ...rest }) => {
  const [channelList, setChannelList] = useState([]);
  const [channel, setChannel] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (channelList.length == 0) {
      ApiService.getChannelSummaryList().then((result) => {
        setChannelList(result.data.resultData);
        setChannel(
          result.data.resultData[
            Math.floor(Math.random() * result.data.resultData.length)
          ]
        );
      });
    } else {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        let index;
        while (true) {
          index = Math.floor(Math.random() * channelList.length);

          if (channelList[index].channelName != channel.channelName) {
            break;
          }
        }

        setChannel(channelList[index]);
      }, 5000);
    }
  }, [channel]);

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Flip top when={show}>
        <CardContent>
          <Grid container justify="space-between" spacing={3}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h6">
                <div>{channel.channelName} 채널</div>
              </Typography>
              <Typography color="textPrimary" variant="h4">
                <div>
                  3월 블록수 : {channel.nowBlockCnt}, 트렌젝션수 :{" "}
                  {channel.nowTxCnt}
                </div>
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.icon}>
                <MoneyIcon />
              </Avatar>
            </Grid>
          </Grid>

          {channel.flag == true && (
            <Box mt={2} display="flex" alignItems="center">
              <ArrowUpwardIcon className={classes.increaseIcon} />
              <Typography className={classes.increaseValue} variant="body2">
                {channel.percent}%
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Since last month
              </Typography>
            </Box>
          )}
          {channel.flag == false && (
            <Box mt={2} display="flex" alignItems="center">
              <ArrowDownwardIcon className={classes.decreaseIcon} />
              <Typography className={classes.decreaseValue} variant="body2">
                {channel.percent}%
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Since last month
              </Typography>
            </Box>
          )}
        </CardContent>
      </Flip>
    </Card>
  );
};

ChannelSummary.propTypes = {
  className: PropTypes.string,
};

export default ChannelSummary;
