import React from "react";
// import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";


import CreateOrg from "./component/CreateOrg";
import CreateChannel from "./component/Channel/CreateChannel";
// import OrgTest from "./component/CreateOrg";
import OrgList from "./component/Org/OrgList";
import ChannelList from "./component/Channel/ChannelList";
import ContainerList from "./component/Container/ContainerList";

import Dashboard from "./component/Dashboard/Dashboard";



function App(props) {
  
  return (
    <Router>
      <div>
      <Switch>
        <Route exact path="/org" render={(props) => <Dashboard {...props} component={OrgList} />} />
        <Route exact path="/create/org"render={(props) => <Dashboard {...props} component={CreateOrg} />} />

        <Route exact path="/channel" render={(props) => <Dashboard {...props} component={ChannelList} />} />
        <Route exact path="/chaincode" render={(props) => <Dashboard {...props}  component={CreateOrg} />} />
        <Route exact path="/container" render={(props) => <Dashboard {...props} component={ContainerList} />} />

        <Route exact path="/create/channel" render={(props) => <Dashboard {...props} component={CreateChannel} />} />
        <Route exact path="/"   component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
