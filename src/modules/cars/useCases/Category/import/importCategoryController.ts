import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './importCategoryUseCase';

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

  handle(request: Request, response: Response): Response {
    const { file } = request.body;

    console.log(file);

    return response.send();
  }
}

export { ImportCategoryController };
