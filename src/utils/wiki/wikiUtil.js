import axios from "axios";
import buildPath from "../Path";

async function getAllWiki(countryID, filters = undefined) {
   if (!countryID) {
      return null;
   }
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

   const response = await axios.request(config).catch((error) => {
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
      return { data: null };
   });
   return response.data;
}

async function getWikiEntries(countryID) {
   const url = buildPath("/get_wikientries");
   let obj = {
      countryID: countryID,
   };
   let config = {
      method: "post",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
      data: obj,
   };

   const response = await axios.request(config).catch((error) => {
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
async function addWikiEntry(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/add_wiki");
   let obj = requestBody;

   let config = {
      method: "post",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
      data: obj,
   };

   const response = await axios.request(config).catch((error) => {
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
      return { data: null };
   });
   return response.data;
}

async function updateWikiEntry(requestBody) {}

// deletes map pin with given mapPinID
async function deleteWikiEntry(wikiEntryID) {
   if (!wikiEntryID) {
      return;
   }
   const url = buildPath("/delete_wiki/" + wikiEntryID);

   let config = {
      method: "delete",
      url: url,
      headers: {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
         },
      },
   };

   await axios
      .request(config)
      .then((res) => {
         if (res.status === 201 || res.status === 200) {
            console.log(`Wiki Entry ${wikiEntryID} Successfully Deleted`);
         }
         if (res.status === 400) {
            const error = res.text();
            throw new Error(error);
         }
      })
      .catch((error) => {
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
}

export {
   getAllWiki,
   getWikiEntries,
   addWikiEntry,
   deleteWikiEntry,
   updateWikiEntry,
};
