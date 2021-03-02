import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import ApiService from "../../service/ApiService";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [ccList, setCcList] = useState([]);

  const radioGroupRef = React.useRef(null);
  const channelName=props.channelName;

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    ApiService.getCcListActiveInChannel(channelName).then((result) => {
      console.log(result.data.resultData);
      var arr1 = result.data.resultData;

      let uniqueJson = arr1.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return (
          index ===
          arr1.findIndex((obj) => {
            return JSON.stringify(obj) === _thing;
          })
        );
      });
    
      setCcList(uniqueJson);
    });
  }, [channelName]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    console.log(event.target);
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        활성화 가능한 체인코드 목록
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {ccList.map((list, index) => (
            <FormControlLabel
              // value={"이름 : "+list.ccName+" 버전 : "+list.ccVersion}
              value={list.ccName + "," + list.ccVersion + "," + list.ccLang}
              value1="test1"
              value2="test1"
              key={index}
              control={<Radio />}
              label={
                "이름 : " +
                list.ccName +
                " 버전 : " +
                list.ccVersion +
                " 언어 : " +
                list.ccLang
              }
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: "400px",
    minHeight: "400px",
    // shadows: ["none"],
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
}));

const ChaincodeListChannel = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ccName, setCcName] = useState("");


  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setCcName(newValue);
    }
  };

  const activeChaincode = (e) => {
    // e.preventDefault();
    if (ccName.length === 0) {
      e.preventDefault();
      alert("활성화할 체인코드 선택");
    }else{
    var arr = ccName.split(",");

    let data = {
      channelName: props.channelName,
      ccName: arr[0],
      ccVersion: arr[1],
      ccLang: arr[2],
    };
    console.log(data);

    props.loading(true);
    ApiService.activeCc(data).then((result) => {
      props.loading(false);
      console.log(result.data);
      alert(result.data.resultMessage);
      props.finish();
      if (!result.data.resultFlag) {
      }
    });
  }
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={activeChaincode}>
        <List component="div" role="list">
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="설치 가능한 체인코드"
            onClick={handleClickListItem}
            role="listitem"
          >
            <ListItemText primary="설치할 체인코드" secondary={ccName} />
          </ListItem>

          <ListItem role="listitem">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              체인코드 활성화
            </Button>
          </ListItem>

          <ConfirmationDialogRaw
            classes={{
              paper: classes.paper,
            }}
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            value={ccName}
            channelName={props.channelName}
          />
        </List>
      </form>
    </div>
  );
};
export default ChaincodeListChannel;
