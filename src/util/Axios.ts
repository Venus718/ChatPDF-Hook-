import axios from "axios";

const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json', // 
    'x-api-key': 'sec_DKWJeJszE8gRrprmNgAejRRafQmWmSJH', // 
  },
});

export default Axios;