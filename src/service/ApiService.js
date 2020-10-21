import axios from "axios";

const BASE_URL = "http://localhost:8080/api/core";
// const BASE_URL = "http://192.168.65.169:8080/api/core";

class ApiService {
  async createOrg(data) {
    return await axios.post(BASE_URL + "/create/org", data);
  }

  async createChannel(data) {
    return await axios.post(BASE_URL + "/channel/create", data);
  }

  async installCc(data) {
    return await axios.post(BASE_URL + "/chaincode/install", data);
  }

  async activeCc(data) {
    return await axios.post(BASE_URL + "/chaincode/active", data);
  }



  async uploadCc(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return await axios.post(BASE_URL + "/chaincode/upload", data, config);
  }
  async removeContainers(id) {
    return await axios.get(BASE_URL + "/remove", {
      params: {
        conId: id,
      },
    });
  }
  async removeOrgContainers(orgName) {
    return await axios.get(BASE_URL + "/remove", {
      params: {
        orgName: orgName,
      },
    });
  }

  async getOrgList(type) {
    return await axios.get(BASE_URL + "/orgs", {
      params: {
        type: type,
      },
    });
  }

  getContainerList() {
    return axios.get(BASE_URL + "/containers");
  }
  getChannelList() {
    return axios.get(BASE_URL + "/channel/list");
  }
  getCcList() {
    return axios.get(BASE_URL + "/chaincode/list");
  }

  getChannelListPeerByConName(conName) {
    return axios.get(BASE_URL + "/channel/list", {
      params: {
        conName: conName,
      },
    });
  }

  getChannelListPeerByChannelName(channelName) {
    return axios.get(BASE_URL + "/channel/list", {
      params: {
        channelName: channelName,
      },
    });
  }

  getCcListChannel(channelName) {
    return axios.get(BASE_URL + "/chaincode/channel/list", {
      params: {
        channelName: channelName,
      },
    });
  }

  getCcListActiveInChannel(channelName) {
    return axios.get(BASE_URL + "/chaincode/active", {
      params: {
        channelName: channelName,
      },
    });
  }

  getCcListPeer(conName) {
    return axios.get(BASE_URL + "/chaincode/list", {
      params: {
        conName: conName,
      },
    });
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

  registerEventListener(channelName) {
    return axios.get(BASE_URL + "/channel/register", {
      params: {
        channelName: channelName,
      },
    });
  }
}


export default new ApiService();
