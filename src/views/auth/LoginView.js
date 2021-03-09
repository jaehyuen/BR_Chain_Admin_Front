import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import ApiService from "../../service/ApiService";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
              userName: "",
              userId: "",
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .max(255)
                .required("Password is required"),
              userId: Yup.string()
                .max(255)
                .required("ID is required"),
            })}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);

              ApiService.loginUser(data)
                .then((result) => {
                  setSubmitting(false);
                  console.log(result.data);
                  alert(result.data.resultMessage);
                  if (result.data.resultFlag) {
                    removeCookie("accessToken");
                    removeCookie("refreshToken");
                    removeCookie("userId");

                    setCookie(
                      "accessToken",
                      result.data.resultData.accessToken,
                      { path: "/" }
                    );
                    setCookie(
                      "refreshToken",
                      result.data.resultData.refreshToken,
                      { path: "/" }
                    );
                    setCookie("userId", result.data.resultData.userId, {
                      path: "/",
                    });
                    navigate("/app/dashboard", { replace: true });
                  }
                })
                .catch((error) => {
                  setSubmitting(false);
                  if (error.response.status == 403) {
                    alert("아이디 또는 패스워드를 확인해주세요.");
                  }
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    로그인
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Box mt={3} mb={1}></Box>

                <TextField
                  error={Boolean(touched.userId && errors.userId)}
                  fullWidth
                  helperText={touched.userId && errors.userId}
                  label="ID"
                  margin="normal"
                  name="userId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.userId}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    로그인
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  계정이 없으신가요?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    회원가입
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
