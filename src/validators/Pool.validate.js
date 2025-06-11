import { BadRequestError } from "../handler/error.reponse.js";

export default class PollValidator {

  checkAddPoll = async (req, res, next) => {
    try {
      const { title, description, options } = req.body;

      if (!title || title.trim().length < 10) {
        throw new BadRequestError("Title must be at least 10 characters!");
      }

      if (!description || description.trim().length < 10) {
        throw new BadRequestError("Description must be at least 10 characters!");
      }

      if (!Array.isArray(options) || options.length < 1) {
        throw new BadRequestError("Options must have at least one option!");
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  checkUpdatePoll = async (req, res, next) => {
  try {
    const { title, description, options, isLocked } = req.body;

    if (title !== undefined && title.trim().length < 10) {
      throw new BadRequestError("Title must be at least 10 characters!");
    }

    if (description !== undefined && description.trim().length < 10) {
      throw new BadRequestError("Description must be at least 10 characters!");
    }

    if (options !== undefined) {
      if (!Array.isArray(options) || options.length < 1) {
        throw new BadRequestError("Options must have at least one option!");
      }
    }

    if (isLocked !== undefined && typeof isLocked !== "boolean") {
      throw new BadRequestError("Lock status must be boolean if provided!");
    }

    next(); 
  } catch (error) {
    next(error);
  }
  };


  checkAddOption = async (req, res, next) => {
    try {
      const { text } = req.body;

      if (!text || text.trim().length === 0) {
        throw new BadRequestError("Text option is required!");
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
