import validator from "validator";

export const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid email");
  } else {
    if (!validator.isStrongPassword(password)) {
      throw new Error("Enter an strong password");
    }
  }
};

export const validateUpdateRequestData = (req) => {
  const allowedField = ["gender", "about", "skills"];

  const isAccepted = Object.keys(req.body).every((key) =>
    allowedField.includes(key)
  );

  return isAccepted;
};
