import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

import { Box, Container, makeStyles } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";

import Page from "src/components/Page";
import { useNavigate } from "react-router-dom";

import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const OrgList = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [orgList, setOrgList] = useState([]);

  const [noOfPages, setNoOfPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    ApiService.getOrgList("").then((result) =>{
      setOrgList(result.data.resultData)
      setNoOfPages(Math.ceil(result.data.resultData.length / 10));}
    );
  }, []);

  const removeOrgContainer = async (orgName) => {
    console.log(orgName);
    await ApiService.removeOrgContainers(orgName).then((result) => {});
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Page className={classes.root} title="Orgs">
        <Container maxWidth="lg">
          <Typography component="h1" variant="h5">
            Organization List
          </Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orgList.slice((page - 1) * 10, page * 10).map((org, index) => (
                    <TableRow key={index}>
                      <TableCell>{org.orgType}</TableCell>
                      <TableCell> {org.orgName}</TableCell>
                      <TableCell>{org.conCnt}</TableCell>
                      <TableCell>
                        <Button
                          value={org.orgName}
                          variant="contained"
                          onClick={() =>
                            navigate("/app/org/member/" + org.orgName)
                          }
                        >
                          Organization Detail Info
                        </Button>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          disabled
                          value={org.orgName}
                          variant="contained"
                          color="secondary"
                          onClick={() => removeOrgContainer(org.orgName)}
                        >
                          Delete
                        </Button>
                      </TableCell>
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
              variant="contained"
              color="primary"
              href="/app/create/org"
              // disabled
            >
              Add Organization
            </Button>
            </Grid>
          </Box>
        </Container>
      </Page>
    </div>
  );
};

export default OrgList;
