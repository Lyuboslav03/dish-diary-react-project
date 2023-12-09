export const validateStructure = (values) => {
    const errors = {};

    if (values.ingredients.split("\n").length === 1) {
        errors.ingredients = "Please separate ingredients by new line";
    }
    
    if (values.steps.split("\n").length === 1) {
        errors.steps = "Please separate steps by new line";
    }

    return errors;
}