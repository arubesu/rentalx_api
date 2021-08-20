import { Request, Response } from 'express';

import { ListSpecificationUseCase } from './listSpecificationUseCase';

class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) { }

  handle(
    request: Request,
    response: Response,
  ): Response<any, Record<string, any>> {
    const categories = this.listSpecificationUseCase.execute();

    return response.json(categories);
  }
}

export { ListSpecificationController };
