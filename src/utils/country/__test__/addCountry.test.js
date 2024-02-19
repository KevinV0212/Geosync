import MockAxios from "axios";
import { addCountry } from "../countryUtil";

describe("Testing addCountry function", () => {
   const mockRequestBody = {
      id: 5,
      countryName: "Brazil",
      latitude: 123.2342,
      longitude: 32.2039,
   };
   it("should not call axios if the request body is not present", async () => {
      await addCountry(null);
      expect(MockAxios.request).not.toHaveBeenCalled();
   });
   it("should return data if status code equals 200", async () => {
      const mockResponse = { status: 200, data: "fake data" };
      MockAxios.request.mockResolvedValueOnce(mockResponse);
      const data = await addCountry(mockRequestBody);
      expect(data).toEqual("fake data");
   });

   it("should return a rejected value of {data: null} if arises", async () => {
      const mRes = { status: 400, text: jest.fn().mockReturnValue("network") };
      MockAxios.request.mockRejectedValue(mRes);
      const data = await addCountry(mockRequestBody);
      expect(data).toBeNull();
   });
});
