import { isDemoMode } from "../config";

const demoStorageKey = "studentbook-demo-state-v5";
const legacyDemoStorageKeys = [
  "studentbook-demo-state",
  "studentbook-demo-state-v2",
  "studentbook-demo-state-v3",
  "studentbook-demo-state-v4",
];

const now = "2026-06-13 10:00:00";

const imageUrl = (id, width = 1200, height = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=82`;

const avatarUrl = (id) => imageUrl(id, 320, 320);
const coverUrl = (id) => imageUrl(id, 1600, 520);

export const demoAccounts = [
  {
    label: "Demo Student",
    description: "Computer science senior",
    user_name: "demo-student",
    user_password: "student123",
  },
  {
    label: "Demo Faculty",
    description: "Faculty advisor",
    user_name: "demo-faculty",
    user_password: "faculty123",
  },
  {
    label: "Demo Staff",
    description: "Student success staff",
    user_name: "demo-staff",
    user_password: "staff123",
  },
];

export const demoCredentials = demoAccounts[0];

const users = [
  {
    id: 1,
    user_name: "demo-student",
    user_fullname: "Maya Johnson",
    user_occ: "Computer Science Student",
    user_type: "student",
    user_email: "maya.johnson@studentbook.demo",
    user_city: "Boston, MA",
    user_website: "studentbook-demo.github.io/maya",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1494790108377-be9c29b29330"),
    user_cover_img: coverUrl("photo-1519389950473-47ba0277781c"),
    student_cgpa: "3.91",
  },
  {
    id: 2,
    user_name: "demo-faculty",
    user_fullname: "Dr. Emily Carter",
    user_occ: "Faculty Advisor",
    user_type: "faculty",
    user_email: "emily.carter@studentbook.demo",
    user_city: "Ann Arbor, MI",
    user_website: "cs-advising.example.edu",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1573496359142-b8d87734a5a2"),
    user_cover_img: coverUrl("photo-1497366754035-f200968a6e72"),
    student_cgpa: "",
  },
  {
    id: 3,
    user_name: "demo-staff",
    user_fullname: "Jordan Brooks",
    user_occ: "Student Success Coordinator",
    user_type: "staff",
    user_email: "jordan.brooks@studentbook.demo",
    user_city: "Austin, TX",
    user_website: "student-success.example.edu",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1560250097-0b93528c311a"),
    user_cover_img: coverUrl("photo-1523580846011-d3a5bc25702b"),
    student_cgpa: "",
  },
  {
    id: 4,
    user_name: "alex-rivera",
    user_fullname: "Alex Rivera",
    user_occ: "Data Science Student",
    user_type: "student",
    user_email: "alex.rivera@studentbook.demo",
    user_city: "Seattle, WA",
    user_website: "alexrivera.dev",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1500648767791-00dcc994a43e"),
    user_cover_img: coverUrl("photo-1519389950473-47ba0277781c"),
    student_cgpa: "3.78",
  },
  {
    id: 5,
    user_name: "sophia-miller",
    user_fullname: "Sophia Miller",
    user_occ: "Graduate Research Assistant",
    user_type: "student",
    user_email: "sophia.miller@studentbook.demo",
    user_city: "Chicago, IL",
    user_website: "sophiamiller.lab",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1544005313-94ddf0286df2"),
    user_cover_img: coverUrl("photo-1497633762265-9d179a990aa6"),
    student_cgpa: "3.86",
  },
  {
    id: 6,
    user_name: "noah-thompson",
    user_fullname: "Noah Thompson",
    user_occ: "Alumni Mentor",
    user_type: "alumni",
    user_email: "noah.thompson@studentbook.demo",
    user_city: "Denver, CO",
    user_website: "linkedin.com/in/noah-thompson",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1507003211169-0a1dd7228f2d"),
    user_cover_img: coverUrl("photo-1504384308090-c894fdcc538d"),
    student_cgpa: "3.67",
  },
  {
    id: 7,
    user_name: "ava-wilson",
    user_fullname: "Ava Wilson",
    user_occ: "Career Services Lead",
    user_type: "staff",
    user_email: "ava.wilson@studentbook.demo",
    user_city: "Raleigh, NC",
    user_website: "careers.example.edu",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1580489944761-15a19d654956"),
    user_cover_img: coverUrl("photo-1521737604893-d14cc237f11d"),
    student_cgpa: "",
  },
  {
    id: 8,
    user_name: "ethan-wright",
    user_fullname: "Ethan Wright",
    user_occ: "Cybersecurity Student",
    user_type: "student",
    user_email: "ethan.wright@studentbook.demo",
    user_city: "Pittsburgh, PA",
    user_website: "ethansec.dev",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1506794778202-cad84cf45f1d"),
    user_cover_img: coverUrl("photo-1516321318423-f06f85e504b3"),
    student_cgpa: "3.73",
  },
  {
    id: 9,
    user_name: "olivia-martin",
    user_fullname: "Olivia Martin",
    user_occ: "Campus Events Manager",
    user_type: "staff",
    user_email: "olivia.martin@studentbook.demo",
    user_city: "San Diego, CA",
    user_website: "events.example.edu",
    user_cal: "https://calendly.com/",
    user_profile_img: avatarUrl("photo-1534528741775-53994a69daeb"),
    user_cover_img: coverUrl("photo-1522202176988-66273c2fd55f"),
    student_cgpa: "",
  },
];

const userById = (id) => users.find((user) => user.id === id) || users[0];

const post = (post_id, user_id, post_desc, img, post_creation_time) => {
  const user = userById(user_id);
  return {
    post_id,
    user_id,
    user_fullname: user.user_fullname,
    user_profile_img: user.user_profile_img,
    post_desc,
    img,
    post_creation_time,
  };
};

const authored = (id, user_id, fields) => {
  const user = userById(user_id);
  return {
    ...fields,
    user_id,
    user_fullname: user.user_fullname,
    user_profile_img: user.user_profile_img,
    ...(fields.article_id ? { article_id: id } : {}),
    ...(fields.announcement_id ? { announcement_id: id } : {}),
  };
};

const job = (job_id, user_id, fields) => {
  const user = userById(user_id);
  return {
    job_id,
    user_id,
    job_provider_user_name: user.user_fullname,
    user_profile_img: user.user_profile_img,
    ...fields,
  };
};

const seedState = {
  users,
  posts: [
    post(
      101,
      1,
      "Finished the demo capstone board for Human-Centered AI. StudentBook is a helpful place to collect quick feedback before tomorrow's review.",
      imageUrl("photo-1519389950473-47ba0277781c"),
      now
    ),
    post(
      102,
      2,
      "Office hours are open for project scope reviews. Bring one clear research question, one risk, and the smallest working prototype you have.",
      "",
      "2026-06-12 16:45:00"
    ),
    post(
      103,
      7,
      "Career Services added five new summer internship leads. Prioritize roles that list mentorship, code review, and a real project owner.",
      imageUrl("photo-1552664730-d307ca884978"),
      "2026-06-12 13:20:00"
    ),
    post(
      104,
      4,
      "Our analytics study group moved the dashboard from spreadsheet exports to a reproducible notebook. The next session is all about explaining the model in plain English.",
      imageUrl("photo-1520607162513-77705c0f0d4a"),
      "2026-06-11 18:05:00"
    ),
    post(
      105,
      5,
      "Reading group takeaway: the best literature reviews do not summarize papers one by one. They compare methods, assumptions, and open questions.",
      imageUrl("photo-1497633762265-9d179a990aa6"),
      "2026-06-11 11:35:00"
    ),
    post(
      106,
      3,
      "Reminder for first-year students: update your profile, add your advising interest, and follow classmates from your lab section before orientation closes.",
      "",
      "2026-06-10 15:10:00"
    ),
    post(
      107,
      6,
      "Mock interview note from today: strong candidates explain tradeoffs, not just tools. Say why React Query, why caching, why a smaller API surface.",
      imageUrl("photo-1551836022-d5d88e9218df"),
      "2026-06-10 09:50:00"
    ),
    post(
      108,
      8,
      "The cyber club is running a password manager workshop next Friday. Bring a laptop and one account you are ready to secure properly.",
      imageUrl("photo-1516321318423-f06f85e504b3"),
      "2026-06-09 20:15:00"
    ),
    post(
      109,
      9,
      "The innovation fair floor plan is live. Teams with hardware demos should request power by Wednesday so facilities can reserve the right tables.",
      imageUrl("photo-1521737604893-d14cc237f11d"),
      "2026-06-09 12:00:00"
    ),
    post(
      110,
      1,
      "Small win: our team replaced a vague feature list with user stories. The conversation got calmer as soon as every story had a testable outcome.",
      "",
      "2026-06-08 17:30:00"
    ),
    post(
      111,
      2,
      "Faculty tip: when you ask for a recommendation letter, include your transcript, project summary, target role, and the exact deadline in one message.",
      imageUrl("photo-1524995997946-a1c2e315a42f"),
      "2026-06-08 10:25:00"
    ),
    post(
      112,
      4,
      "The data visualization lab is collecting examples of misleading charts. Send screenshots with a short note about the design problem.",
      imageUrl("photo-1551288049-bebda4e38f71"),
      "2026-06-07 19:40:00"
    ),
    post(
      113,
      5,
      "Submitted our poster draft. The strongest section is the failure analysis because it shows exactly what we learned from the first prototype.",
      imageUrl("photo-1531482615713-2afd69097998"),
      "2026-06-07 14:05:00"
    ),
    post(
      114,
      7,
      "Resume clinic slots are full for Monday, but we opened extra appointments on Thursday afternoon for internship applications.",
      "",
      "2026-06-06 16:55:00"
    ),
    post(
      115,
      8,
      "Built a threat model for the campus ride-share app. The surprising part was how many risks were about permissions and recovery, not encryption.",
      imageUrl("photo-1550751827-4bd374c3f58b"),
      "2026-06-06 09:20:00"
    ),
    post(
      116,
      3,
      "Financial aid forms are due next week. If your household information changed this semester, book a support appointment before submitting.",
      "",
      "2026-06-05 15:45:00"
    ),
    post(
      117,
      6,
      "Alumni AMA recap: your first job will reward reliability. Show progress early, ask specific questions, and write down decisions.",
      imageUrl("photo-1504384308090-c894fdcc538d"),
      "2026-06-05 11:00:00"
    ),
    post(
      118,
      9,
      "Student showcase photos are uploaded to the event folder. Tag your project team so visitors can find the people behind each demo.",
      imageUrl("photo-1523240795612-9a054b0db644"),
      "2026-06-04 18:25:00"
    ),
  ],
  likes: {
    101: [2, 3, 4, 7],
    102: [1, 4, 5],
    103: [1, 4, 6, 8],
    104: [1, 2, 5],
    105: [2, 6, 8],
    106: [1, 2, 9],
    107: [1, 4, 5, 7, 8],
    108: [1, 3, 4],
    109: [1, 5, 7, 8],
    110: [2, 4],
    111: [1, 3, 5, 6],
    112: [1, 5, 7],
    113: [1, 2, 4, 8],
    114: [1, 6, 8],
    115: [2, 3, 4, 6],
    116: [1, 2],
    117: [1, 3, 4, 5, 7],
    118: [1, 2, 3, 6, 8],
  },
  comments: {
    101: [
      {
        comment_id: 201,
        post_id: 101,
        user_name: "demo-faculty",
        user_profile_img: userById(2).user_profile_img,
        comment_desc: "This is a strong scope for a live demo. Keep the feedback loop visible.",
        comment_creation_time: now,
      },
      {
        comment_id: 202,
        post_id: 101,
        user_name: "alex-rivera",
        user_profile_img: userById(4).user_profile_img,
        comment_desc: "I can test the onboarding flow tonight.",
        comment_creation_time: "2026-06-13 10:12:00",
      },
    ],
    103: [
      {
        comment_id: 203,
        post_id: 103,
        user_name: "noah-thompson",
        user_profile_img: userById(6).user_profile_img,
        comment_desc: "Mentorship is the signal I would look for first too.",
        comment_creation_time: "2026-06-12 14:05:00",
      },
    ],
    107: [
      {
        comment_id: 204,
        post_id: 107,
        user_name: "demo-student",
        user_profile_img: userById(1).user_profile_img,
        comment_desc: "This helped me rewrite two interview answers.",
        comment_creation_time: "2026-06-10 10:30:00",
      },
    ],
    115: [
      {
        comment_id: 205,
        post_id: 115,
        user_name: "demo-staff",
        user_profile_img: userById(3).user_profile_img,
        comment_desc: "Please send this to the app review group.",
        comment_creation_time: "2026-06-06 10:05:00",
      },
    ],
  },
  relationships: {
    1: [2, 3, 4, 5, 7],
    2: [1, 4, 5],
    3: [1, 7, 9],
    4: [1, 2, 5, 6],
    5: [1, 2, 4],
    6: [1, 4, 7, 8],
    7: [1, 3, 6],
    8: [1, 4, 6],
    9: [1, 3, 7],
  },
  articles: [
    authored(301, 2, {
      article_id: 301,
      article_title: "How to Turn a Class Project Into a Portfolio Story",
      article_content:
        "Frame the problem, explain the constraint, show the decision you made, and end with evidence. A recruiter should understand the project even if they never open the repository.",
      article_creation_time: "2026-06-12",
    }),
    authored(302, 1, {
      article_id: 302,
      article_title: "What I Learned From Testing With Five Students",
      article_content:
        "The first prototype answered the wrong question. Watching students struggle with labels was more useful than adding another feature.",
      article_creation_time: "2026-06-11",
    }),
    authored(303, 5, {
      article_id: 303,
      article_title: "A Practical Literature Review Checklist",
      article_content:
        "Group papers by method, dataset, and limitation. The review becomes easier to defend when every paragraph explains a comparison.",
      article_creation_time: "2026-06-10",
    }),
    authored(304, 7, {
      article_id: 304,
      article_title: "Internship Search Signals That Matter",
      article_content:
        "Look for clear mentorship, a named team, realistic requirements, and a project with users. A long tech stack is less important than a good learning environment.",
      article_creation_time: "2026-06-09",
    }),
    authored(305, 8, {
      article_id: 305,
      article_title: "Security Basics for Student Projects",
      article_content:
        "Start with authentication, authorization, recovery, and logging. Most campus apps fail because permissions are vague, not because the cryptography is exotic.",
      article_creation_time: "2026-06-08",
    }),
    authored(306, 6, {
      article_id: 306,
      article_title: "The First Ninety Days After Graduation",
      article_content:
        "Build trust through small reliable deliveries. Write concise updates, ask for context early, and keep a private decision log.",
      article_creation_time: "2026-06-07",
    }),
    authored(307, 4, {
      article_id: 307,
      article_title: "Data Cleaning Notes From the Analytics Lab",
      article_content:
        "Keep the raw file, document every transform, and create one validation table. A simple audit trail saves hours when results change.",
      article_creation_time: "2026-06-06",
    }),
    authored(308, 3, {
      article_id: 308,
      article_title: "How to Ask for Advising Help",
      article_content:
        "Send your goal, current blocker, deadline, and what you already tried. Specific context turns a vague support request into a useful conversation.",
      article_creation_time: "2026-06-05",
    }),
    authored(309, 9, {
      article_id: 309,
      article_title: "Planning a Better Student Showcase",
      article_content:
        "Visitors need a path, teams need setup time, and judges need clear criteria. Good logistics make the work easier to understand.",
      article_creation_time: "2026-06-04",
    }),
    authored(310, 2, {
      article_id: 310,
      article_title: "Research Abstracts in One Page",
      article_content:
        "Use one sentence for the problem, two for the method, one for the result, and one for why it matters. Cut anything that does not support that chain.",
      article_creation_time: "2026-06-03",
    }),
  ],
  jobs: [
    job(401, 7, {
      job_provider_company_name: "Northstar Labs",
      job_provider_company_website: "https://example.com/northstar-labs",
      job_provider_company_email: "internships@northstar.example",
      job_description:
        "Frontend engineering internship building React dashboards for student advising workflows.",
      job_requirement:
        "React fundamentals, Git, API integration experience, and interest in accessibility.",
      job_salary: "$28 - $34/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-12",
    }),
    job(402, 6, {
      job_provider_company_name: "Civic Data Studio",
      job_provider_company_website: "https://example.com/civic-data",
      job_provider_company_email: "talent@civicdata.example",
      job_description:
        "Data analyst intern cleaning public datasets and preparing weekly insight briefs.",
      job_requirement:
        "SQL basics, spreadsheet fluency, Python or R exposure, and careful documentation.",
      job_salary: "$24 - $30/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-11",
    }),
    job(403, 3, {
      job_provider_company_name: "Campus Help Desk",
      job_provider_company_website: "https://example.com/help-desk",
      job_provider_company_email: "studentjobs@helpdesk.example",
      job_description:
        "Part-time support assistant helping students resolve account, device, and classroom technology issues.",
      job_requirement:
        "Clear communication, troubleshooting mindset, and availability for two evening shifts.",
      job_salary: "$18/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-10",
    }),
    job(404, 2, {
      job_provider_company_name: "Applied AI Institute",
      job_provider_company_website: "https://example.com/applied-ai",
      job_provider_company_email: "research@appliedai.example",
      job_description:
        "Research assistant role evaluating prompt quality and writing reproducible experiment notes.",
      job_requirement:
        "Strong writing, statistics fundamentals, and experience reading technical papers.",
      job_salary: "$22 - $26/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-09",
    }),
    job(405, 9, {
      job_provider_company_name: "BrightPath Events",
      job_provider_company_website: "https://example.com/brightpath-events",
      job_provider_company_email: "ops@brightpath.example",
      job_description:
        "Event operations assistant coordinating check-in, room setup, volunteer schedules, and post-event notes.",
      job_requirement:
        "Organized, comfortable with spreadsheets, and able to work two weekend events per month.",
      job_salary: "$20/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-08",
    }),
    job(406, 8, {
      job_provider_company_name: "ShieldWorks Security",
      job_provider_company_website: "https://example.com/shieldworks",
      job_provider_company_email: "earlycareer@shieldworks.example",
      job_description:
        "Security operations intern reviewing alerts, documenting playbooks, and assisting with phishing simulations.",
      job_requirement:
        "Networking basics, Linux comfort, and interest in defensive security.",
      job_salary: "$30 - $36/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-07",
    }),
    job(407, 5, {
      job_provider_company_name: "Midwest Bioinformatics Center",
      job_provider_company_website: "https://example.com/bioinformatics",
      job_provider_company_email: "labjobs@bioinfo.example",
      job_description:
        "Graduate assistant position supporting data preparation for genomics visualization tools.",
      job_requirement:
        "Python, data cleaning, basic biology vocabulary, and careful version control habits.",
      job_salary: "$25/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-06",
    }),
    job(408, 4, {
      job_provider_company_name: "Maple Cloud",
      job_provider_company_website: "https://example.com/maple-cloud",
      job_provider_company_email: "students@maplecloud.example",
      job_description:
        "Cloud support internship helping small teams monitor deployments and improve runbooks.",
      job_requirement:
        "Command-line comfort, basic HTTP knowledge, and willingness to write clear incident notes.",
      job_salary: "$27 - $32/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-05",
    }),
    job(409, 7, {
      job_provider_company_name: "Readable Health",
      job_provider_company_website: "https://example.com/readable-health",
      job_provider_company_email: "ux@readablehealth.example",
      job_description:
        "UX research intern preparing interview guides, tagging notes, and summarizing patient portal findings.",
      job_requirement:
        "Interview experience, empathy, synthesis skills, and strong writing.",
      job_salary: "$26 - $31/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-04",
    }),
    job(410, 6, {
      job_provider_company_name: "Launchpad Robotics",
      job_provider_company_website: "https://example.com/launchpad-robotics",
      job_provider_company_email: "team@launchpad.example",
      job_description:
        "Robotics software intern improving simulator tests and documenting sensor calibration workflows.",
      job_requirement:
        "C++ or Python, debugging patience, and experience working with hardware teams.",
      job_salary: "$29 - $35/hour",
      job_provider_company_twitter: "https://x.com/",
      job_provider_company_facebook: "https://facebook.com/",
      job_creation_time: "2026-06-03",
    }),
  ],
  announcements: [
    authored(501, 3, {
      announcement_id: 501,
      announcement_title: "Static Demo Data Refreshed",
      announcement_content:
        "This demo now uses browser-local American campus data. It does not connect to MySQL or the Express API.",
      announcement_creation_time: "2026-06-13",
    }),
    authored(502, 7, {
      announcement_id: 502,
      announcement_title: "Resume Clinic Added Thursday",
      announcement_content:
        "Career Services opened additional resume review appointments for internship and new graduate applications.",
      announcement_creation_time: "2026-06-12",
    }),
    authored(503, 2, {
      announcement_id: 503,
      announcement_title: "Research Abstract Deadline",
      announcement_content:
        "Submit one-page research abstracts by Friday at 5 PM. Include your question, method, result, and advisor name.",
      announcement_creation_time: "2026-06-11",
    }),
    authored(504, 9, {
      announcement_id: 504,
      announcement_title: "Innovation Fair Setup",
      announcement_content:
        "Teams with hardware demos should request power access and table space before Wednesday afternoon.",
      announcement_creation_time: "2026-06-10",
    }),
    authored(505, 3, {
      announcement_id: 505,
      announcement_title: "Financial Aid Support Hours",
      announcement_content:
        "Walk-in support is available Monday through Wednesday for students updating household information.",
      announcement_creation_time: "2026-06-09",
    }),
    authored(506, 8, {
      announcement_id: 506,
      announcement_title: "Cyber Club Workshop",
      announcement_content:
        "Friday's workshop covers password managers, recovery codes, and safer account sharing for student teams.",
      announcement_creation_time: "2026-06-08",
    }),
  ],
  videos: [
    {
      video_id: 601,
      video_title: "How To Use Local Storage To Annotate Unlimited Data in Label Studio",
      video_description:
        "Configure local file storage in Label Studio so large datasets can be annotated without uploading every file manually.",
      video_url: "https://www.youtube.com/watch?v=zSYg-wRSIu8",
      video_embed_url: "https://www.youtube.com/embed/zSYg-wRSIu8",
      video_thumbnail_url: "https://i.ytimg.com/vi/zSYg-wRSIu8/hqdefault.jpg",
      user_id: 1,
      user_fullname: userById(1).user_fullname,
      user_profile_img: userById(1).user_profile_img,
      video_creation_time: "2026-06-13 10:00:00",
    },
    {
      video_id: 602,
      video_title: "Windows 11 GPU Setup for TensorFlow and PyTorch",
      video_description:
        "A full CUDA and cuDNN walkthrough for setting up GPU acceleration for TensorFlow and PyTorch on Windows 11.",
      video_url: "https://www.youtube.com/watch?v=qOJ49nkU4rY",
      video_embed_url: "https://www.youtube.com/embed/qOJ49nkU4rY",
      video_thumbnail_url: "https://i.ytimg.com/vi/qOJ49nkU4rY/hqdefault.jpg",
      user_id: 2,
      user_fullname: userById(2).user_fullname,
      user_profile_img: userById(2).user_profile_img,
      video_creation_time: "2026-06-12 15:30:00",
    },
    {
      video_id: 603,
      video_title: "How To Run Overleaf Locally and For Free",
      video_description:
        "Install and run Overleaf locally using Docker for an offline LaTeX collaboration workflow.",
      video_url: "https://www.youtube.com/watch?v=jDy9rdgSoHs",
      video_embed_url: "https://www.youtube.com/embed/jDy9rdgSoHs",
      video_thumbnail_url: "https://i.ytimg.com/vi/jDy9rdgSoHs/hqdefault.jpg",
      user_id: 5,
      user_fullname: userById(5).user_fullname,
      user_profile_img: userById(5).user_profile_img,
      video_creation_time: "2026-06-11 14:15:00",
    },
    {
      video_id: 604,
      video_title: "How To Download Kaggle Datasets Directly To Notebook",
      video_description:
        "A practical walkthrough for pulling Kaggle datasets into notebooks and Google Colab.",
      video_url: "https://www.youtube.com/watch?v=7Z0s-XDXR1E",
      video_embed_url: "https://www.youtube.com/embed/7Z0s-XDXR1E",
      video_thumbnail_url: "https://i.ytimg.com/vi/7Z0s-XDXR1E/hqdefault.jpg",
      user_id: 4,
      user_fullname: userById(4).user_fullname,
      user_profile_img: userById(4).user_profile_img,
      video_creation_time: "2026-06-10 12:45:00",
    },
  ],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const cleanupLegacyDemoStorage = () => {
  legacyDemoStorageKeys.forEach((key) => localStorage.removeItem(key));
};

const readState = () => {
  if (!isDemoMode) return null;

  try {
    cleanupLegacyDemoStorage();
    const savedState = localStorage.getItem(demoStorageKey);
    return savedState ? JSON.parse(savedState) : clone(seedState);
  } catch {
    return clone(seedState);
  }
};

const writeState = (state) => {
  localStorage.setItem(demoStorageKey, JSON.stringify(state));
};

const findUserInState = (state, user) => {
  if (!user) return null;
  const username = user.user_name?.toLowerCase();
  return (
    state.users.find((item) => item.id === user.id) ||
    state.users.find((item) => item.user_name.toLowerCase() === username) ||
    null
  );
};

const getCurrentUser = () => {
  const state = readState();

  try {
    return findUserInState(state, JSON.parse(localStorage.getItem("user"))) || state.users[0];
  } catch {
    return state.users[0];
  }
};

const response = (data = null) => Promise.resolve({ data });

const nextId = (items, key) =>
  Math.max(0, ...items.map((item) => Number(item[key]) || 0)) + 1;

const withAuthor = (item) => {
  const currentUser = getCurrentUser();
  return {
    ...item,
    user_id: currentUser.id,
    user_fullname: currentUser.user_fullname,
    user_profile_img: currentUser.user_profile_img,
  };
};

const byNewest = (key) => (a, b) => Number(b[key]) - Number(a[key]);

const parseQuery = (url) => new URL(url, "https://studentbook.local").searchParams;

const getYoutubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return parsedUrl.pathname.slice(1);
    if (host.endsWith("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2];
      }
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/")[2];
      }
      return parsedUrl.searchParams.get("v");
    }
  } catch {
    return "";
  }

  return "";
};

const resizeDataUrl = (dataUrl, mimeType) =>
  new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      const maxEdge = 1400;
      const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));

      if (scale === 1 && dataUrl.length < 1_500_000) {
        resolve(dataUrl);
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL(mimeType === "image/png" ? "image/png" : "image/jpeg", 0.82));
    };

    image.onerror = () => resolve(dataUrl);
    image.src = dataUrl;
  });

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    if (!file || !file.type?.startsWith("image/")) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        resolve(await resizeDataUrl(String(reader.result), file.type));
      } catch {
        resolve(String(reader.result));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const demoAuth = {
  user: users[0],
  getStoredUser() {
    const state = readState();

    try {
      const user = findUserInState(state, JSON.parse(localStorage.getItem("user")));
      if (user) localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch {
      return null;
    }
  },
  async login(inputs) {
    const state = readState();
    const username = inputs?.user_name?.trim().toLowerCase();
    const password = inputs?.user_password?.trim();
    const seededAccount = demoAccounts.find(
      (account) => account.user_name.toLowerCase() === username
    );
    const user = state.users.find((item) => item.user_name.toLowerCase() === username);

    if (seededAccount && seededAccount.user_password !== password) {
      return Promise.reject({
        response: { data: "Use the password shown for this demo account." },
      });
    }

    if (user?.user_password && user.user_password !== password) {
      return Promise.reject({
        response: { data: "That password does not match this browser-local demo account." },
      });
    }

    return response(user || state.users[0]);
  },
};

export const demoRequest = {
  async get(url) {
    const state = readState();

    if (url.startsWith("/posts")) {
      const userId = Number(parseQuery(url).get("userId"));
      const posts = userId
        ? state.posts.filter((item) => item.user_id === userId)
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

    if (url === "/videos/get-all-videos") {
      return response([...state.videos].sort(byNewest("video_id")));
    }

    if (url.startsWith("/searches/")) {
      const search = decodeURIComponent(url.split("/").pop()).toLowerCase();
      return response(
        state.users.filter((user) =>
          [
            user.user_fullname,
            user.user_name,
            user.user_occ,
            user.user_type,
            user.student_cgpa,
          ]
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
        user_type: "student",
        user_email: body.user_email,
        user_password: body.user_password,
        user_city: "New York, NY",
        user_website: "studentbook-demo.github.io",
        user_cal: "https://calendly.com/",
        user_profile_img: users[0].user_profile_img,
        user_cover_img: users[0].user_cover_img,
        student_cgpa: "",
      };
      state.users.push(nextUser);
      writeState(state);
      return response(nextUser);
    }

    if (url === "/upload") {
      return response(await fileToDataUrl(body?.get?.("file")));
    }

    if (url === "/posts") {
      state.posts.push(
        withAuthor({
          post_id: nextId(state.posts, "post_id"),
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
          job_provider_user_name: body.job_provider_user_name || currentUser.user_fullname,
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

    if (url === "/videos") {
      const videoId = getYoutubeVideoId(body.video_url);
      const currentUser = getCurrentUser();
      state.videos.push({
        video_id: nextId(state.videos, "video_id"),
        video_title: body.video_title,
        video_description: body.video_description || "",
        video_url: `https://www.youtube.com/watch?v=${videoId}`,
        video_embed_url: `https://www.youtube.com/embed/${videoId}`,
        video_thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        user_id: currentUser.id,
        user_fullname: currentUser.user_fullname,
        user_profile_img: currentUser.user_profile_img,
        video_creation_time: now,
      });
    }

    writeState(state);
    return response({ ok: true });
  },

  async delete(url) {
    const state = readState();

    if (url.startsWith("/posts/")) {
      const postId = Number(url.split("/").pop());
      state.posts = state.posts.filter((item) => item.post_id !== postId);
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

    if (url.startsWith("/videos/")) {
      const videoId = Number(url.split("/").pop());
      const currentUser = getCurrentUser();
      state.videos = state.videos.filter(
        (item) => item.video_id !== videoId || item.user_id !== currentUser.id
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
