import axios from 'axios';

export default (url: string) => {
  return axios.create({
    baseURL: url,
  });
};
