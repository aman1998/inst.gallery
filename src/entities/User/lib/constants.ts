import { TUser } from "@entities/User/model/types";

export const MOCK_USER: TUser = {
  id: "12345",
  app_metadata: {
    provider: "email",
    roles: ["user"],
  },
  user_metadata: {
    name: "John Doe",
    avatar_url: "https://example.com/avatar.jpg",
  },
  aud: "authenticated",
  email: "johndoe@example.com",
  phone: "+1234567890",
  created_at: "2025-03-28T12:00:00Z",
  confirmed_at: "2025-03-28T12:10:00Z",
  email_confirmed_at: "2025-03-28T12:10:00Z",
  last_sign_in_at: "2025-03-28T14:00:00Z",
  role: "user",
  updated_at: "2025-03-28T14:05:00Z",
  identities: [],
  is_anonymous: false,
  factors: [],
};
