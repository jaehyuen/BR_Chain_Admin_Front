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
import MoneyIcon from "@material-ui/icons/Money";
import ApiService from "../../../service/ApiService";
import Rotate from "react-reveal/Rotate";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

const Budget = ({ className, ...rest }) => {
  const [channelList, setChannelList] = useState([]);
  const [channel, setChannel] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (channelList.length == 0) {
      ApiService.getChannelList().then((result) => {
        setChannelList(result.data.resultData);
        setChannel(result.data.resultData[Math.floor(Math.random() * result.data.resultData.length)]);
      });
    } else {
      setShow(true)
      setTimeout(() => {
        setShow(false)
        let index
        while (true) {
          index=Math.floor(Math.random() * channelList.length)

          if( channelList[index].channelName != channel.channelName){
            break;
          }
        }

        setChannel(channelList[index]);
        
      }, 2000);
    }
  }, [channel]);

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              <Rotate top left when={show}>
                <div>{channel.channelName} 채널</div>
              </Rotate>
            </Typography>
            <Typography color="textPrimary" variant="h4">
              <Rotate top left when={show}> 
                <div>블록수 : {channel.channelBlock}, 트렌젝션수 : {channel.channelTx}</div>
              </Rotate>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
