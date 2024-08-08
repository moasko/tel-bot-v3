const axios = require("axios");

const TELEGRAM_TOKEN = "7176647835:AAF_CPoNWP74gnAPuikjdet4eqvkMa-3HFE";
const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const getAxiosInstance = () => {
  return {
    get(method, params) {
      return axios.get(`/${method}`, {
        baseURL: BASE_URL,
        params,
      });
    },
    post(method, data) {
      return axios({
        method: "post",
        baseURL: BASE_URL,
        url: `/${method}`,
        data,
      });
    },
  };
};

module.exports = { axiosInstance: getAxiosInstance() };
