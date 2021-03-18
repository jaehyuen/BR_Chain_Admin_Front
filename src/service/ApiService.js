import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = "http://192.168.65.169:8080/api";
// const BASE_URL = "http://34.64.205.180:8080/api";
// const BASE_URL = "http://192.168.65.169:8080/api/core";

// axios.interceptors.request.use(function (config) {
//   const token = cookies.token
//   config.headers.Authorization =  token;

//   return config;
// });

axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = "Bearer " + getCookieValue("accessToken");
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const status = error.response.status;
    console.log(error)
    if (status == 401) {
      const accessToken = getCookieValue("accessToken");
      const refreshToken = getCookieValue("refreshToken");
      const userId = getCookieValue("userId");

      if (accessToken != " " && refreshToken != " " && userId != " ") {
        var data = {
          refreshToken: refreshToken,
          userId: userId,
        };

        axios.post(BASE_URL + "/auth/refresh", data).then((result) => {
          console.log(result.data);
          setCookieValue("accessToken", result.data.resultData.accessToken);
        });
      } else {
        document.location.href = "/login";
      }
    }
    console.log(error.response.status);
    return Promise.reject(error);
  }
);

const getCookieValue = (key) => {
  let cookieKey = key + "=";
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

function setCookieValue(name, value) {
  document.cookie = name + "=" + value + "; Path=/;";
}

export class ApiService {
  async registerUser(data) {
    return axios.post(BASE_URL + "/auth/register", data);
  }
  async loginUser(data) {
    return axios.post(BASE_URL + "/auth/login", data);
  }
  async logoutUser(data) {
    return axios.post(BASE_URL + "/auth/logout", data);
  }

  async createOrg(data) {
    return await axios.post(BASE_URL + "/core/org/create", data);
  }

  async createChannel(data) {
    return await axios.post(BASE_URL + "/core/channel/create", data);
  }

  async installCc(data) {
    return await axios.post(BASE_URL + "/core/chaincode/install", data);
  }

  async activeCc(data) {
    return await axios.post(BASE_URL + "/core/chaincode/active", data);
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

  async updateAnchor(channelName, conName) {
    return await axios.get(BASE_URL + "/core/channel/update/anchor", {
      params: {
        channelName: channelName,
        conName: conName,
      },
    });
  }

  async getOrgList(type) {
    return await axios.get(BASE_URL + "/core/org/list", {
      params: {
        type: type,
      },
    });
  }

  getContainerList() {
    return axios.get(BASE_URL + "/core/container/list");
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
    return axios.get(BASE_URL + "/core/chaincode/list/channel", {
      params: {
        channelName: channelName,
      },
    });
  }

  getCcListActiveInChannel(channelName) {
    return axios.get(BASE_URL + "/core/chaincode/list/toactive", {
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
    return axios.get(BASE_URL + "/core/member/list", {
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
