import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { Link } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

const OrgList = (props) => {
  const [orgList, setOrgList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ApiService.getOrgList("").then((result) =>
      setOrgList(result.data.resultData)
    );
  }, [orgList]);

  const removeOrgContainer = async (orgName) => {
    setIsLoading(true);
    console.log(orgName)
    await ApiService.removeOrgContainers(orgName).then((result) => {
    setIsLoading(false)


    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>조직 타입</TableCell>
              <TableCell>조직 이름</TableCell>
              <TableCell>조직 맴버 개수</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orgList.map((org, index) => (
              <TableRow key={index} >
                <TableCell component={Link} to={"/org/member/"+org.orgName}  style={{ textDecoration: 'none' }} >{org.orgType}</TableCell>
                <TableCell component={Link} to={"/org/member/"+org.orgName}  style={{ textDecoration: 'none' }}> {org.orgName}</TableCell>
                <TableCell component={Link} to={"/org/member/"+org.orgName}  style={{ textDecoration: 'none' }}>{org.conCnt}</TableCell>
                <TableCell>                  
                  <Button
                    value={org.orgName}
                    variant="contained"
                    color="secondary"
                    onClick={() => removeOrgContainer(org.orgName)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button variant="contained" color="primary" href="/create/org">
        조직추가
      </Button>
    </div>
  );
};

export default OrgList;
