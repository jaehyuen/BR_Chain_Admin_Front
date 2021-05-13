import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const ContainerList = (props) => {
  const classes = useStyles();
  const [conList, setConList] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    ApiService.getContainerList().then((result) => {
      setConList(result.data.resultData);
      setNoOfPages(Math.ceil(result.data.resultData.length / 10));
      
    });
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const removeAllContainers = async () => {
    setIsLoading(true);

    await ApiService.removeContainers("").then((result) => {
      setIsLoading(false);

      ApiService.getContainerList().then((result2) => {
        setConList(result2.data.resultData);
        setNoOfPages(Math.ceil(result.data.resultData.length / 10));
      });
    });
  };

  const removeContainer = async (conId) => {
    console.log(this.props);
    setIsLoading(true);

    await ApiService.removeContainers(conId).then((result) => {
      ApiService.getContainerList().then((result2) => {
        setConList(result2.data.resultData);
        setNoOfPages(Math.ceil(result.data.resultData.length / 10));
      });
    });
  };

  const stringStyle = {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "200px",
    whiteSpace: "nowrap",
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <Page className={classes.root} title="Containers">
            <Container maxWidth="lg">
              <Typography component="h1" variant="h5">
                Container List
              </Typography>
              <Box mt={3}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Port</TableCell>
                        <TableCell>CreateTime</TableCell>
                        <TableCell>Status</TableCell>
                        {/* <TableCell></TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conList
                        .slice((page - 1) * 10, page * 10)
                        .map((org, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <LightTooltip title={org.conId}>
                                <div style={stringStyle}>{org.conId}</div>
                              </LightTooltip>
                            </TableCell>
                            <TableCell>
                              <LightTooltip title={org.conName.substring(1)}>
                                <div style={stringStyle}>
                                  {org.conName.substring(1)}
                                </div>
                              </LightTooltip>
                            </TableCell>
                            <TableCell>{org.conPort}</TableCell>
                            <TableCell>{org.conCreated}</TableCell>
                            <TableCell>{org.conStatus}</TableCell>
                            {/* <TableCell>
                          {" "}
                          <Button
                            value={org.conId}
                            variant="contained"
                            color="secondary"
                            onClick={() => this.removeContainer(org.conId)}
                          >
                            삭제
                          </Button>
                        </TableCell> */}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <Grid
                  justify="space-between" // Add it here :)
                  container
                >
                  <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />

                  <Button
                    // disabled
                    variant="contained"
                    color="secondary"
                    onClick={removeAllContainers}
                    startIcon={<DeleteIcon />}
                  >
                    전체삭제
                  </Button>
                </Grid>
              </Box>
            </Container>
          </Page>
        </div>
      )}
    </div>
  );
};

export default ContainerList;
