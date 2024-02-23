import MockAxios from "axios";
import { getAllWiki } from "../wikiUtil";

describe("getAllWiki", () => {
   const mockRequestBody = {
      countryID: 1,
      filters: [
         true,
         true,
         true,
         true,
         true,
         true,
         true,
         true,
         true,
         true,
         true,
         true,
      ],
   };
   it("should not call axios if the countryID is not present", async () => {
      await getAllWiki(null);
      expect(MockAxios.request).not.toHaveBeenCalled();
   });

   it("tests if getAllWiki can return list if connected to API", async () => {
      const mockResponse = {
         data: [
            {
               mapId: 5,
               id: 1,
               title: "Buckingham Palace",
               description: "A place in England",
               longitude: -0.140634,
               latitude: 51.501476,
               political: true,
               military: false,
               economic: false,
               social: false,
               information: false,
               infrastructure: false,
               areas: false,
               structures: false,
               capabilities: false,
               organization: false,
               people: false,
               events: false,
            },
         ],
      };
      MockAxios.request.mockResolvedValueOnce(mockResponse);

      // work
      const countries = await getAllWiki(
         mockRequestBody.countryID,
         mockRequestBody.filters
      );

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

      MockAxios.request.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await getAllWiki(
         mockRequestBody.countryID,
         mockRequestBody.filters
      );

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

      MockAxios.request.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await getAllWiki(
         mockRequestBody.countryID,
         mockRequestBody.filters
      );

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

      MockAxios.request.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await getAllWiki(
         mockRequestBody.countryID,
         mockRequestBody.filters
      );

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Error", mockError.message);

      // assertion for function output
      expect(countries).toBe(null);
      logSpy.mockRestore();
   });
});
