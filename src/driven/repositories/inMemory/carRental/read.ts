import 'reflect-metadata';
import Car from 'src/core/domain/car/model';
import CarModel from 'src/core/domain/carModel/model';
import CarRentalReadRepositoryInterface from 'src/core/domain/carRental/interfaces/repositories/read';
import CarRental from 'src/core/domain/carRental/model';
import { inject, injectable } from 'tsyringe';
import UnitOfWork from '../common/unitOfWork';

@injectable()
export default class InMemoryCarRentalReadRepository implements CarRentalReadRepositoryInterface {
    private readonly unitOfWork: UnitOfWork;

    constructor(@inject('UnitOfWork') unitOfWork: UnitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async read(carRentalId: string): Promise<CarRental> {
        const inMemoryCarRental = this.unitOfWork.carRentals.find((carRental) => carRental.id === carRentalId)!;
        const inMemoryCarId = inMemoryCarRental.carId;
        const inMemoryCar = this.unitOfWork.cars.find((car) => car.id === inMemoryCarId)!;
        const inMemoryCarModel = this.unitOfWork.carModels.find((model) => model.id === inMemoryCar.modelId)!;
        return new CarRental({
            ...inMemoryCarRental,
            car: new Car({ ...inMemoryCar, model: new CarModel(inMemoryCarModel) }),
        });
    }
}
