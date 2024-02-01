import axios from "axios";
import buildPath from "../components/Path";

async function getAllWiki(countryID, filters = undefined) {
   const url = buildPath("/all_wiki");
   let obj = {
      countryID: countryID,
      filters: filters ? filters : null,
   };
   let config = {
      method: "get",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
      withCredentials: false,
      data: obj,
   };

   const response = await axios(config).catch(function (error) {
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser
         // and an instance of http.ClientRequest in node.js
         console.log(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log("Error", error.message);
      }
   });
   return response.data;
}

export { getAllWiki };
