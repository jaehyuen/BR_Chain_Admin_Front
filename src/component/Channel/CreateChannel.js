import React, { useState, useEffect } from "react";
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

import PeerOrgTranList from "./PeerOrgTranList";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
    //   position: "absolute",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateChannel = (props) => {
  const [ordererOrgs, setOrdererOrgs] = useState([]);
  const [orderingOrg, setOrderingOrg] = useState("");
  const [channelName, setChannelName] = useState("");
  const [peerOrgs, setPeerOrgs] = useState([]);

  useEffect(() => {
    ApiService.getOrgList("orderer").then((result) => {
      let ordererOrgs = [];
      let resultData = result.data.resultData;
      for (let i = 0; i < resultData.length; i++) {
        ordererOrgs.push(resultData[i].orgName);
      }

      setOrdererOrgs(ordererOrgs);
    });
  }, [setOrdererOrgs]);

  const onChangeChannelName = (e) => {
    setChannelName(e.target.value);
  };

  const onChangePeerOrgs = (value) => {
    setPeerOrgs(value);
  };

  const createChannel = async (e) => {
    e.preventDefault();

    if (peerOrgs.length === 0) {
      alert("가입할 조직 선택 ");
    }

    let data = {
      channelName: channelName,
      orderingOrg: orderingOrg,
      peerOrgs: peerOrgs,
    };
    props.loading(true);
    ApiService.createChannel(data).then((result) => {
      props.loading(false);

      alert(result.data.resultMessage);

      if (result.data.resultFlag) {
        props.history.push("/channel");
      }
    });
  };

  const orderingOrgChange = (event) => {
    setOrderingOrg(event.target.value);
  };

  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          채널 생성 테스트
        </Typography>

        <br />
        <form className={classes.form} onSubmit={createChannel}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="channelName"
                label="채널 명"
                name="channelName"
                onChange={onChangeChannelName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">
                  오더링 조직
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={orderingOrg}
                  className={classes.selectEmpty}
                  onChange={orderingOrgChange}
                >
                  {ordererOrgs.map((org, index) => (
                    <MenuItem value={org} key={index}>
                      {org}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <PeerOrgTranList
                onChangePeerOrgs={onChangePeerOrgs}
              ></PeerOrgTranList>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                채널 생성
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default CreateChannel;
