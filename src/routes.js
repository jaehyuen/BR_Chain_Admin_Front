import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';

import OrgList from 'src/views/Org/OrgList';
import CreateOrg from 'src/views/Org/CreateOrg';
import MemberList from "src/views/Member/MemberList";

import ChannelList from "src/views/Channel/ChannelList";
import CreateChannel from "src/views/Channel/CreateChannel";
import ChannelDetails from "src/views/Channel/ChannelDetails";
import ChannelUpdate from "src/views/Channel/ChannelUpdate";

import ChaincodeList from "src/views/Chaincode/ChaincodeList";
import UploadChaincode from "src/views/Chaincode/UploadChaincode";

import ContainerList from "src/views/Container/ContainerList";

import BlockList from "src/views/Block/BlockList";

import TxList from "src/views/Transaction/TxList";

const routes = [
  {
    path: 'app1',
    element: <DashboardLayout/>,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <ProductListView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'org', element: <OrgList /> },
      { path: 'org/member/:orgName', element: <MemberList /> },
      { path: 'channel', element: <ChannelList /> },
      { path: 'channel/:channelName', element: <ChannelDetails /> },
      { path: 'chaincode', element: <ChaincodeList /> },
      { path: 'container', element: <ContainerList /> },
      { path: 'create/org', element: <CreateOrg  /> },
      { path: 'create/channel', element: <CreateChannel  /> },
      { path: 'update/channel/:channelName', element: <ChannelUpdate  /> },
      { path: 'upload/chaincode', element: <UploadChaincode /> },
      { path: 'transaction', element: <TxList /> },
      { path: 'transaction/:txId', element: <TxList /> },
      { path: 'block', element: <BlockList /> },
      { path: 'block/:blockHash', element: <BlockList /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
