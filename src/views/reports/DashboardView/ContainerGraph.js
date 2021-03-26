import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import PhoneIcon from "@material-ui/icons/Phone";
import TabletIcon from "@material-ui/icons/Tablet";
import ApiService from "../../../service/ApiService";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const ContainerGraph = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setdata] = useState({});
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    ApiService.getContainerList().then((result) => {
      let ca = 0;
      let peer = 0;
      let orderer = 0;
      let chaincode = 0;

      let regCa = new RegExp("^/ca.*com$");
      let regPeer = new RegExp("^/peer.*com$");
      let regOrderer = new RegExp("^/orderer.*com$");

      result.data.resultData.forEach((stats) => {
        if (regCa.test(stats.conName) && stats.conStatus.startsWith("Up")) {
          ca++;
        } else if (
          regPeer.test(stats.conName) &&
          stats.conStatus.startsWith("Up")
        ) {
          peer++;
        } else if (
          regOrderer.test(stats.conName) &&
          stats.conStatus.startsWith("Up")
        ) {
          orderer++;
        } else if (
          stats.conName.startsWith("/dev-peer") &&
          stats.conStatus.startsWith("Up")
        ) {
          chaincode++;
        }
      });

      setdata({
        datasets: [
          {
            data: [ca, peer, orderer, chaincode],
            backgroundColor: [
              colors.indigo[500],
              colors.red[600],
              colors.orange[600],
              colors.green[600],
            ],
            borderWidth: 8,
            borderColor: colors.common.white,
            hoverBorderColor: colors.common.white,
          },
        ],
        labels: ["Ca", "Peer", "Orderer", "Chaincode"],
      });
      setContainers([
        {
          title: "Ca",
          value: ca,
          icon: LaptopMacIcon,
          color: colors.indigo[500],
        },
        {
          title: "Peer",
          value: peer,
          icon: TabletIcon,
          color: colors.red[600],
        },
        {
          title: "Orderer",
          value: orderer,
          icon: PhoneIcon,
          color: colors.orange[600],
        },
        {
          title: "Chaincode",
          value: chaincode,
          icon: PhoneIcon,
          color: colors.green[600],
        },
      ]);
    });
  }, []);

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="실행중인 컨테이너 현황" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {containers.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}개
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

ContainerGraph.propTypes = {
  className: PropTypes.string,
};

export default ContainerGraph;
