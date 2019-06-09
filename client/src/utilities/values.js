const debug = true;
const baseUrl = debug ? "http://localhost:9000" : "https://";

const values = {
  server: {
    baseUrl: baseUrl
  },
  settings: {
    debug
  }
};

export default values;
