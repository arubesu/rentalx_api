import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ReturnRentalUseCase } from './returnRentalUsecase';

class ReturnRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const returnRentalUsecase = container.resolve(ReturnRentalUseCase);

    const rental = await returnRentalUsecase.execute({ rentals_id: id });

    return response.status(201).json(rental);
  }
}

export { ReturnRentalController };
