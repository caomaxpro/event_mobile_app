export type User = {
  username: string;
  email: string;
  profile_picture?: string;
  role: 'admin' | 'user';
  bio?: string;
  phone_number?: string;
  location?: string;
  social_links?: {
    facebook?: string;
    github?: string;
  };
  events_created: Event[];
  events_joined: Event[];
  join_date: string;
  last_login?: string;
  account_status: 'active' | 'inactive';
  is_verified: boolean;
  subscription_plan: 'free' | 'premium';
  payment_history: string[];
};

type EventSchedule = {
  time: string;
  activity: string;
};

export type Event = {
  title: string;
  description: string;
  creation_date: string;
  event_date: string;
  total_tickets: number;
  discounted_tickets: number;
  price: number;
  location: string;
  participants: User[];
  organizer: User;
  event_status: 'active' | 'inactive';
  event_type: string;
  event_tags: string[];
  event_image: string;
  registration_deadline: string;
  event_schedule: EventSchedule[];
  address: string;
  ticket_sales_end_date: string;
};