export const loadGoogleApis = () => {
  let script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_URL_GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = false;
  document.body.append(script);
  console.log("Google API loaded.");
};
