import axios from "axios";
import buildPath from "../../components/Path";

// handles request to get all countries
async function getAllCountries() {
   let url = buildPath("/all_countries");
   let response = await axios
      .get(url, {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
               "Origin, X-Requested-With, Content-Type, Accept",
         },
      })
      .catch(function (error) {
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

// handles request to add new country with info from requestBody
async function addCountry(requestBody) {
   if (!requestBody) {
      return null;
   }
   const url = buildPath("/add_country");
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

   const response = await axios
      .request(config)
      .then((res) => {
         if (res.status === 201 || res.status === 200) {
            return res;
         }
         if (res.status === 400) {
            const error = res.text();
            throw new Error(error);
         }
      })
      .catch(function (error) {
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

// handles request to update a country with info from requestBody
async function updateCountry(requestBody) {
   if (!requestBody) {
      return;
   }
   const url = buildPath("/update_country");
   let obj = requestBody;

   let config = {
      method: "put",
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

   const response = await axios.request(config).catch(function (error) {
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
         console.log(error.message);
      }
      // do some error handling
      return;
   });
   console.log("country updated");
   return response.data;
}

// deletes country with given countryID
async function deleteCountry(countryID) {
   if (!countryID) {
      return;
   }
   const url = buildPath("/delete_country/" + countryID);

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
            console.log(`Country ${countryID} Successfully Deleted`);
         }
         if (res.status === 400) {
            const error = res.text();
            throw new Error(error);
         }
      })
      .catch(function (error) {
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

export { getAllCountries, addCountry, updateCountry, deleteCountry };
