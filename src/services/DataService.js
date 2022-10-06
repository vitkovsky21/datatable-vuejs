import http from "../http-common";

class DataService {
    getAll() {
      return http.get("/datatables");
    }
}
export default new DataService();