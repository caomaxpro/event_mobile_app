import { Event } from "@src/types/types";
import { Users } from "./user";

export const Events: Event[] = [
    {
      title: "Tech Conference 2025",
      description: "A gathering of technology enthusiasts, developers, and industry leaders discussing the latest trends in AI, Web3, and cloud computing.",
      creation_date: new Date("2025-01-10T00:00:00Z").toISOString(),
      event_date: new Date("2025-06-15T09:00:00Z").toISOString(),
      total_tickets: 500,
      discounted_tickets: 100,
      price: 150,
      location: "San Francisco, CA",
      participants: [],
      organizer: Users[0],
      event_status: "active",
      event_type: "Conference",
      event_tags: ["Tech", "AI", "Web3"],
      event_image: "https://example.com/tech-conference.jpg",
      registration_deadline: new Date("2025-06-01T00:00:00Z").toISOString(),
      event_schedule: [
        { time: new Date("2025-06-15T09:00:00Z").toISOString(), activity: "Opening Keynote" },
        { time: new Date("2025-06-15T10:30:00Z").toISOString(), activity: "Panel Discussion: AI & Ethics" }
      ],
      address: "123 Main St, San Francisco, CA",
      ticket_sales_end_date: new Date("2025-06-10T00:00:00Z").toISOString()
    },
    {
      title: "Music Festival Summer Jam",
      description: "An electrifying music festival featuring top artists from around the world, food stalls, and fun activities.",
      creation_date: new Date("2024-12-20T00:00:00Z").toISOString(),
      event_date: new Date("2025-08-05T15:00:00Z").toISOString(),
      total_tickets: 10000,
      discounted_tickets: 2000,
      price: 75,
      location: "Miami Beach, FL",
      participants: [],
      organizer: Users[0],
      event_status: "active",
      event_type: "Festival",
      event_tags: ["Music", "Live", "Festival"],
      event_image: "https://example.com/music-festival.jpg",
      registration_deadline: new Date("2025-07-20T00:00:00Z").toISOString(),
      event_schedule: [
        { time: new Date("2025-08-05T15:00:00Z").toISOString(), activity: "DJ Set by XYZ" },
        { time: new Date("2025-08-05T18:00:00Z").toISOString(), activity: "Live Performance by ABC Band" }
      ],
      address: "Ocean Drive, Miami Beach, FL",
      ticket_sales_end_date: new Date("2025-07-31T00:00:00Z").toISOString()
    },
    {
      title: "Startup Pitch Night",
      description: "An event for aspiring entrepreneurs to pitch their ideas to investors and network with like-minded innovators.",
      creation_date: new Date("2025-02-10T00:00:00Z").toISOString(),
      event_date: new Date("2025-04-20T18:00:00Z").toISOString(),
      total_tickets: 200,
      discounted_tickets: 50,
      price: 25,
      location: "New York City, NY",
      participants: [],
      organizer: Users[0],
      event_status: "active",
      event_type: "Networking",
      event_tags: ["Startup", "Entrepreneurship", "Pitching"],
      event_image: "https://example.com/startup-pitch.jpg",
      registration_deadline: new Date("2025-04-10T00:00:00Z").toISOString(),
      event_schedule: [
        { time: new Date("2025-04-20T18:00:00Z").toISOString(), activity: "Welcome & Introductions" },
        { time: new Date("2025-04-20T19:00:00Z").toISOString(), activity: "Startup Pitch Session" }
      ],
      address: "456 Innovation Hub, NYC",
      ticket_sales_end_date: new Date("2025-04-15T00:00:00Z").toISOString()
    }
];