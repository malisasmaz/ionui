import { handleValidation } from "../utils";

let info = {
    userName: "mali",
    password: "mali"
}

describe("utility functions", () => {
    it("userName is not valid", () => {
        let value = "123."
        expect(handleValidation({ ...info, userName: value })).toBe(false);
    })

    it("userName is valid", () => {
        expect(handleValidation({ info })).toBe(false);
    })

    it("userName is not valid", () => {
        let value = "123/"
        expect(handleValidation({ ...info, userName: value })).toBe(false);
    })

    it("password is valid", () => {
        expect(handleValidation({ info })).toBe(false);
    })

    it("password is not valid", () => {
        let value = ""
        expect(handleValidation({ ...info, password: value })).toBe(false);
    })
})