import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import ApiService from "../../service/ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              userEmail: "",
              userPassword: "",
              userId: "",
              userName: "",
            }}
            validationSchema={Yup.object().shape({
              userEmail: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              userName: Yup.string()
                .max(255)
                .required("Name is required"),
              userId: Yup.string()
                .max(255)
                .required("ID is required"),
                userPassword: Yup.string()
                .max(255)
                .required("password is required"),
            })}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);

              ApiService.registerUser(data).then((result) => {
                setSubmitting(false);
                alert(result.data.resultMessage);
                if (result.data.resultFlag) {
                  navigate("/login", { replace: true });
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
                    회원 가입
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.userId && errors.userId)}
                  fullWidth
                  helperText={touched.userId && errors.userId}
                  label="ID"
                  margin="normal"
                  name="userId"
                  onBlur={(e) => {
                    // call the built-in handleBur
                    handleBlur(e);
                    // and do something about e
                    console.log(e.currentTarget.value);
                  }}
                  onChange={handleChange}
                  type="text"
                  value={values.userId}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="Name"
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.userName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.userEmail && errors.userEmail)}
                  fullWidth
                  helperText={touched.userEmail && errors.userEmail}
                  label="Email Address"
                  margin="normal"
                  name="userEmail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.userEmail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.userPassword && errors.userPassword)}
                  fullWidth
                  helperText={touched.userPassword && errors.userPassword}
                  label="Password"
                  margin="normal"
                  name="userPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.userPassword}
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
                    회원가입
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
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

export default RegisterView;
