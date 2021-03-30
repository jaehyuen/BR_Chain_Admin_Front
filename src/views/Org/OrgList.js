import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';

import { Box, Container, makeStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';

import Page from 'src/components/Page';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const OrgList = props => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [orgList, setOrgList] = useState([]);


  
  useEffect(() => {
    ApiService.getOrgList('').then(result =>
      setOrgList(result.data.resultData)
    );
  }, []);

  const removeOrgContainer = async orgName => {
    console.log(orgName);
    await ApiService.removeOrgContainers(orgName).then(result => {});
  };

  return (
    <div>
      <Page className={classes.root} title="Orgs">
        <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            조직 리스트
          </Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>조직 타입</TableCell>
                    <TableCell>조직 이름</TableCell>
                    <TableCell>조직 맴버 개수</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orgList.map((org, index) => (
                    <TableRow key={index}>
                      <TableCell>{org.orgType}</TableCell>
                      <TableCell> {org.orgName}</TableCell>
                      <TableCell>{org.conCnt}</TableCell>
                      <TableCell>
                        <Button
                          value={org.orgName}
                          variant="contained"
                          onClick={() =>
                            
                            
                            navigate('/app/org/member/' + org.orgName)
                          }
                        >
                          조직 상세 정보
                        </Button>
                      </TableCell>
                      <TableCell>
                        {' '}
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
            <Button variant="contained" color="primary" href="/app/create/org">
              조직추가
            </Button>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default OrgList;
