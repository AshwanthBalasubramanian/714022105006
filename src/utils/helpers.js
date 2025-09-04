// Generate unique shortcode
export function generateShortcode(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Validate URL
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export function saveUrlData(urlData) {
  const data = JSON.parse(localStorage.getItem("urls")) || [];
  data.push(urlData);
  localStorage.setItem("urls", JSON.stringify(data));
}

// Get all URLs
export function getUrlData() {
  return JSON.parse(localStorage.getItem("urls")) || [];
}
