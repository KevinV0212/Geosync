import MockAxios from "axios";
import { getMapPins } from "../mapUtil";

describe("getMapPins", () => {
   const mockRequestBody = {
      countryID: 1,
      filters: [true, true, true, true, true, true],
   };
   it("should not call axios if the countryID is not present", async () => {
      await getMapPins(null);
      expect(MockAxios.request).not.toHaveBeenCalled();
   });

   it("tests if getMapPins can return list if connected to API", async () => {
      const mockResponse = {
         data: [
            {
               countryID: 1,
               title: "Apostolic Palace",
               description:
                  "The Apostolic Palace (Latin: Palatium Apostolicum; Italian: Palazzo Apostolico) is the official residence of the Pope, the head of the Catholic Church, located in Vatican City.",
               longitude: 41.903611,
               latitude: 12.456389,
               political: true,
               military: false,
               social: false,
               information: false,
               infrastructure: false,
               id: 1,
               economy: false,
            },
            {
               countryID: 1,
               title: "Arch of the Bells",
               description:
                  "Arch of the Bells is a city gate in Municipio Roma XIV, Rome, Lazio. Arch of the Bells is situated nearby to the post office Poste Vaticane and the square Basilica Forecourt.",
               longitude: 12.45490191086849,
               latitude: 41.90181285056788,
               political: false,
               military: true,
               social: false,
               information: false,
               infrastructure: false,
               id: 2,
               economy: false,
            },
         ],
      };
      MockAxios.request.mockResolvedValueOnce(mockResponse);

      // work
      const countries = await getMapPins(
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
      const countries = await getMapPins(
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
      const countries = await getMapPins(
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
      const countries = await getMapPins(
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
