// Parse JSON.
export const parse = (json, fallback = false) => {
  try {
    if (json === null || json === "") {
      return fallback;
    }

    return JSON.parse(json) || fallback;
  } catch (e) {
    console.error(e);
    return fallback;
  }
};

// Creates a range (array) of numbers.
export const range = (integer, start = 0) =>
  [...Array(parseInt(integer)).keys()].map((i) => i + parseInt(start));

// Capitalize a string.
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// abbreviate class name with a prefix
export const _classes = (styles) => (name) => {
  if (typeof name === "string") {
    return styles[name] || name || "";
  }

  if (Array.isArray(name)) {
    return name.map((n) => styles[n] || n || "").join(" ");
  }

  return "";
};

// Limit how often a function fires.
// Great for event listeners like onResize
// delay in ms
export const debounce = (delay, fn) => {
  let time = Date.now();

  return function debounced(e) {
    if (time + delay - Date.now() < 0) {
      fn(e);
      time = Date.now();
    }
  };
};

// abbreviate class name with a prefix
export const _class = (styles, prefix) => (name) => {
  return name ? styles[`${prefix}__${name}`] : styles[`${prefix}`];
};
