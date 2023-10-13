const { camelCaseToSnakeCase, snakeCaseToCamelCase } = require("../../utils/formatProperties");

describe("formatProperties", () => {

    test("formattingToCamelCase", () => {

        const snakeCaseObj = camelCaseToSnakeCase({ "_id": "", "testeUm": "", "testeDois": "", "testeTres": "" });

        const hasUpperCaseLetter = false;

        Object.keys(snakeCaseObj).map(prop => {
            if ((/([a-z])([A-Z])/g).test(prop)) hasUpperCaseLetter = true;
        });

        expect(hasUpperCaseLetter).not.toBe(true);
    });
    
    test("formattingToCamelCase", () => {

        const camelCaseObj = snakeCaseToCamelCase({ "_id": "", "teste_um": "", "teste_dois": "", "teste_tres": "" });

        const hasUnderscore = false;

        Object.keys(camelCaseObj).map(prop => {
            if ((/_([a-z])/g).test(prop)) hasUpperCaseLetter = true;
        });

        expect(hasUnderscore).not.toBe(true);
    });
});