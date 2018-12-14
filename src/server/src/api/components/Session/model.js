// TODO: Test and make Seeder
import mongooseDelete from "mongoose-delete";
import mongoose, { Schema } from "mongoose";
import mongooseKeywords from "mongoose-keywords";
import { internet } from "faker";
import slugify from "@sindresorhus/slugify";
import { typeCheck } from "type-check";

import { ErrorHandler } from "../utils";
import { crypto, JWT } from "../../../lib";
import config from "../../../config/config";

const checkError = error =>
  ErrorHandler.isComposed(error)
    ? error
    : new ErrorHandler(error.message, ErrorHandler.internal(), { error });
const checkEmpty = (data, message, reason, type) => {
  if ((Array.isArray(data) && data.length === 0) || !data) {
    throw new ErrorHandler(
      message,
      type || ErrorHandler.unauthorized(),
      reason
    );
  }
};

const decode = async jwt => {
  const { token } = await JWT.verify(jwt, SECRET);

  const _token = crypto.decodeHex(token);

  return { token, sToken: _token };
};

const skipInit = process.env.NODE_ENV === "test";
const SECRET = config("secret");

const SessionSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true
    },
    username: {
      type: String,
      required: true,
      index: true
    },
    refreshToken: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

class Session {
  getData() {
    return {
      token: crypto.hashHex(this.token),
      refreshToken: this.refreshToken
    };
  }

  static async getSession(jwt, hydrated = false) {
    try {
      const { sToken } = await decode(jwt);

      const session = await this.findOne({ token: sToken }).exec();

      checkEmpty(session, "Session Not exists", { jwt });

      return hydrated ? session : session.getData();
    } catch (error) {
      throw checkError(error);
    }
  }

  static async sessionExists(jwt) {
    try {
      const { sToken } = await decode(jwt);
      const sessions = await this.find({ token: sToken }).exec();

      checkEmpty(sessions, "Session Not exists", { jwt });

      return true;
    } catch (error) {
      throw checkError(error);
    }
  }

  static async createSession() {
    try {
      const username = internet.userName();
      const token = crypto.randomHex();
      const refreshToken = crypto.randomHex(32);

      const session = await this.create({ token, username, refreshToken });

      const hashedSession = session.getData();
      const jwt = await JWT.sign(SECRET, hashedSession.token);

      return { token: jwt, refreshToken: hashedSession.refreshToken };
    } catch (error) {
      throw checkError(error);
    }
  }

  static async refreshSession(refreshToken) {
    try {
      const _rToken = crypto.decodeHex(refreshToken);
      const session = await this.findOne({ refreshToken: _rToken }).exec();

      checkEmpty(session, "Refresh Token not valid", { refreshToken });

      session.set({
        token: crypto.randomHex(),
        refreshToken: crypto.randomHex(32)
      });

      await session.save();

      const hashedSession = session.getData();

      const jwt = await JWT.sign(SECRET, hashedSession.token);

      return { token: jwt, refreshToken: hashedSession.refreshToken };
    } catch (error) {
      throw checkError(error);
    }
  }

  static async deleteSession(jwt) {
    try {
      const { sToken } = await decode(jwt);

      const session = await this.delete({ token: sToken }).exec();

      checkEmpty(session, "Session not valid", { jwt });

      return true;
    } catch (error) {
      throw checkError(error);
    }
  }
}

SessionSchema.loadClass(Session);

Session.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: true
});

const model = skipInit
  ? mongoose.model("Session", SessionSchema, "Session", skipInit)
  : mongoose.model("Session", SessionSchema);

export default model;
