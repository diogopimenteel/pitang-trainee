import Joi from 'joi';

import prisma from '@prisma/client';
import Controller from './Controller.js';

const { Room, SeatStatus, SeatType } = prisma;

const schema = Joi.object({
  sessionDate: Joi.date(),
  room: Joi.string().required().valid(...Object.values(Room)),
  caption: Joi.required().boolean(),
  movie: Joi.object({
    connect: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  SessionSeats: Joi.any(),
});

class SessionController extends Controller {
  constructor() {
    super({
      entity: 'session',
      validationSchema: schema,
      prismaOptions: {
        include: { movie: true, Ticket: true, SessionSeats: true },
      },
    });

    this.excludeColumns = [
      { line: 'A', columns: [1, 3] },
      { line: 'B', columns: [3] },
    ];
    this.maxOfColumns = 5;
    this.maxOfRows = 5;
  }

  generateSeats() {
    const seats = [];

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let i = 0; i < this.maxOfRows; i++) {
      for (let j = 0; j < this.maxOfColumns; j++) {
        const column = j++;
        const line = alphabet[i];

        const isExcluded = this.excludeColumns.find(
          (excludeColumn) => excludeColumn.columns.includes(j + 1) && excludeColumn.line === line,
        );

        if (!isExcluded) {
          seats.push({
            line,
            column,
            type: SeatType.STANDARD,
            status: SeatStatus.AVAILABLE,
          });
        }
      }
    }

    return seats;
  }

  store(request, response) {
    const { movieId } = request.body;

    delete request.body.movieId;

    request.body = {
      ...request.body,
      movie: {
        connect: {
          id: movieId,
        },
      },
      SessionSeats: { createMany: { data: this.generateSeats() } },
    };
    super.store(request, response);
  }
}

export default SessionController;
