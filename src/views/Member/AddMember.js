import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ApiService from "../../service/ApiService";

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conType: "",
      conPort: "",
      conNum: "",
      couchdbYn: false,
      portErr: false,
    };
  }

  componentDidMount() {
    this.setState({
      conType: this.props.conType,
      conNum: this.props.conNum,
    });
  }

  onChangePort = (e) => {
    e.preventDefault();

    this.setState(
      {
        conType: this.props.conType,
        conPort: e.target.value,
        conNum: this.props.conNum,
      },
      () => {
        this.props.onChanged(this.state);
      }
    );
  };

  onChangeCouch = (e) => {
    this.setState(
      {
        conType: this.props.conType,

        conNum: this.props.conNum,
        couchdbYn: e.target.checked,
      },
      () => {
        this.props.onChanged(this.state);
      }
    );
  };

  portCheck = async (port) => {
    await ApiService.getPortCheck(port).then((result) => {
      this.setState({
        portErr: !result.data.resultFlag,
      });
    });
  };

  render() {
    const conType = this.props.conType;
    const conNum = this.props.conNum;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            id="conNum"
            label="컨테이너 번호"
            name="conNum"
            defaultValue={conNum}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            required
            fullWidth
            type="number"
            id="conPort"
            label={conType + " 포트"}
            name="conPort"
            onChange={this.onChangePort}
            error={this.state.portErr}
            helperText={this.state.portErr ? "사용중인 포트입니다." : ""}
          />
        </Grid>
        {conType === "peer" && (
          <Grid item xs={12} sm={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  onChange={this.onChangeCouch}
                />
              }
              label="카우치 디비"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.portCheck(this.state.conPort);
            }}
          >
            포트 확인
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Member;