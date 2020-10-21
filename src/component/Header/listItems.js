import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CodeIcon from '@material-ui/icons/Code';
import ComputerIcon from '@material-ui/icons/Computer';
import LayersIcon from '@material-ui/icons/Layers';


export const mainListItems = (
  <div>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/org">
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Org" />
    </ListItem>
    <ListItem button component="a" href="/channel">
      <ListItemIcon>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary="Channel" />
    </ListItem>
    <ListItem button  component="a" href="/chaincode"> 
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="Chaincode" />
    </ListItem>
    <ListItem button component="a" href="/container">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Container"  />
    </ListItem>
  </div>
);

