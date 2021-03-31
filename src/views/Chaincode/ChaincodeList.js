import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const ChaincodeList = (props) => {

  const classes = useStyles();

  const [ccList, setCcList] = useState([]);
  

  useEffect(() => {
    ApiService.getCcList().then((result) => {
      setCcList(result.data.resultData);
    });
  }, []);

  const stringStyle = {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "200px",
    whiteSpace: "nowrap",
  };

  const removeCc=()=>{
      
  }

  return (
    <div>
      <Page className={classes.root} title="Chaincodes">
          <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            체인코드 리스트
          </Typography>
            <Box mt={3}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Lang</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Desc</TableCell>
              <TableCell>Path</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ccList.map((cc, index) => (
              <TableRow key={index}>
                <TableCell>{cc.ccName}</TableCell>
                <TableCell>{cc.ccLang}</TableCell>
                <TableCell>{cc.ccVersion}</TableCell>
                <TableCell>
                  <LightTooltip title={cc.ccDesc}>
                    <div style={stringStyle}>{cc.ccDesc}</div>
                  </LightTooltip>
                </TableCell>
                <TableCell>
                  <LightTooltip title={cc.ccPath}>
                    <div style={stringStyle}>{cc.ccPath}</div>
                  </LightTooltip>
                </TableCell>
                <TableCell>    <Button
                    value={cc.ccName}
                    variant="contained"
                    color="secondary"
                    onClick={() =>  removeCc(cc.ccName)}
                  >
                    삭제
                  </Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button variant="contained" color="primary" href="/app/upload/chaincode">
        체인코드 업로드
      </Button>
      </Box>
          </Container>
        </Page>
    </div>
  );
};

export default ChaincodeList;
