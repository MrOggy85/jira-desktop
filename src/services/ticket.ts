import { request, ENDPOINT } from './request';

type Comment = {
  self: string;
  id: string;
  author: {
    self: string;
    name: string;
    displayName: string;
    active: boolean;
  };
  body: string;
  updateAuthor: any;
  created: string;
  updated: string;
  visibility: {
      type: string;
      value: string;
  };
}

type TicketResponse = {
  id: string;
  key: string; // e.g. RKAP-1337
  self: string;
  fields: {
    watcher: any;
    attachment: any;
    'sub-tasks': any[];
    description: string;
    project: any;
    comment: Comment[];
    issuelinks: any[];
    worklog: any[];
    updated: string;
    created: string;
    timetracking: any;
    summary: string;
    assignee: Profile;
    creator: Profile;
    reporter: Profile;
    status: Status;
  };
}

type Profile = {
  displayName: string;
  emailAddress: string;
  name: string;
  active: boolean;
}

type Status = {
  id: string;
  key: string;
  name: string;
}

type Ticket = {
  id: string;
  key: string;
  summary: string;
  description: string;
  reporter: Profile;
  creator: Profile;
  assignee: Profile;
  status: Status;
  updated: Date;
  created: Date;
}

type Tickets = Record<Ticket['key'], Ticket>

const tickets: Tickets = {};

function mapResponseToTicket(ticket: TicketResponse) {
  return {
    id: ticket.id,
    key: ticket.key,
    summary: ticket.fields.summary,
    description: ticket.fields.description,
    reporter: ticket.fields.reporter,
    creator: ticket.fields.creator,
    assignee: ticket.fields.assignee,
    status: ticket.fields.status,
    updated: new Date(ticket.fields.updated.substr(0, 19)),
    created: new Date(ticket.fields.created.substr(0, 19)),
  };
}

export default async function getTicket(key: string) {
  if (tickets[key]) {
    return tickets[key];
  }

  const result = await request<TicketResponse>({
    endpoint: `${ENDPOINT.TICKET}/${key}`,
  });

  const ticket = mapResponseToTicket(result);

  tickets[key] = ticket;

  console.log('result', result);

  return ticket;
}
