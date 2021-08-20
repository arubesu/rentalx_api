import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './createSpecificationUseCase';

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

  handle(
    request: Request,
    response: Response,
  ): Response<any, Record<string, any>> {
    const { name, description } = request.body;

    this.createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
