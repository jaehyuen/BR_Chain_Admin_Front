import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ApiService from "../../service/ApiService";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import useReactRouter from "use-react-router";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [ccName, setCcName] = useState("");
  const [ccLang, setCcLang] = useState("java");
  const [ccDesc, setCcDesc] = useState("");
  const [ccVersion, setCcVersion] = useState("");

  const [ccFile, setCcFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeCcLang = (e) => {
    setCcLang(e.target.value);
  };

  const uploadChaincode = (e) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("ccName", ccName);
    formData.append("ccLang", ccLang);
    formData.append("ccDesc", ccDesc);
    formData.append("ccFile", ccFile);
    formData.append("ccVersion", ccVersion);

    ApiService.uploadCc(formData).then((result) => {
      setIsLoading(false);

      alert(result.data.resultMessage);

      if (result.data.resultFlag) {
        navigate("/app/chaincode");
      }
    });
  };

  const onChangeCcName = (e) => {
    setCcName(e.target.value);
  };

  const onChangeCcDesc = (e) => {
    setCcDesc(e.target.value);
  };
  const onChangeCcVersion = (e) => {
    setCcVersion(e.target.value);
  };

  const onChangeCcFile = (e) => {
    //확장자 체크
    var src = getFileType(e.target.value);

    if (!(src.toLowerCase() == "zip")) {
      alert("zip 파일로 압축하여 첨부해주세요.");
      e.target.value=""
      return;
    }

    setCcFile(e.target.files[0]);
  };

  const getFileType = (filePath) => {
    var index = -1;
    index = filePath.lastIndexOf(".");

    var type = "";

    if (index != -1) {
      type = filePath.substring(index + 1, filePath.len);
    } else {
      type = "";
    }

    return type;
  };

  const classes = useStyles();

  return (
    <div>
      {isLoading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Page className={classes.root} title="OrgList">
          <Container maxWidth="lg">
            <Box mt={3}>
              <Container component="main">
                <CssBaseline />
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    체인코드 업로드 테스트
                  </Typography>

                  <br />
                  <form className={classes.form} onSubmit={uploadChaincode}>
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
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="ccVersion "
                          label="체인코드 버전"
                          name="ccVersion"
                          onChange={onChangeCcVersion}
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
            </Box>
          </Container>
        </Page>
      )}
    </div>
  );
};
export default UploadChaincode;
