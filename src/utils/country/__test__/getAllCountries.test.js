import MockAxios from "axios";
import { getAllCountries } from "../countryUtil";

describe("Testing getAllCountries function", () => {
   beforeAll;
   it("tests if getAllCountries can return list if connected to API", async () => {
      const mockResponse = {
         data: [
            {
               id: 1,
               countryName: "United States",
               latitude: 37.0902,
               longitude: 95.7129,
            },
            {
               id: 2,
               countryName: "Mexico",
               latitude: 23.6345,
               longitude: 102.5528,
            },
         ],
      };
      MockAxios.get.mockResolvedValueOnce(mockResponse);

      // work
      const countries = await getAllCountries();

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
      const countries = await getAllCountries();

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
      const countries = await getAllCountries();

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
      const countries = await getAllCountries();

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Error", mockError.message);

      // assertion for function output
      expect(countries).toBe(null);
      logSpy.mockRestore();
   });
});
