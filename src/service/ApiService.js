import axios from "axios";

const BASE_URL = "http://localhost:8080/api/core";

class ApiService {
  async createOrg(data) {
    return await axios.post(BASE_URL + "/create/org", data);
  }

  async createChannel(data){
    return await axios.post(BASE_URL+"/create/channel",data)
  }

  async removeContainers(id) {
    return await axios.get(BASE_URL + "/remove", {
      params: {
        conId: id,
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

  getPortCheck(port) {
    return axios.get(BASE_URL + "/check/port", {
      params: {
        port: port,
      },
    });
  }

  
}

export default new ApiService();
