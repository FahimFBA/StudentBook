export const isDemoMode =
  import.meta.env.MODE === "demo" || import.meta.env.VITE_DEMO_MODE === "true";

export const basePath = import.meta.env.BASE_URL || "/";

export const publicAssetPath = (path) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;

  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${normalizedPath}`;
};

export const uploadPath = (fileName) => {
  if (!fileName) return "";
  if (/^(https?:|data:|blob:)/.test(fileName)) return fileName;

  return publicAssetPath(`upload/${fileName.replace(/^\/?(upload\/)?/, "")}`);
};
