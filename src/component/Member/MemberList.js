import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";


import Popover from "@material-ui/core/Popover";
import MemberDetails from "./MemberDetails";



const MemberList = (props) => {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [memberList, setMemberList] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});
  
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    

    ApiService.getMemberList(props.match.params.orgName).then((result) =>
      
      setMemberList(result.data.resultData)
    );

    
  }, [props]);



  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Typography component="h1" variant="h5">
        조직 상세정보
      </Typography>
      <br></br>
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
                <TableCell>{member.orgType}</TableCell>
                <TableCell>{member.conNum}</TableCell>
                <TableCell>{member.conName}</TableCell>
                <TableCell>{member.conPort}</TableCell>
                <TableCell>
                  <Button
                    aria-describedby={id}
                    variant="contained"
                    color="primary"
                    value="zz"
                    // onClick={()=>{test("z")},handleClick}
                    onClick={(event)=>{
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
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    style={{ shadows: ["none"]}}
                  > <MemberDetails member={selectedMember}></MemberDetails>                   
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
    </div>
  );
};

export default MemberList;
