export const BLOG_STATUSES = ["draft", "published", "archived"];

export function cleanArray(items = []) {
  return items.map((item) => String(item || "").trim()).filter(Boolean);
}

export function hasItems(items = []) {
  return cleanArray(items).length > 0;
}

export function isHttpsUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isProtocolUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return Boolean(url.protocol && url.hostname);
  } catch {
    return false;
  }
}

export function createQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  const output = query.toString();
  return output ? `?${output}` : "";
}

export function getList(response) {
  return Array.isArray(response?.data) ? response.data : [];
}

export function getItem(response) {
  return response?.data ?? null;
}

export function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function validateProject(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!hasItems(values.technologies)) errors.technologies = "Add at least one technology.";

  ["thumbnail", "cardImage", "coverImage", "liveDemo", "database"].forEach((field) => {
    if (!isHttpsUrl(values[field])) errors[field] = "Use a valid HTTPS URL.";
  });

  if (!isProtocolUrl(values.gitRepo)) {
    errors.gitRepo = "Use a valid URL with protocol, for example https:// or git://.";
  }

  const invalidGallery = cleanArray(values.gallery).some((item) => !isHttpsUrl(item));
  if (invalidGallery) errors.gallery = "Gallery URLs must use HTTPS.";

  return errors;
}

export function normalizeProject(values) {
  return {
    title: values.title.trim(),
    slogan: values.slogan.trim(),
    description: values.description.trim(),
    technologies: cleanArray(values.technologies),
    gallery: cleanArray(values.gallery),
    thumbnail: values.thumbnail.trim(),
    cardImage: values.cardImage.trim(),
    coverImage: values.coverImage.trim(),
    liveDemo: values.liveDemo.trim(),
    gitRepo: values.gitRepo.trim(),
    database: values.database.trim(),
  };
}

export function validateBlog(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.content.trim()) errors.content = "Content is required.";
  if (!values.author.trim()) errors.author = "Author is required.";
  if (values.excerpt.length > 300) errors.excerpt = "Excerpt must be 300 characters or less.";
  if (!BLOG_STATUSES.includes(values.status)) errors.status = "Choose a valid status.";
  if (!isHttpsUrl(values.coverImage)) errors.coverImage = "Use a valid HTTPS URL.";

  const invalidGallery = cleanArray(values.gallery).some((item) => !isHttpsUrl(item));
  if (invalidGallery) errors.gallery = "Gallery URLs must use HTTPS.";

  return errors;
}

export function normalizeBlog(values) {
  return {
    title: values.title.trim(),
    excerpt: values.excerpt.trim().slice(0, 300),
    content: values.content.trim(),
    coverImage: values.coverImage.trim(),
    gallery: cleanArray(values.gallery),
    tags: cleanArray(values.tags),
    category: values.category.trim() || "General",
    author: values.author.trim(),
    status: values.status,
    isFeatured: Boolean(values.isFeatured),
  };
}

export function validateGoodie(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!values.logo.trim()) errors.logo = "Logo URL is required.";
  if (!values.url.trim()) errors.url = "URL is required.";
  if (!values.category.trim()) errors.category = "Category is required.";
  if (values.logo && !isHttpsUrl(values.logo)) errors.logo = "Logo must be an HTTPS URL.";
  if (values.url && !isHttpsUrl(values.url)) errors.url = "URL must be an HTTPS URL.";
  return errors;
}

export function normalizeGoodie(values) {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
    logo: values.logo.trim(),
    url: values.url.trim(),
    category: values.category.trim(),
  };
}
