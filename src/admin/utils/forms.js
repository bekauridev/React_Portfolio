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

export function isProjectRepoUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "git:";
  } catch {
    return false;
  }
}

function withOptionalFields(payload, values, fields) {
  fields.forEach((field) => {
    const value = values[field];
    if (Array.isArray(value)) {
      const cleanValue = cleanArray(value);
      if (cleanValue.length) payload[field] = cleanValue;
      return;
    }

    const cleanValue = String(value || "").trim();
    if (cleanValue) payload[field] = cleanValue;
  });

  return payload;
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
    if (values[field].trim() && !isHttpsUrl(values[field])) {
      errors[field] = "Use a valid HTTPS URL.";
    }
  });

  if (values.gitRepo.trim() && !isProjectRepoUrl(values.gitRepo)) {
    errors.gitRepo = "Use a valid URL with https:// or git://.";
  }

  const invalidGallery = cleanArray(values.gallery).some((item) => !isHttpsUrl(item));
  if (invalidGallery) errors.gallery = "Gallery URLs must use HTTPS.";

  return errors;
}

export function normalizeProject(values) {
  const payload = {
    title: values.title.trim(),
    description: values.description.trim(),
    technologies: cleanArray(values.technologies),
  };

  return withOptionalFields(payload, values, [
    "slogan",
    "gallery",
    "thumbnail",
    "cardImage",
    "coverImage",
    "liveDemo",
    "gitRepo",
    "database",
  ]);
}

export function validateBlog(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.content.trim()) errors.content = "Content is required.";
  if (!values.author.trim()) errors.author = "Author is required.";
  if (values.excerpt.length > 300) errors.excerpt = "Excerpt must be 300 characters or less.";
  if (values.status && !BLOG_STATUSES.includes(values.status)) {
    errors.status = "Choose a valid status.";
  }
  if (values.coverImage.trim() && !isHttpsUrl(values.coverImage)) {
    errors.coverImage = "Use a valid HTTPS URL.";
  }

  const invalidGallery = cleanArray(values.gallery).some((item) => !isHttpsUrl(item));
  if (invalidGallery) errors.gallery = "Gallery URLs must use HTTPS.";

  return errors;
}

export function normalizeBlog(values) {
  const payload = {
    title: values.title.trim(),
    content: values.content.trim(),
    author: values.author.trim(),
  };

  withOptionalFields(payload, values, ["excerpt", "coverImage", "gallery", "tags", "category"]);

  if (values.status) payload.status = values.status;
  payload.isFeatured = Boolean(values.isFeatured);

  if (payload.excerpt) payload.excerpt = payload.excerpt.slice(0, 300);

  return payload;
}

export function validateGoodie(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!values.logo.trim()) errors.logo = "Logo is required.";
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
