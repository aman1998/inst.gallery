import { EInstagramType, IInstagramAccount, IInstagramDownloadedPost } from "@entities/Instagram/model/types";

export const image1 =
  "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
  "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17961912371761026/images/17961912371761026.jpg";

export const image2 =
  "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
  "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17901289809141795/images/17901289809141795.jpg";

export const image3 =
  "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
  "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17962889288864533/carousel/18086753704610757.jpg";

export const image4 = "/images/img4.jpg";

export const postDescription1 =
  "🌟 Turn Your Instagram Posts into a Stunning Gallery! 🌟\n" +
  "\n" +
  "🚀 Upload your Instagram posts and transform them into a beautiful, shareable gallery in just seconds!\n" +
  "\n" +
  "✨ Showcase your content, engage your audience, and grow your brand effortlessly.\n" +
  "\n" +
  "🔥 No coding required – just pure creativity! 🔥\n" +
  "\n" +
  "🔗 Try it now & let your content shine!\n" +
  "\n" +
  "#instgallery";

export const postDescription2 =
  "Turn your Instagram content into a professional website in just a few clicks.\n" +
  "\n" +
  '💻🌟 "Get started today and showcase your brand like never before!\n' +
  "\n" +
  "#instgallery";

export const postDescription3 =
  "No more limits on how you present your content! Our landing page builder " +
  "lets you bring your Instagram posts to life with unlimited design possibilities.";

export const postDescription4 =
  "Want a website that works as hard as you do? Our platform converts your Instagram " +
  "posts into custom landing pages – it's that simple. 🔥 #WebDesign";

export const postDescription5 =
  "Unlock the power of a personalized website. Customize, create, and launch a " +
  "landing page directly from your Instagram content. 📲✨";

export const postDescription6 =
  "It’s time to elevate your Instagram game! " +
  "Transform your posts into fully functional landing pages that represent your brand. Build yours now!";

export const postDescription7 =
  "From Instagram to website in minutes! 💡 Our easy-to-use platform " +
  "turns your posts into professional landing pages that capture your audience’s attention.";

export const postDescription8 =
  "Looking to grow your brand? With our platform, turning your " +
  "Instagram into a dynamic landing page is as easy as 1-2-3. Let’s build together!";

export const postDescription9 =
  "Create the landing page of your dreams by simply uploading your " +
  "Instagram posts. Perfect for influencers, creators, and brands. Try it out today!";

export const postDescription10 =
  "Want a website but don't have time to code? Our platform " +
  "lets you build a custom landing page from your Instagram posts without any hassle. 🚀 #WebDesignMadeEasy";

export const postDescription11 =
  "Create stunning landing pages with ease! 🚀 " +
  "Our platform lets you transform your Instagram posts into beautiful, functional websites. " +
  "Ready to build your brand?";

export const MOCK_INSTAGRAM_POSTS: IInstagramDownloadedPost[] = [
  {
    id: "17895695668004550",
    uuid: "17895695668004550",
    accountId: "17895695668004550",
    downloaded_id: "1",
    created_at: "2024-12-25T09:00:00+0000",
    caption: postDescription1,
    media_type: EInstagramType.IMAGE,
    media_url: image1,
    thumbnail_url: null,
    timestamp: "2024-12-25T09:00:00+0000",
    username: "ins.t.gallery",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
  },
  {
    id: "17895695668004551",
    uuid: "17895695668004551",
    accountId: "17895695668004550",
    downloaded_id: "2",
    created_at: "2024-12-25T09:00:00+0000",
    caption: postDescription2,
    media_type: EInstagramType.CAROUSEL_ALBUM,
    media_url: image3,
    thumbnail_url: null,
    timestamp: "2024-12-24T08:30:00+0000",
    username: "ins.t.gallery",
    permalink: "https://www.instagram.com/p/DHxr6ivMkXL/",
    children: {
      data: [
        {
          id: "18086753704610757",
          media_url:
            "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
            "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17962889288864533/carousel/18086753704610757.jpg",
          media_type: EInstagramType.IMAGE,
        },
        {
          id: "18047391956592357",
          media_url:
            "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
            "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17962889288864533/carousel/18047391956592357.jpg",
          media_type: EInstagramType.IMAGE,
        },
        {
          id: "18038421989241451",
          media_url:
            "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
            "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17962889288864533/carousel/18038421989241451.jpg",
          media_type: EInstagramType.IMAGE,
        },
        {
          id: "18056296210907077",
          media_url:
            "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
            "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17962889288864533/carousel/18056296210907077.jpg",
          media_type: EInstagramType.IMAGE,
        },
        {
          id: "18098901700522755",
          media_url:
            "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/" +
            "instagram-media/a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17962889288864533/carousel/18098901700522755.jpg",
          media_type: EInstagramType.IMAGE,
        },
        {
          id: "18494383099055885",
          media_url:
            "https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/" +
            "a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/17962889288864533/carousel/18494383099055885.jpg",
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
    caption: "Дорога в осень 🍂",
    media_type: EInstagramType.IMAGE,
    media_url: image3,
    thumbnail_url: null,
    timestamp: "2024-12-23T07:45:00+0000",
    username: "travel_journal",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
  },
  {
    id: "17895695668004554",
    uuid: "17895695668004554",
    accountId: "17895695668004550",
    downloaded_id: "4",
    created_at: "2024-12-25T09:00:00+0000",
    caption: "Завтрак чемпиона 🥞🍓",
    media_type: EInstagramType.IMAGE,
    media_url: image4,
    thumbnail_url: null,
    timestamp: "2024-12-21T09:00:00+0000",
    username: "foodies_unite",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
  },
  {
    id: "17895695668004555",
    uuid: "17895695668004555",
    accountId: "17895695668004550",
    downloaded_id: "5",
    created_at: "2024-12-25T09:00:00+0000",
    caption: "Гармония в каждой детали 🕊️",
    media_type: EInstagramType.CAROUSEL_ALBUM,
    thumbnail_url: null,
    timestamp: "2024-12-20T10:45:00+0000",
    username: "minimal_life",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
    children: {
      data: [
        {
          id: "17900000000000000",
          media_type: EInstagramType.IMAGE,
          media_url: image1,
        },
        {
          id: "17900000000000001",
          media_type: EInstagramType.IMAGE,
          media_url: image2,
        },
        {
          id: "17900000000000003",
          media_type: EInstagramType.IMAGE,
          media_url: image3,
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
    caption: "Горы зовут 🏔️",
    media_type: EInstagramType.IMAGE,
    media_url: image3,
    thumbnail_url: null,
    timestamp: "2024-12-19T11:00:00+0000",
    username: "mountain_lovers",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
  },
  {
    id: "17895695668004557",
    uuid: "17895695668004557",
    accountId: "17895695668004550",
    downloaded_id: "7",
    created_at: "2024-12-25T09:00:00+0000",
    caption: "Вечерняя прогулка 🌆",
    media_type: EInstagramType.IMAGE,
    media_url: image2,
    thumbnail_url: null,
    timestamp: "2024-12-18T18:30:00+0000",
    username: "urban_explorer",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
  },
  {
    id: "17895695668004558",
    uuid: "17895695668004558",
    accountId: "17895695668004550",
    downloaded_id: "8",
    created_at: "2024-12-25T09:00:00+0000",
    caption: "Свобода в каждом шаге 🐾",
    media_type: EInstagramType.IMAGE,
    media_url: image4,
    thumbnail_url: null,
    timestamp: "2024-12-17T09:30:00+0000",
    username: "wildlife_adventures",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
  },
  {
    id: "17895695668004559",
    uuid: "17895695668004559",
    accountId: "17895695668004550",
    downloaded_id: "9",
    created_at: "2024-12-25T09:00:00+0000",
    caption: "Пикник на природе 🧺",
    media_type: EInstagramType.IMAGE,
    media_url: image1,
    thumbnail_url: null,
    timestamp: "2024-12-16T13:00:00+0000",
    username: "picnic_lovers",
    permalink: "https://www.instagram.com/p/DHwTm0ms4gh/",
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
