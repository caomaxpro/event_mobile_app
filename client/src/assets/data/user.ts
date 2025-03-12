import { User } from "@src/types/types";

export const Users: User[] = [
    {
      "username": "AdminMaster",
      "email": "admin@example.com",
      "profile_picture": "https://randomuser.me/api/portraits/women/57.jpg",
      "role": "admin",
      "bio": "Event organizer and tech enthusiast.",
      "phone_number": "+1234567890",
      "location": "San Francisco, CA",
      "social_links": {
        "facebook": "https://facebook.com/adminmaster",
        "github": "https://github.com/adminmaster"
      },
      "events_created": [],
      "events_joined": [],
      "join_date": new Date("2020-05-15T00:00:00Z"),
      "last_login": new Date("2025-03-05T12:00:00Z"),
      "account_status": "active",
      "is_verified": true,
      "subscription_plan": "premium",
      "payment_history": ["INV12345", "INV67890"]
    },
    {
      "username": "JohnDoe",
      "email": "johndoe@example.com",
      "profile_picture": "https://randomuser.me/api/portraits/men/46.jpg",
      "role": "user",
      "bio": "Aspiring developer and tech enthusiast.",
      "phone_number": "+1987654321",
      "location": "New York City, NY",
      "social_links": {
        "facebook": "https://facebook.com/johndoe",
        "github": "https://github.com/johndoe"
      },
      "events_created": [],
      "events_joined": [],
      "join_date": new Date("2023-03-10T00:00:00Z"),
      "last_login": new Date("2025-03-05T12:00:00Z"),
      "account_status": "active",
      "is_verified": true,
      "subscription_plan": "free",
      "payment_history": []
    },
    {
      "username": "EventGuru",
      "email": "eventguru@example.com",
      "profile_picture": "https://randomuser.me/api/portraits/men/17.jpg",
      "role": "admin",
      "bio": "Passionate about organizing unforgettable events.",
      "phone_number": "+1122334455",
      "location": "Los Angeles, CA",
      "social_links": {
        "facebook": "https://facebook.com/eventguru",
        "github": "https://github.com/eventguru"
      },
      "events_created": [],
      "events_joined": [],
      "join_date": new Date("2022-07-22T00:00:00Z"),
      "last_login": new Date("2025-03-05T12:00:00Z"),
      "account_status": "active",
      "is_verified": true,
      "subscription_plan": "premium",
      "payment_history": ["INV998877"]
    }
  ]




