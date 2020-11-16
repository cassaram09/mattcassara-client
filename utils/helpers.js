import axios from "axios";
import API from "./API";
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
export const range = (integer = 0, start = 0) =>
  [...Array(parseInt(integer || 0)).keys()].map((i) => i + parseInt(start));

// Capitalize a string.
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// abbreviate class name with a prefix
export const _classes = (styles) => (name) => {
  if (typeof name === "string") {
    return styles[name];
  }

  if (Array.isArray(name)) {
    return name.map((n) => styles[n] || "").join(" ");
  }

  return "";
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const serverRedirect = (res, path) => {
  res.writeHead(301, { Location: path });
  res.end();
};

export const fetchData = async () => {
  try {
    const { data } = await axios({
      url: "https://data.cityofnewyork.us/resource/feu5-w2e2.json",
      method: "GET",
      params: {
        $limit: 10,
        $$app_token: process.env.NEXT_PUBLIC_NYC_OPEN_DATA_APP_TOKEN,
      },
    });
    console.log(data);

    const payload = data.map((rec) => {
      return {
        city: rec.businesscity,
        apartment: rec.businessapartment,
        house_number: rec.businesshousenumber,
        state: rec.businessstate,
        zip: rec.businesszip,
        street_name: rec.businessstreetname,
        registration_id: rec.registrationid,
        registration_contact_id: rec.registrationcontactid,
        type: rec.type,
        corporation_name: rec.corporationname,
        first_name: rec.first_name,
        last_name: rec.last_name,
        title: rec.corporationname || rec.firstname + " " + rec.lastname,
        contact_description: rec.contact_description,
      };
    });

    new API().post("/landlords/bulk_create", payload);
  } catch (e) {
    console.error(e);
  }
};
