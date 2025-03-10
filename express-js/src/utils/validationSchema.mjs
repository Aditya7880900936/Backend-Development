export const createUserValidationSchema = {
    name:{
        isLength:{
            options:{
                min:5,
                max:32,
            },
            errorMessage:"Name must be between 5 and 32 characters",
        },
        notEmpty: {
            errorMessage:"Name is required",
        },
        isString: {
            errorMessage:"Name must be a string",
        },
    },
    displayName:{
        notEmpty:{
            errorMessage:"Display Name is required"
        }
    }
}