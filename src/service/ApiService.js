import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = "http://192.168.65.169:8080/api/core";

class ApiService {

  async registerUser(data) {
    return axios.post(BASE_URL + "/auth/register", data);
  }

  async createOrg(data) {
    return await axios.post(BASE_URL + "/core/create/org", data);
  }

  async createChannel(data) {
    return await axios.post(BASE_URL + "/core/channel/create", data);
  }

  async installCc(data) {
    return await axios.post(BASE_URL + "/core/chaincode/install", data);
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
    return await axios.post(BASE_URL + "/core/chaincode/upload", data, config);
  }
  async removeContainers(id) {
    return await axios.get(BASE_URL + "/core/remove", {
      params: {
        conId: id,
      },
    });
  }
  async removeOrgContainers(orgName) {
    return await axios.get(BASE_URL + "/core/remove", {
      params: {
        orgName: orgName,
      },
    });
  }

  async updateAnchor(channelName,conName) {
    return await axios.get(BASE_URL + "/core/channel/anchor", {
      params: {
        channelName: channelName,
        conName: conName,
      },
    });
  }

  async getOrgList(type) {
    return await axios.get(BASE_URL + "/core/orgs", {
      params: {
        type: type,
      },
    });
  }

  getContainerList() {
    return axios.get(BASE_URL + "/core/containers");
  }
  getChannelList() {
    return axios.get(BASE_URL + "/core/channel/list");
  }
  getCcList() {
    return axios.get(BASE_URL + "/core/chaincode/list");
  }

  getChannelListByChannelName(channelName) {
    return axios.get(BASE_URL + "/core/channel/list", {
      params: {
        channelName: channelName,
      },
    });
  }

  getChannelListPeerByConName(conName) {
    return axios.get(BASE_URL + "/core/channel/list/peer", {
      params: {
        conName: conName,
      },
    });
  }

  getChannelListPeerByChannelName(channelName) {
    return axios.get(BASE_URL + "/core/channel/list/peer", {
      params: {
        channelName: channelName,
      },
    });
  }

  getCcListChannel(channelName) {
    return axios.get(BASE_URL + "/core/chaincode/channel/list", {
      params: {
        channelName: channelName,
      },
    });
  }

  getCcListActiveInChannel(channelName) {
    return axios.get(BASE_URL + "/core/chaincode/active", {
      params: {
        channelName: channelName,
      },
    });
  }

  getCcListPeer(conName) {
    return axios.get(BASE_URL + "/core/chaincode/list", {
      params: {
        conName: conName,
      },
    });
  }

  getMemberList(orgName) {
    return axios.get(BASE_URL + "/core/members", {
      params: {
        orgName: orgName,
      },
    });
  }

  getPortCheck(port) {
    return axios.get(BASE_URL + "/core/check/port", {
      params: {
        port: port,
      },
    });
  }

  registerEventListener(channelName) {
    return axios.get(BASE_URL + "/core/channel/register", {
      params: {
        channelName: channelName,
      },
    });
  }
}


export default new ApiService();
