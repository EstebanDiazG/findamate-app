import axios from "axios";

import { config } from "@/utils/config";

const apiInstance = axios.create({
  baseURL: `${config.apiURL}`,
  headers: { duoc: config.apiKey },
});

export { apiInstance };
