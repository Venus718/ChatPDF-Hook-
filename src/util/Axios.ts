import axios from "axios";

const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json', // 
    'x-api-key': 'sec_I4Wkf6iCGhp2ZtkJk5exv4fXIMYRQf4v', // 
  },
});

export default Axios;