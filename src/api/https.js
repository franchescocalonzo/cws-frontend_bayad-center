import axios from "axios";

import { url } from "../../config.json";

export default axios.create({ baseURL: url });
