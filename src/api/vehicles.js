import { API_CONFIG } from "../config";
import { secureFetch } from "../util/secureFetch";

const BASE = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VEHICLES}`;

export const VehicleAPI = {
    getAll: () => secureFetch(`${BASE}`),
    getOne: (id) => secureFetch(`${BASE}/${id}`),
    rent: (id) => secureFetch(`${BASE}/${id}/rent`, { method: "POST" })
};
