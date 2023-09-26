import {inject, singleton} from 'tsyringe';
import TransactionManagerInterface from '../../../../../core/domain/common/interfaces/transactionManager';
import {UnitOfWorkOriginatorInterface} from '../unitOfWork';
import InMemoryTransactionManager from './manager';
import TransactionInterface from '../../../../../core/domain/common/interfaces/transaction';

@singleton()
export default class InMemoryTransactionManagerProxy implements TransactionManagerInterface {
    private transactionManager: InMemoryTransactionManager;

    constructor(@inject("UnitOfWork") unitOfWork: UnitOfWorkOriginatorInterface) {
        this.transactionManager = new InMemoryTransactionManager(unitOfWork);
    }

    newTransaction(): TransactionInterface {
        return this.transactionManager.newTransaction();
    }
}