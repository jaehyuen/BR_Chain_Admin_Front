import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';

import Popover from '@material-ui/core/Popover';
import MemberDetails from './MemberDetails';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MemberList = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});

  let { orgName } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ApiService.getMemberList(orgName).then(result =>
      setMemberList(result.data.resultData)
    );
  }, [props]);

  // useEffect(() => {
  //   setAnchorEl(null)
  // }, [selectedMember]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setLoadingStauts = value => {
    setIsLoading(value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      {isLoading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <Page className={classes.root} title="OrgList">
            <Container maxWidth="lg">
              <Typography component="h1" variant="h5">
                조직 상세정보
              </Typography>
              <Box mt={3}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>조직 이름</TableCell>
                        <TableCell>맴버 타입</TableCell>
                        <TableCell>컨테이너 번호</TableCell>
                        <TableCell>컨테이너 이름</TableCell>
                        <TableCell>컨테이너 포트</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {memberList.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell>{member.orgName}</TableCell>
                          <TableCell>{member.conType}</TableCell>
                          <TableCell>{member.conNum}</TableCell>
                          <TableCell>{member.conName}</TableCell>
                          <TableCell>{member.conPort}</TableCell>
                          <TableCell>
                            <Button
                              aria-describedby={id}
                              variant="contained"
                              color="primary"
                              onClick={event => {
                                setSelectedMember(member);
                                setAnchorEl(event.currentTarget);
                              }}
                            >
                              세부정보
                            </Button>
                            <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                              }}
                              style={{ shadows: ['none'] }}
                            >
                              {' '}
                              <MemberDetails
                                member={selectedMember}
                                loading={setLoadingStauts}
                              ></MemberDetails>
                            </Popover>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Container>
          </Page>
        </div>
      )}
    </div>
  );
};

export default MemberList;
