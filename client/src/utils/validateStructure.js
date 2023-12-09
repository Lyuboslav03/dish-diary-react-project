export const validateStructure = (values) => {
    const errors = {};

    let ingObj = {};
    let stepsObj = {};

    Object.keys(values).forEach((value) => {
        if (value === "ingredients") {
            ingObj[value] = values[value];
        }

        if (value === "steps") {
            stepsObj[value] = values[value];
        }
    })

    Object.keys(ingObj).forEach((value) => {
        if (ingObj[value].includes(",")) {
            errors[value] = "Please separate ingredients by a new line";
        }
    })

    Object.keys(stepsObj).forEach((value) => {
        if (stepsObj[value].includes(",")) {
            errors[value] = "Please separate steps by a new line";
        }
    })

    return errors;
}