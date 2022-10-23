import { WikiDocResponse } from 'src/models/BackendAPI/Wiki/WikiDoc';
import API from './API';

export default {
  main_url: 'https://google-clone-backend-node.vercel.app/api/',
  getEverything() {
    return API(this.main_url).get('/wiki') as Promise<WikiDocResponse>;
  },
  search(match: string) {
    return API(this.main_url).post('/wiki/search/match', {
      text: match,
    }) as Promise<WikiDocResponse>;
  },
};
