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
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

// import MemberDetails from "./MemberDetails

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

import { useNavigate, useParams } from 'react-router-dom';

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [ccList, setCcList] = useState([]);

  const radioGroupRef = React.useRef(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    ApiService.getCcList().then((result) => {
      let ccList = [];
      let resultData = result.data.resultData;
      // for (let i = 0; i < resultData.length; i++) {
      //   ccList.push(resultData[i].ccName);
      // }

      // setCcList(ccList);
      setCcList(resultData)
    });
  }, []);

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
    
    setValue(ccList[event.target.value]);
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
        설치 가능한 체인코드 목록
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value.ccName + " : "+value.ccVersion}
          onChange={handleChange}
        >
          {ccList.map((option,index) => (
            <FormControlLabel
              value={index}
              key={index}
              control={<Radio />}
              label={option.ccName + " : "+option.ccVersion}
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

const MemberDetails = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [ccInfo, setCcInfo] = useState({});

  const [ccName, setCcName] = useState("");
  const [ccVersion, setCcVersion] = useState("");

  const [ccListPeer, setCcListPeer] = useState([]);
  const [channelListPeer, setChannelListPeer] = useState([]);
  
  const navigate = useNavigate();
  const conName=props.member.conName;

  useEffect(() => {
    ApiService.getCcListPeer(conName).then((result) => {
      setCcListPeer(result.data.resultData);
    });
  }, [conName]);

  useEffect(() => {
    ApiService.getChannelListPeerByConName(conName).then((result) => {
      setChannelListPeer(result.data.resultData);
    });
  }, [conName]);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setCcName(newValue.ccName);
      setCcVersion(newValue.ccVersion);
      setCcInfo(newValue)
    }
  };
  const onChangeCcVersion = (e) => {
    setCcVersion(e.target.value);
  };

  const installChaincode = (e) => {
    e.preventDefault();
    if (ccName.length === 0) {
      e.preventDefault();
      alert("설치할 체인코드 선택");
    }else{
    let data = {
      orgName: props.member.orgName,
      conNum: props.member.conNum,
      ccName: ccInfo.ccName,
      ccVersion: ccInfo.ccVersion,
      id:ccInfo.id
    };

    console.log(data);
    props.loading(true);
    
    ApiService.installCc(data).then((result) => {
      // props.loading(false);
      console.log(result.data);
      alert(result.data.resultMessage);
      // console.log('app/org/member/'+props.member.orgName);
      // navigate('/app/org/member/'+props.member.orgName);
      // if (!result.data.resultFlag) {
      // }
    });
  }
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>가입한 채널 목록</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>채널 이름</TableCell>
                  <TableCell>앵커피어 여부</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {channelListPeer.map((channelPeer, index) => (
                  <TableRow key={index} hover={true}>
                    <TableCell>{channelPeer.channelInfoDto.channelName}</TableCell>
                    <TableCell>{channelPeer.anchorYn.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            설치된 체인코드 목록
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>체인코드 이름</TableCell>
                  <TableCell>체인코드 버전</TableCell>
                  <TableCell>체인코드 언어</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {ccListPeer.map((ccPeer, index) => (
                  <TableRow key={index} hover={true}>
                    <TableCell>{ccPeer.ccInfoDto.ccName}</TableCell>
                    <TableCell>{ccPeer.ccVersion}</TableCell>
                    <TableCell>{ccPeer.ccInfoDto.ccLang}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>체인코드 설치</Typography>
        </AccordionSummary>
        <form className={classes.form} onSubmit={installChaincode}>
          <AccordionDetails>
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
                <ListItemText primary="설치할 체인코드" secondary={ccName+" : "+ccVersion} />
              </ListItem>
              {/* <ListItem role="listitem">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="ccVersion"
                  label="체인코드 버전"
                  name="ccVersion"
                  onChange={onChangeCcVersion}
                />
              </ListItem> */}
              <ListItem role="listitem">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  체인코드 설치
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
              />
            </List>
          </AccordionDetails>
        </form>
      </Accordion>
    </div>
  );
};
export default MemberDetails;