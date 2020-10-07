import React, { Component } from "react";
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

class ContainerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conList: [],
      noOfPages: 0,
      page: 1,
      isLoading: false,
    };
  }

  async componentDidMount() {
    let result = await ApiService.getContainerList();

    this.setState({
      conList: result.data.resultData,
      noOfPages: Math.ceil(result.data.length / 10),
    });
  }


  handleChange = (event, value) => {
    this.setState({
      page: value,
    });
  };

  removeAllContainers = async () => {
    this.setState({
      isLoading: true,
    });

    await ApiService.removeContainers("").then((result) => {
      this.setState({
        isLoading: false,
      });

      ApiService.getContainerList().then(result2 =>{
        this.setState({
          conList: result2.data.resultData,
          noOfPages: Math.ceil(result2.data.length / 10),
        });
      });
    });
  };

  removeContainer = async (conId) => {
    console.log(this.props)
    this.setState({
      isLoading: true,
    });

    await ApiService.removeContainers(conId).then((result) => {
      this.setState({
        isLoading: false,
      });

       ApiService.getContainerList().then(result2 =>{
        this.setState({
          conList: result2.data.resultData,
          noOfPages: Math.ceil(result2.data.length / 10),
        });
      });

    });
  };

  render() {
    const conList = this.state.conList;
    const noOfPages = this.state.noOfPages;
    const page = this.state.page;

    const stringStyle = {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100px",
      whiteSpace:"nowrap"
    };

    return (
      <div>
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>컨테이너 아이디</TableCell>
                    <TableCell>컨테이너 이름</TableCell>
                    <TableCell>컨테이너 포트</TableCell>
                    <TableCell>컨테이너 생성시간</TableCell>
                    <TableCell>컨테이너 상태</TableCell>
                    {/* <TableCell></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {conList.slice((page - 1) * 10, page * 10).map((org, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div style={stringStyle}>{org.conId}</div>
                        </TableCell>
                        <TableCell>{org.conName.substring(1)}</TableCell>
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
                onChange={this.handleChange}
                defaultPage={1}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={this.removeAllContainers}
                startIcon={<DeleteIcon />}
              >
                전체삭제
              </Button>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default ContainerList;
