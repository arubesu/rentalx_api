import { inject, injectable } from 'tsyringe';

import ICarsImagesRepository from '@modules/cars/repositories/Car/ICarImagesRepository';

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImageUseCase };
