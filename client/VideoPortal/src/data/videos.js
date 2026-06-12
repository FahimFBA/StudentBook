const channelUrl = "https://youtube.com/@FahimAmin";

const thumbnailUrl = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const embedUrl = (id) => `https://www.youtube.com/embed/${id}`;

export const videos = [
  {
    id: "zSYg-wRSIu8",
    title: "How To Use Local Storage To Annotate Unlimited Data in Label Studio",
    views: "505 views",
    date: "Feb 25, 2026",
    likes: "6",
    description:
      "Configure local file storage in Label Studio so large image, text, audio, or video datasets can be annotated without uploading every file manually.",
  },
  {
    id: "JvzVQgiBMTg",
    title: "How to Self-Host Coolify on Linode",
    views: "147 views",
    date: "Feb 14, 2026",
    likes: "3",
    description:
      "A step-by-step VPS deployment guide for installing Coolify on Linode and hosting apps with more control over infrastructure.",
  },
  {
    id: "qOJ49nkU4rY",
    title: "Windows 11 GPU Setup for TensorFlow and PyTorch",
    views: "6.1K views",
    date: "Nov 10, 2025",
    likes: "130",
    description:
      "A full CUDA and cuDNN walkthrough for setting up GPU acceleration for TensorFlow and PyTorch on Windows 11.",
  },
  {
    id: "jDy9rdgSoHs",
    title: "How To Run Overleaf Locally and For Free",
    views: "8K views",
    date: "Oct 25, 2025",
    likes: "86",
    description:
      "Install and run Overleaf locally using Docker, then compare the workflow with Crixet for collaborative LaTeX projects.",
  },
  {
    id: "LADT0Y_IcNU",
    title: "How To Setup Coolify In AWS EC2",
    views: "1.5K views",
    date: "May 16, 2025",
    likes: "27",
    description:
      "Deploy Coolify on an AWS EC2 instance and manage apps, databases, and services on your own cloud infrastructure.",
  },
  {
    id: "Lut81-jnc68",
    title: "How to Make Images Ghiblified",
    views: "5K views",
    date: "Mar 28, 2025",
    likes: "20",
    description:
      "Transform images into stylized artwork and try several prompt directions for creative image generation.",
  },
  {
    id: "A45lWrndVHA",
    title: "How To Run LaTeX Projects Locally on Windows",
    views: "3.8K views",
    date: "Feb 19, 2025",
    likes: "37",
    description:
      "Set up a local LaTeX workflow on Windows so projects can compile without depending on hosted editors.",
  },
  {
    id: "2knL9ntLU-A",
    title: "How to Reformat Codes Directly on Code::Blocks",
    views: "717 views",
    date: "Jan 14, 2025",
    likes: "6",
    description:
      "Use Code::Blocks formatting tools to clean up source code without moving the file into another editor.",
  },
  {
    id: "_mr7XYgCvEU",
    title: "What is Dictionary in Python",
    views: "125 views",
    date: "Dec 2, 2024",
    likes: "2",
    description:
      "A quick practical explanation of Python dictionaries, unique keys, values, and common usage patterns.",
  },
  {
    id: "3viM71-ULAw",
    title: "How to Install and Configure XAMPP Properly",
    views: "1.3K views",
    date: "Nov 12, 2024",
    likes: "11",
    description:
      "Fix common XAMPP configuration issues so the local Apache and MySQL stack can quit cleanly.",
  },
  {
    id: "JydEDYzxsuE",
    title: "RegEx Introduction",
    views: "58 views",
    date: "Aug 8, 2024",
    likes: "0",
    description:
      "Learn what regular expressions are and where they help when matching or validating text.",
  },
  {
    id: "HMeCXobi90E",
    title: "Note, Tip, Warning and Caution Blocks in Markdown",
    views: "2.1K views",
    date: "Jun 8, 2024",
    likes: "23",
    description:
      "Use GitHub-supported Markdown notice blocks to make project documentation easier to scan.",
  },
].map((video) => ({
  ...video,
  channel: "Fahim Amin",
  channelUrl,
  thumbnail: thumbnailUrl(video.id),
  watchUrl: watchUrl(video.id),
  embedUrl: embedUrl(video.id),
}));

export const featuredVideo = videos[0];
