import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Test from '../../org/OrgListView/Test'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="OrgList"
    >
      <Container maxWidth="lg">
        {/* <Notifications /> */}
        <Box mt={3}>
          <Test />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
