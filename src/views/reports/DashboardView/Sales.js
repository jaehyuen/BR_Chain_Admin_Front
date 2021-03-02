import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ApiService from '../../../service/ApiService';
import { result } from 'lodash';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Sales = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setdata] = useState({})

  useEffect(() => {
    ApiService.getChannelList().then(result =>{
      let block=[] 
      let tx=[]
      let channel=[]
      console.log(result.data.resultData)
      // console.log(result.data.resultData.length)

      for(let i=0;i<result.data.resultData.length;i++){

        block[i]=result.data.resultData[i].channelBlock;
        tx[i]=result.data.resultData[i].channelTx;
        channel[i]=result.data.resultData[i].channelName;
      }
      console.log("block : "+block)
      console.log("tx : "+tx)
      console.log("channel : "+channel)
     
      let listData = {
        datasets: [
          {
            backgroundColor: colors.indigo[500],
            data: block,
            label: 'block'
          },
          {
            backgroundColor: colors.grey[200],
            data: tx,
            label: 'tx'
          }
        ],
        labels: channel
      };
      setdata(listData)
    }
    
    );
  }, []);



  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={(
        //   <Button
        //     endIcon={<ArrowDropDownIcon />}
        //     size="small"
        //     variant="text"
        //   >
        //     Last 7 days
        //   </Button>
        // )}
        title="test"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>

    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
