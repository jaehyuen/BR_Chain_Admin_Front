import React from "react";
// import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import OrgList from "./component/Org/OrgList";
import CreateOrg from "./component/Org/CreateOrg";
import MemberList from "./component/Member/MemberList";

import ChannelList from "./component/Channel/ChannelList";
import CreateChannel from "./component/Channel/CreateChannel";
import ChannelDetails from "./component/Channel/ChannelDetails";

import ChaincodeList from "./component/Chaincode/ChaincodeList";
import UploadChaincode from "./component/Chaincode/UploadChaincode";

import ContainerList from "./component/Container/ContainerList";

import Header from "./component/Header/Header";

import Dashboard from "./component/Dashboard/Dashboard";



function App(props) {
  
  return (
    <Router>
      <div>
      <Switch>
        <Route exact path="/org" render={(props) => <Header {...props} component={OrgList} />} />
        <Route exact path="/org/member/:orgName" render={(props) => <Header {...props} component={MemberList} />} />
        <Route exact path="/channel" render={(props) => <Header {...props} component={ChannelList} />} />
        <Route exact path="/channel/:channelName" render={(props) => <Header {...props} component={ChannelDetails} />} />
        <Route exact path="/chaincode" render={(props) => <Header {...props}  component={ChaincodeList} />} />
        <Route exact path="/container" render={(props) => <Header {...props} component={ContainerList} />} />

        <Route exact path="/create/org"render={(props) => <Header {...props} component={CreateOrg} />} />
        <Route exact path="/create/channel" render={(props) => <Header {...props} component={CreateChannel} />} />

        <Route exact path="/upload/chaincode"render={(props) => <Header {...props} component={UploadChaincode} />} />
        
        
        <Route exact path="/"   render={(props) => <Header {...props} component={Dashboard} />}  />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
