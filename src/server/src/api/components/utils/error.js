import { typeCheck } from "type-check";
import Boom from "boom";

const TYPES = ["validation", "notFound", "internal", "unauthorized"];

class ComposedError extends Error {
  constructor(message, type, data) {
    if (
      !typeCheck("(String, String, Object | Undefined)", [message, type, data])
    ) {
      throw new ComposedError(
        `message must be String, type must be String and data must be Object: Given: ${message} - ${type} - ${data}`,
        ComposedError.internal()
      );
    }

    if (!TYPES.includes(type)) {
      throw Error(`Invalid type. Must be: ${TYPES}. Given: ${type}`);
    }

    super(message);
    this.data = data;
    this.type = type;
  }

  boomify() {
    /* eslint-disable indent */
    switch (this.type) {
      case ComposedError.notFound():
        return Boom.notFound(this.message, this.data);

      case ComposedError.validation():
        return Boom.badRequest(this.message, this.data);

      case ComposedError.internal():
        return new Boom(this.message, this.data);

      case ComposedError.unauthorized():
        return Boom.unauthorized(this.message, this.data);

      default:
        return new Boom("Internal Server Error", { data: this.data });
    }
    /* eslint-enable indent */
  }

  static notFound() {
    return "notFound";
  }

  static validation() {
    return "validation";
  }

  static internal() {
    return "internal";
  }

  static unauthorized() {
    return "unauthorized";
  }

  static isComposed(error) {
    return error instanceof ComposedError;
  }
}

export default ComposedError;
