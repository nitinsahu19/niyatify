import validator from 'validator'

export const validateSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter valid email");
  } else {
    if (!validator.isStrongPassword(password)) {
      throw new Error("Enter an strong password");
    }
  }
};
