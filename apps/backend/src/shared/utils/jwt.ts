import jwt, { type SignOptions } from "jsonwebtoken";
import config from "../config/config";

export const createToken = (user: any) => {
  if (!config.JWT_SECRET) return undefined;
  if (!config.JWT_TIME) return undefined;

  const options: SignOptions = {
    expiresIn: config.JWT_TIME! as string,
  };
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.JWT_SECRET as string,
    options,
  );
  return token;
};
