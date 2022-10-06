import axios from "axios";

export default axios.create({
  baseURL: "https://docker-datatbl.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});