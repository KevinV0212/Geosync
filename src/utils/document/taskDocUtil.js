import axios from "axios";
import buildPath from "../../components/Path";

async function getAllTasks() {
   let url = buildPath("/all_tasks");
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

async function addTask(requestBody) {
   if (!requestBody) {
      return;
   }
   const url = buildPath("/add_task");
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

   axios.request(config).catch(function (error) {
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
   console.log("task document added");
}

async function deleteTask(taskID) {
   if (!taskID) {
      return;
   }
   const url = buildPath("/delete_task/" + taskID);

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

   await axios.request(config).catch(function (error) {
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
   console.log("task document: " + taskID + " deleted");
}

export { getAllTasks, addTask, deleteTask };
