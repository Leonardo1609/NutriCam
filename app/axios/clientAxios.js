import axios from "axios";
import { restapi_url } from "../environment/environment";

export const clientAxios = axios.create({
	baseURL: restapi_url,
});
