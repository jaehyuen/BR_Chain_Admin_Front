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

const UploadChaincode = (props) => {
  const [ccName, setCcName] = useState("");
  const [ccLang, setCcLang] = useState("java");
  const [ccDesc, setCcDesc] = useState("");

  const [ccFile, setCcFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeCcLang = (e) => {
    setCcLang(e.target.value);
  };

  const uploadeCc = (e) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("ccName", ccName);
    formData.append("ccLang", ccLang);
    formData.append("ccDesc", ccDesc);
    formData.append("ccFile", ccFile);

    ApiService.uploadCc(formData).then((result) => {
      setIsLoading(false);

      alert(result.data.resultMessage);

      if (result.data.resultFlag) {
        props.history.push("/chaincode");
      }
    });
  };

  const onChangeCcName = (e) => {
    setCcName(e.target.value);
  };

  const onChangeCcDesc = (e) => {
    setCcDesc(e.target.value);
  };

  const onChangeCcFile = (e) => {
    setCcFile(e.target.files[0]);
  };

  const classes = useStyles();

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
              체인코드 업로드 테스트
            </Typography>

            <br />
            <form className={classes.form} onSubmit={uploadeCc}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="ccName"
                    label="체인코드명"
                    name="ccName"
                    onChange={onChangeCcName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="demo-simple-select-required-label">
                      체인코드 언어
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      //   value={orderingOrg}
                      className={classes.selectEmpty}
                      onChange={onChangeCcLang}
                    >
                      <MenuItem value="java">JAVA</MenuItem>
                      <MenuItem value="js">NODEJS</MenuItem>
                      <MenuItem value="go">GOLANG</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="체인코드 설명"
                    multiline
                    fullWidth
                    rows={4}
                    placeholder="체인코드 설명"
                    variant="outlined"
                    onChange={onChangeCcDesc}
                    helperText={ccDesc.length + "/255"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="ccName"
                    name="ccName"
                    type="file"
                    onChange={onChangeCcFile}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    required
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    체인코드 업로드
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
export default UploadChaincode;
