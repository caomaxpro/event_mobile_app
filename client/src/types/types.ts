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
  events_created: Partial<Event>[];
  events_joined: Partial<Event>[];
  join_date: string;
  last_login?: string;
  account_status: 'active' | 'inactive';
  is_verified: boolean;
  subscription_plan: 'free' | 'premium';
  payment_history: string[];
};

export type Event = {
  title: string;
  description?: string;
  creation_date: string;
  start_time: string;
  end_time: string;
  total_tickets: number;
  total_discount_tickets: number;
  discounted_value: number;
  price: number;
  price_after_tax: number;
  participants: Partial<User>[];
  organizer?: Partial<User>;
  status: 'active' | 'inactive';
  type: string;
  tags: string[];
  image: string;
  address: string;
};

export type ValidationResult = {
  message: string;
  isValid: boolean;
};

export interface InputField {
  value: string;
  touched: boolean;
  onChange: (value: string) => void;
  validate: () => ValidationResult[];
}
