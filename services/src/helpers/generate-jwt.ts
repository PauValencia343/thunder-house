
import jwt from "jsonwebtoken";

// Generate a JWT token with the provided UID (user ID)
export const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const secretKey: string = process.env.SECRET_OR_PRIVATE_KEY || "";

    if (secretKey !== "") {
      jwt.sign(
        payload,
        secretKey,
        {
          expiresIn: "2d", // Token expires in 2 days
        },
        (err: Error | null, token) => {
          if (err) {
            console.log(err);
            reject("Unable to generate the token");
          } else if (token) {
            // Check if token is truthy
            resolve(token);
          } else {
            reject("Token is null or undefined");
          }
        }
      );
    } else {
      reject("Secret key not detected");
    }
  });
};
