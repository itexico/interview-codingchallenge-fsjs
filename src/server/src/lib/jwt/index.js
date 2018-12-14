import jwt from "jsonwebtoken";
import { ErrorHandler } from "../../api/components/utils";

const checkError = error => {
  if (
    error instanceof jwt.JsonWebTokenError ||
    error instanceof jwt.NotBeforeError ||
    error instanceof jwt.TokenExpiredError
  ) {
    throw new ErrorHandler(error.message, ErrorHandler.unauthorized(), {
      reason: {
        jwt: { name: error.name, date: error.date, expiredAt: error.expiredAt }
      }
    });
  }

  throw new ErrorHandler(error.message, ErrorHandler.internal(), { error });
};

const sign = async (secret, token) => {
  try {
    const signed = await jwt.sign({ token }, secret, { expiresIn: "1h" });

    return signed;
  } catch (error) {
    throw checkError(error);
  }
};

const verify = async (token, secret) => {
  try {
    const decoded = await jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    throw checkError(error);
  }
};

export default { sign, verify };
