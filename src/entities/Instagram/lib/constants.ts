import { INSTAGRAM_URL } from "@/shared/config/appConfig";
import { EInstagramType, IInstagramAccount, IInstagramDownloadedPost } from "@entities/Instagram/model/types";

export const postDescription1 =
  "🌟 Create a Stunning Instagram-Style Portfolio! 🌟" +
  "\n\n" +
  "🚀 Upload your best photos and showcase them as beautiful, scrollable posts — just like on Instagram!" +
  "\n\n" +
  "✨ Perfect for creators, freelancers, and anyone who wants to impress with their work." +
  "\n\n" +
  "🔥 No coding, no hassle — just pure style and simplicity! 🔥" +
  "\n\n" +
  "🔗 Start building your portfolio today and let your visuals speak for you!" +
  "\n\n" +
  "#instgallery";

export const MOCK_INSTAGRAM_POSTS: IInstagramDownloadedPost[] = [
  {
    id: "17895695668004550",
    uuid: "17895695668004550",
    accountId: "17895695668004550",
    downloaded_id: "1",
    created_at: "2024-12-25T09:00:00+0000",
    caption: postDescription1,
    media_type: EInstagramType.IMAGE,
    media_url: "/logo.png",
    thumbnail_url: null,
    timestamp: "2024-12-25T09:00:00+0000",
    username: "ins.t.gallery",
    permalink: INSTAGRAM_URL,
  },
  {
    id: "17895695668004551",
    uuid: "17895695668004551",
    accountId: "17895695668004550",
    downloaded_id: "2",
    created_at: "2024-12-25T09:00:00+0000",
    caption:
      "✨ Less is more! Clean, elegant product shots with a focus on shape, texture, and simplicity." +
      "\n\n" +
      "Perfect for premium brands looking for a timeless feel.",
    media_type: EInstagramType.CAROUSEL_ALBUM,
    media_url: "/postsImages/image1.jpg",
    thumbnail_url: null,
    timestamp: "2024-12-24T08:30:00+0000",
    username: "Minimalist Photography",
    permalink: INSTAGRAM_URL,
    children: {
      data: [
        {
          id: "18047391956592357",
          media_url: "/postsImages/image1.jpg",
          media_type: EInstagramType.IMAGE,
        },
        {
          id: "18038421989241451",
          media_url: "/postsImages/image3.jpg",
          media_type: EInstagramType.IMAGE,
        },
      ],
    },
  },
  {
    id: "17895695668004552",
    uuid: "17895695668004552",
    accountId: "17895695668004550",
    downloaded_id: "3",
    created_at: "2024-12-25T09:00:00+0000",
    caption:
      "🏙️ Sleek lines, bold forms, and futuristic vibes. " +
      "\n\n" +
      "A visual journey through the world's most stunning modern architecture!",
    media_type: EInstagramType.IMAGE,
    media_url: "/postsImages/image4.jpg",
    thumbnail_url: null,
    timestamp: "2024-12-23T07:45:00+0000",
    username: "Modern Architecture Shots",
    permalink: INSTAGRAM_URL,
  },
  {
    id: "17895695668004554",
    uuid: "17895695668004554",
    accountId: "17895695668004550",
    downloaded_id: "4",
    created_at: "2024-12-25T09:00:00+0000",
    caption:
      "✨ Full-cycle photoshoot for a premium skincare line. " +
      "\n\n" +
      "The goal was to create clean, minimalist product photos highlighting texture and elegance for their new website launch and Instagram ads.",
    media_type: EInstagramType.IMAGE,
    media_url: "/postsImages/image5.jpg",
    thumbnail_url: null,
    timestamp: "2024-12-21T09:00:00+0000",
    username: "Product Photography for Luxury Skincare Brand",
    permalink: INSTAGRAM_URL,
  },
  {
    id: "17895695668004555",
    uuid: "17895695668004555",
    accountId: "17895695668004550",
    downloaded_id: "5",
    created_at: "2024-12-25T09:00:00+0000",
    caption:
      "🍋	🍉 🍌 Styled and photographed a range of artisanal desserts and drinks for a bakery’s new seasonal menu. " +
      "\n\n" +
      "Focused on vibrant, mouthwatering visuals for posters, website, and Uber Eats promos.",
    media_type: EInstagramType.CAROUSEL_ALBUM,
    thumbnail_url: null,
    timestamp: "2024-12-20T10:45:00+0000",
    username: " Food Photography for Boutique Bakery Menu Update",
    media_url: "/postsImages/image7.jpg",
    permalink: INSTAGRAM_URL,
    children: {
      data: [
        {
          id: "17900000000000000",
          media_type: EInstagramType.IMAGE,
          media_url: "/postsImages/image7.jpg",
        },
        {
          id: "17900000000000001",
          media_type: EInstagramType.IMAGE,
          media_url: "/postsImages/image8.jpg",
        },
        {
          id: "17900000000000002",
          media_type: EInstagramType.IMAGE,
          media_url: "/postsImages/image9.jpg",
        },
        {
          id: "17900000000000003",
          media_type: EInstagramType.IMAGE,
          media_url: "/postsImages/image10.jpg",
        },
      ],
    },
  },
  {
    id: "17895695668004556",
    uuid: "17895695668004556",
    accountId: "17895695668004550",
    downloaded_id: "6",
    created_at: "2024-12-25T09:00:00+0000",
    caption:
      "Dynamic on-the-go fashion portraits shot during City Fashion Week. " +
      "\n\n" +
      "The goal was to capture authentic street looks for blog features, press releases, and social media coverage.",
    media_type: EInstagramType.IMAGE,
    media_url: "/postsImages/image6.jpg",
    thumbnail_url: null,
    timestamp: "2024-12-19T11:00:00+0000",
    username: "Street Style Editorial for Local Fashion Week",
    permalink: INSTAGRAM_URL,
  },
];

export const MOCK_INSTAGRAM_ACCOUNT: IInstagramAccount = {
  username: "Test",
  id: "1",
  instagram_user_id: "1",
  account_id: "1",
  user_id: "1",
  profile_picture_url: "/images/ronaldo.jpg",
  created_at: "2024-12-25T09:00:00+0000",
};
