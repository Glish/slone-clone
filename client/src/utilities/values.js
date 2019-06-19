const debug = true;
const baseUrl = debug ? "http://localhost:9000" : "https://";

const values = {
  server: {
    baseUrl: baseUrl,
    apiVersion: "v1"
  },
  settings: {
    debug
  }
};

export default values;
