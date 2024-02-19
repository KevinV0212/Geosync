import MockAxios from "axios";
import { deleteCountry } from "../countryUtil";

describe("Testing addCountry function", () => {
   it("should not call axios if the countryID is not present", async () => {
      await deleteCountry(null);
      expect(MockAxios.request).not.toHaveBeenCalled();
   });
   it("should log delete success message to console if response status is 200", async () => {
      const mockResponse = { status: 200 };
      MockAxios.request.mockResolvedValueOnce(mockResponse);
      const logSpy = jest.spyOn(console, "log");

      const data = await deleteCountry(1);

      expect(logSpy).toHaveBeenCalled();
   });

   // it("should return a rejected value of {data: null} if arises", async () => {
   //    const mRes = { status: 400, text: jest.fn().mockReturnValue("network") };
   //    MockAxios.request.mockRejectedValue(mRes);
   //    const data = await addCountry(mockRequestBody);
   //    expect(data).toBeNull();
   // });
});
