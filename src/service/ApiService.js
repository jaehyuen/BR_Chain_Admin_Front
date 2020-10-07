import axios from "axios";

const BASE_URL = "http://localhost:8080/api/core";

class ApiService {
  async createOrg(data) {
    return await axios.post(BASE_URL + "/create/org", data);
  }

  async createChannel(data){
    return await axios.post(BASE_URL+"/create/channel",data)
  }

  async uploadCc(data){
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
    return await axios.post(BASE_URL+"/upload/chaincode",data,config)
  }
  async removeContainers(id) {
    return await axios.get(BASE_URL + "/remove", {
      params: {
        conId: id,
      },
    });
  }
  async removeOrgContainers(orgName){
    return await axios.get(BASE_URL + "/remove", {
      params: {
        orgName: orgName,
      },
    });
  }

  getOrgList(type) {
 
      return axios.get(BASE_URL + "/orgs", {
        params: {
          type: type,
        },
      });
   
  }

  getContainerList() {
    return axios.get(BASE_URL + "/containers");
  }
  getChannelList() {
    return axios.get(BASE_URL + "/channels");
  }
  getCcList() {
    return axios.get(BASE_URL + "/chaincodes");
  }

  getMemberList(orgName) {
    return axios.get(BASE_URL + "/members", {
      params: {
        orgName: orgName,
      },
    });
  }

  getPortCheck(port) {
    return axios.get(BASE_URL + "/check/port", {
      params: {
        port: port,
      },
    });
  }

  
}

export default new ApiService();
