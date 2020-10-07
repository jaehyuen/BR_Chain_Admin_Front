import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ApiService from "../../service/ApiService";
import AddMember from "./AddMember";

const CreateOrg = (props) => {
  const [orgType, setOrgType] = useState("");
  const [conCnt, setConCnt] = useState("");
  const [members, setMembers] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [caPort, setCaPort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [portErr, setPortErr] = useState(false);

  const onChangePort = (member) => {
    setMembers(
      members.map((item) =>
        item.conNum === member.conNum
          ? { ...item, conPort: member.conPort, couchdbYn: member.couchdbYn }
          : item
      )
    );
  };

  const onChangeOrgName = (e) => {
    console.log(e.target.value);
    setOrgName(e.target.value);

    setMembers(
      members.map((member) => ({
        ...member,
        orgName: e.target.value,
      }))
    );
  };

  const addMember = () => {
    setConCnt(members.length);
    members.push({
      orgName: orgName,
      orgType: orgType,
      conType: orgType,
      conNum: members.length,
    });
  };

  const onChangeOrgType = (value) => {
    setOrgType(value);
    setMembers(
      members.map((member) =>
        value === "orderer"
          ? {
              ...member,
              conType: value,
              orgType: value,
              couchdbYn: false,
            }
          : {
              ...member,
              conType: value,
              orgType: value,
            }
      )
    );
  };

  const createOrg = async (e) => {
    e.preventDefault();
    
    if(orgType === "") {
      alert("조직타입 선택해야함")
      return null;
    }
    

    const data = members.slice();

    const caJson = {
      orgName: orgName,
      orgType: orgType,
      conType: "ca",
      conPort: caPort,
      conCnt: conCnt + 1,
    };

    data.unshift(caJson);
    setIsLoading(true);

    await ApiService.createOrg(data).then((result) => {
      setIsLoading(false);

      alert(result.data.resultMessage);

      if (result.data.resultFlag) {
        props.history.push("/org");
      }
    });
  };

  const onChangeCaPort = (e) => {
    setCaPort(e.target.value);
  };
  const portCheck = async (port) => {
    await ApiService.getPortCheck(port).then((result) => {
      console.log(result.data.resultFlag);
      setPortErr(!result.data.resultFlag);
    });
  };

  const classes = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  return (
    <div>
      {isLoading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {orgType} 조직생성 테스트
            </Typography>
            <br />
            조직 타입
            <br />
            <br />
            <form className={classes.form} onSubmit={createOrg}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => onChangeOrgType("peer")}
                  >
                    Peer
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => onChangeOrgType("orderer")}
                  >
                    Orderer
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="orgName"
                    label="조직 명"
                    name="orgName"
                    onChange={onChangeOrgName}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    name="conType"
                    variant="outlined"
                    fullWidth
                    id="conType"
                    label="컨테이너 타입"
                    defaultValue="Ca"
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={5}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    id="caPort"
                    label="ca 포트"
                    name="caPort"
                    onChange={onChangeCaPort}
                    error={portErr}
                    helperText={portErr ? "사용중인 포트입니다." : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => portCheck(caPort)}
                  >
                    포트 확인
                  </Button>
                </Grid>
                {members.map((data, index) => (
                  <Grid item xs={12} key={index}>
                    <AddMember
                      onChanged={onChangePort}
                      conType={orgType}
                      conNum={data.conNum}
                      key={index}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  {orgType !== "" && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={addMember}
                    >
                      {orgType} 추가
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                  >
                    조직 생성
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </div>
  );
};
export default CreateOrg;
