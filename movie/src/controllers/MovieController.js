import Joi from 'joi';

import prisma from '@prisma/client';
import Controller from './Controller.js';

const { ParentalGuidance } = prisma;

const schema = Joi.object({
  name: Joi.string().required(),
  director: Joi.string().required().min(3).max(50),
  duration: Joi.number().integer().positive().max(500),
  rating: Joi.number().max(10),
  thumbnail: Joi.string().allow(''),
  languages: Joi.array().items(Joi.string()),
  description: Joi.string().required().max(10000),
  parentalGuidance: Joi.string().required().valid(
    ...Object.values(ParentalGuidance),
  ),
});

class MovieController extends Controller {
  constructor() {
    super({ entity: 'movie', validationSchema: schema });
  }
}

export default MovieController;
