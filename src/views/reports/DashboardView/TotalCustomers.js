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
import ApiService from "../../../service/ApiService";
import CodeIcon from '@material-ui/icons/Code';
import Flip from "react-reveal/Flip";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  icon: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
}));

const TotalCustomers = ({ className, ...rest }) => {
  const [peerList, setPeerList] = useState([]);
  const [peer, setPeer] = useState({});
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (peerList.length == 0) {
      ApiService.getChaincodeSummaryList().then((result) => {
        setPeerList(result.data.resultData);
        setPeer(
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
          index = Math.floor(Math.random() * peerList.length);

          if (peerList[index].conName != peer.conName) {
            break;
          }
        }

        setPeer(peerList[index]);
      }, 5000);
    }
  }, [peer]);

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Flip top when={show}>
        <CardContent>
          <Grid container justify="space-between" spacing={3}>
            <Grid item>
            {peerList.length == 0 ? (
                  <div>No Peers</div>
                ) : (
                  <div>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                  Peer {peer.conName}
                </Typography>
                <Typography color="textPrimary" variant="h5">
                 {peer.ccCnt} Chaincodes Installed
                </Typography>
                </div>
                )}
         
            </Grid>
            <Grid item>
              <Avatar className={classes.icon}>
                <CodeIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Flip>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string,
};

export default TotalCustomers;
