import { isDemoMode } from "../config";

const demoStorageKey = "studentbook-demo-state";

const now = "2026-06-13 10:00:00";

export const demoCredentials = {
  user_name: "demo",
  user_password: "demo123",
};

const demoUser = {
  id: 1,
  user_name: "demo",
  user_fullname: "Demo Student",
  user_occ: "Computer Science Student",
  user_email: "demo@studentbook.local",
  user_city: "Dhaka",
  user_website: "studentbook-demo.github.io",
  user_cal: "https://calendly.com/",
  user_profile_img: "1693166576309pexels-pixabay-220453.jpg",
  user_cover_img: "1693163601872pexels-lina-kivaka-16550526.jpg",
};

const seedState = {
  users: [
    {
      ...demoUser,
      student_cgpa: "3.92",
    },
    {
      id: 2,
      user_name: "israt",
      user_fullname: "Israt Jahan Khan",
      user_occ: "Faculty Advisor",
      user_email: "israt@studentbook.local",
      user_city: "Dhaka",
      user_website: "uiu.ac.bd",
      user_cal: "https://calendly.com/",
      user_profile_img: "1693167779669pexels-arianna-jadÃ©-2896853.jpg",
      user_cover_img: "1693166075107pexels-kamizzle-15666462.jpg",
      student_cgpa: "3.85",
    },
    {
      id: 3,
      user_name: "mou",
      user_fullname: "Sadia Afrin Mou",
      user_occ: "Alumni Mentor",
      user_email: "mou@studentbook.local",
      user_city: "Dhaka",
      user_website: "linkedin.com",
      user_cal: "https://calendly.com/",
      user_profile_img: "16931956846021693166237794329901150_5732024393591687_3590245626934702253_n.jpg",
      user_cover_img: "1693195684537pexels-michael-block-3225517.jpg",
      student_cgpa: "3.74",
    },
  ],
  posts: [
    {
      post_id: 101,
      user_id: 1,
      user_fullname: "Demo Student",
      user_profile_img: "1693166576309pexels-pixabay-220453.jpg",
      post_desc:
        "Exploring StudentBook in static demo mode. Posts, likes, comments, articles, jobs, and announcements are stored only in this browser.",
      img: "1693163601886pexels-daka-17813826.jpg",
      post_creation_time: now,
    },
    {
      post_id: 102,
      user_id: 2,
      user_fullname: "Israt Jahan Khan",
      user_profile_img: "1693167779669pexels-arianna-jadÃ©-2896853.jpg",
      post_desc:
        "Research presentation slots are open this week. Please share your abstract before the department review deadline.",
      img: "",
      post_creation_time: "2026-06-12 14:30:00",
    },
    {
      post_id: 103,
      user_id: 3,
      user_fullname: "Sadia Afrin Mou",
      user_profile_img:
        "16931956846021693166237794329901150_5732024393591687_3590245626934702253_n.jpg",
      post_desc:
        "Career prep note: keep one resume version for campus roles and another for product/startup applications.",
      img: "1693204084434pexels-kasuma-1785493.jpg",
      post_creation_time: "2026-06-11 19:15:00",
    },
  ],
  likes: {
    101: [2, 3],
    102: [1],
    103: [1, 2],
  },
  comments: {
    101: [
      {
        comment_id: 201,
        post_id: 101,
        user_name: "israt",
        user_profile_img: "1693167779669pexels-arianna-jadÃ©-2896853.jpg",
        comment_desc: "This is ready for a quick GitHub Pages walkthrough.",
        comment_creation_time: now,
      },
    ],
    102: [],
    103: [],
  },
  relationships: {
    2: [1],
    3: [],
  },
  articles: [
    {
      article_id: 301,
      article_title: "How to Prepare a Research Summary",
      article_content:
        "Start with the problem, explain your method in plain language, and close with what changed after the work.",
      article_creation_time: "2026-06-12",
      user_fullname: "Israt Jahan Khan",
      user_profile_img: "1693167779669pexels-arianna-jadÃ©-2896853.jpg",
    },
  ],
  jobs: [
    {
      job_id: 401,
      job_provider_user_name: "Sadia Afrin Mou",
      job_provider_company_name: "Campus Career Lab",
      job_provider_company_website: "https://example.com",
      job_provider_company_email: "careers@example.com",
      job_description: "Frontend internship focused on React dashboards and accessibility improvements.",
      job_requirement: "React basics, Git workflow, and clear written communication.",
      job_salary: "BDT 20,000 - 30,000",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      user_profile_img:
        "16931956846021693166237794329901150_5732024393591687_3590245626934702253_n.jpg",
      job_creation_time: "2026-06-12",
    },
  ],
  announcements: [
    {
      announcement_id: 501,
      announcement_title: "Static Demo Mode",
      announcement_content:
        "This GitHub Pages build does not connect to MySQL or the Express API. Changes are saved in local browser storage only.",
      announcement_creation_time: "2026-06-13",
      user_fullname: "Demo Student",
      user_profile_img: "1693166576309pexels-pixabay-220453.jpg",
    },
  ],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const readState = () => {
  if (!isDemoMode) return null;

  try {
    const savedState = localStorage.getItem(demoStorageKey);
    return savedState ? JSON.parse(savedState) : clone(seedState);
  } catch {
    return clone(seedState);
  }
};

const writeState = (state) => {
  localStorage.setItem(demoStorageKey, JSON.stringify(state));
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || demoUser;
  } catch {
    return demoUser;
  }
};

const response = (data = null) => Promise.resolve({ data });

const nextId = (items, key) =>
  Math.max(0, ...items.map((item) => Number(item[key]) || 0)) + 1;

const withAuthor = (item) => {
  const currentUser = getCurrentUser();
  return {
    ...item,
    user_fullname: currentUser.user_fullname,
    user_profile_img: currentUser.user_profile_img,
  };
};

const byNewest = (key) => (a, b) => Number(b[key]) - Number(a[key]);

const parseQuery = (url) => new URL(url, "https://studentbook.local").searchParams;

export const demoAuth = {
  user: demoUser,
  async login(inputs) {
    const state = readState();
    const username = inputs?.user_name?.trim().toLowerCase();
    const user =
      state.users.find((item) => item.user_name.toLowerCase() === username) ||
      state.users[0];

    return response(user);
  },
};

export const demoRequest = {
  async get(url) {
    const state = readState();

    if (url.startsWith("/posts")) {
      const userId = Number(parseQuery(url).get("userId"));
      const posts = userId
        ? state.posts.filter((post) => post.user_id === userId)
        : state.posts;
      return response([...posts].sort(byNewest("post_id")));
    }

    if (url.startsWith("/likes")) {
      const postId = parseQuery(url).get("post_id");
      return response(state.likes[postId] || []);
    }

    if (url.startsWith("/comments")) {
      const postId = parseQuery(url).get("post_id");
      return response(state.comments[postId] || []);
    }

    if (url.startsWith("/users/find/")) {
      const userId = Number(url.split("/").pop());
      return response(state.users.find((user) => user.id === userId) || state.users[0]);
    }

    if (url.startsWith("/relationships")) {
      const followedUserId = parseQuery(url).get("followeduserid");
      return response(state.relationships[followedUserId] || []);
    }

    if (url === "/articles/get-all-articles") {
      return response([...state.articles].sort(byNewest("article_id")));
    }

    if (url === "/jobs/get-all-jobs") {
      return response([...state.jobs].sort(byNewest("job_id")));
    }

    if (url === "/announcements/get-all-announcements") {
      return response([...state.announcements].sort(byNewest("announcement_id")));
    }

    if (url.startsWith("/searches/")) {
      const search = decodeURIComponent(url.split("/").pop()).toLowerCase();
      return response(
        state.users.filter((user) =>
          [user.user_fullname, user.user_name, user.student_cgpa]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(search))
        )
      );
    }

    return response(null);
  },

  async post(url, body) {
    const state = readState();
    const currentUser = getCurrentUser();

    if (url === "/auth/logout") return response({ ok: true });

    if (url === "/auth/register") {
      const nextUser = {
        id: nextId(state.users, "id"),
        user_name: body.user_name,
        user_fullname: body.user_fullname,
        user_occ: body.user_occ,
        user_email: body.user_email,
        user_city: "Dhaka",
        user_website: "studentbook-demo.github.io",
        user_cal: "https://calendly.com/",
        user_profile_img: "1693166576309pexels-pixabay-220453.jpg",
        user_cover_img: "1693163601872pexels-lina-kivaka-16550526.jpg",
        student_cgpa: "",
      };
      state.users.push(nextUser);
      writeState(state);
      return response(nextUser);
    }

    if (url === "/upload") return response("");

    if (url === "/posts") {
      state.posts.push(
        withAuthor({
          post_id: nextId(state.posts, "post_id"),
          user_id: currentUser.id,
          post_desc: body.post_desc,
          img: body.img || "",
          post_creation_time: now,
        })
      );
    }

    if (url === "/comments") {
      const postId = String(body.post_id);
      state.comments[postId] = state.comments[postId] || [];
      state.comments[postId].push({
        comment_id: nextId(Object.values(state.comments).flat(), "comment_id"),
        post_id: body.post_id,
        user_name: currentUser.user_name,
        user_profile_img: currentUser.user_profile_img,
        comment_desc: body.comment_desc,
        comment_creation_time: now,
      });
    }

    if (url === "/likes") {
      const postId = String(body.post_id);
      state.likes[postId] = Array.from(new Set([...(state.likes[postId] || []), currentUser.id]));
    }

    if (url === "/relationships") {
      const followedUserId = String(body.userId);
      state.relationships[followedUserId] = Array.from(
        new Set([...(state.relationships[followedUserId] || []), currentUser.id])
      );
    }

    if (url === "/articles") {
      state.articles.push(
        withAuthor({
          ...body,
          article_id: nextId(state.articles, "article_id"),
          article_creation_time: now,
        })
      );
    }

    if (url === "/jobs") {
      state.jobs.push(
        withAuthor({
          ...body,
          job_id: nextId(state.jobs, "job_id"),
          job_creation_time: now,
        })
      );
    }

    if (url === "/announcements") {
      state.announcements.push(
        withAuthor({
          ...body,
          announcement_id: nextId(state.announcements, "announcement_id"),
          announcement_creation_time: now,
        })
      );
    }

    writeState(state);
    return response({ ok: true });
  },

  async delete(url) {
    const state = readState();

    if (url.startsWith("/posts/")) {
      const postId = Number(url.split("/").pop());
      state.posts = state.posts.filter((post) => post.post_id !== postId);
    }

    if (url.startsWith("/likes")) {
      const currentUser = getCurrentUser();
      const postId = parseQuery(url).get("post_id");
      state.likes[postId] = (state.likes[postId] || []).filter(
        (userId) => userId !== currentUser.id
      );
    }

    if (url.startsWith("/relationships")) {
      const currentUser = getCurrentUser();
      const followedUserId = parseQuery(url).get("userId");
      state.relationships[followedUserId] = (
        state.relationships[followedUserId] || []
      ).filter((userId) => userId !== currentUser.id);
    }

    if (url.startsWith("/articles/")) {
      const articleId = Number(url.split("/").pop());
      state.articles = state.articles.filter((item) => item.article_id !== articleId);
    }

    if (url.startsWith("/jobs/")) {
      const jobId = Number(url.split("/").pop());
      state.jobs = state.jobs.filter((item) => item.job_id !== jobId);
    }

    if (url.startsWith("/announcements/")) {
      const announcementId = Number(url.split("/").pop());
      state.announcements = state.announcements.filter(
        (item) => item.announcement_id !== announcementId
      );
    }

    writeState(state);
    return response({ ok: true });
  },

  async put(url, body) {
    const state = readState();

    if (url === "/users") {
      state.users = state.users.map((user) =>
        user.id === body.id ? { ...user, ...body } : user
      );
      localStorage.setItem("user", JSON.stringify({ ...getCurrentUser(), ...body }));
    }

    writeState(state);
    return response({ ok: true });
  },
};
