import { request, ENDPOINT } from './request';

type Issue = {
  expand: string;
  id: string;
  self: string;
  key: string;
};

type SearchResult = {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
};

const JQL = {
  myIssuesRkap: 'resolution is EMPTY AND assignee = currentUser() ORDER BY priority DESC, created ASC',
};

async function search() {
  const jql = JQL.myIssuesRkap;

  const result = await request<SearchResult>({
    endpoint: `${ENDPOINT.SEARCH}`,
    queryString: `jql=${jql}`,
  });

  return result;
}

export default search;
