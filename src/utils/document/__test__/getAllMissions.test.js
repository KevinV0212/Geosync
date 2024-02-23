import MockAxios from "axios";
import { getAllMissions } from "../missionDocUtil";

describe("getAllMissions", () => {
   it("tests if getAllMissions can return list if connected to API", async () => {
      const mockResponse = {
         data: [
            {
               id: 1,
               link: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
               title: "",
               description: "",
            },
            {
               id: 2,
               link: "https://www.youtube.com/watch?v=F0Gkr4MBEO0&ab_channel=demovenom",
               title: "",
               description: "",
            },
         ],
      };
      MockAxios.get.mockResolvedValueOnce(mockResponse);

      // work
      const countries = await getAllMissions();

      // assertions
      expect(countries).toEqual(mockResponse.data);
   });

   // ERROR CASES ----------------------------------------------------------------------

   it("should console.log information of an error with a response property", async () => {
      const mockError = {
         response: {
            data: "data",
            status: "status",
            headers: "headers",
         },
      };

      MockAxios.get.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await getAllMissions();

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(3);
      expect(logSpy).toHaveBeenCalledWith(mockError.response.data);
      expect(logSpy).toHaveBeenCalledWith(mockError.response.status);
      expect(logSpy).toHaveBeenCalledWith(mockError.response.headers);

      // assertion for function output
      expect(countries).toBe(null);
      logSpy.mockRestore();
   });

   it("should console.log information of an error with a request property", async () => {
      const mockError = {
         request: "request",
      };

      MockAxios.get.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await getAllMissions();

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(mockError.request);

      // assertion for function output
      expect(countries).toBe(null);
      logSpy.mockRestore();
   });

   it("should console.log information of any other error", async () => {
      const mockError = {
         message: "message",
      };

      MockAxios.get.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await getAllMissions();

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Error", mockError.message);

      // assertion for function output
      expect(countries).toBe(null);
      logSpy.mockRestore();
   });
});
