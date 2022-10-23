import { WikiSummaryResponse } from 'src/models/BackendAPI/Wiki/WikiSummary';
import API from './API';

export default {
  main_url: 'https://en.wikipedia.org/api/rest_v1/page/summary/',
  getPage(page: string) {
    return API(this.main_url).get('/' + page) as Promise<WikiSummaryResponse>;
  },
};

// https://en.wikipedia.org/api/rest_v1/page/summary/%20%22!%20(math)%22
