const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://ecommerce-bozena611-server.onrender.com"
    : "http://localhost:4000";

export default baseURL;
