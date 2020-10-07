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

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const ChaincodeList = (props) => {
  const [ccList, setCcList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ApiService.getCcList().then((result) => {
      setCcList(result.data.resultData);
    });
  }, [ccList]);

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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>체인코드 이름</TableCell>
              <TableCell>체인코드 언어</TableCell>
              <TableCell>체인코드 설명</TableCell>
              <TableCell>체인코드 경로</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ccList.map((cc, index) => (
              <TableRow key={index}>
                <TableCell>{cc.ccName}</TableCell>
                <TableCell>{cc.ccLang}</TableCell>
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
      <Button variant="contained" color="primary" href="/upload/chaincode">
        체인코드 업로드
      </Button>
    </div>
  );
};

export default ChaincodeList;
