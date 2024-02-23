import MockAxios from "axios";
import { updateCountry } from "../countryUtil";

describe("updateCountry", () => {
   const mockRequestBody = {
      countryName: "Brazil",
      latitude: 123.2342,
      longitude: 32.2039,
   };

   it("should not call axios if the request body is not present", async () => {
      await updateCountry(null);
      expect(MockAxios.request).not.toHaveBeenCalled();
   });

   it("should return the information of the newly added country if updated successfully", async () => {
      const mockResponse = {
         data: {
            id: 1,
            countryName: "Brazil",
            latitude: 123.2342,
            longitude: 32.2039,
         },
      };
      MockAxios.request.mockResolvedValueOnce(mockResponse);

      const newCountry = await updateCountry(mockRequestBody);

      expect(newCountry).toEqual(mockResponse.data);
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
      const countries = await updateCountry(mockRequestBody);

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
      const countries = await updateCountry(mockRequestBody);

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
      const countries = await updateCountry(mockRequestBody);

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Error", mockError.message);

      // assertion for function output
      expect(countries).toBe(null);
      logSpy.mockRestore();
   });
});
