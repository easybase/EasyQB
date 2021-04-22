import { SQF } from './sq'

interface Configuration {
    oneCallback(trx: any): Promise<Record<string, any>>;
    allCallback(trx: any): Promise<Record<string, any>[]>;
}

/**
* Creates and returns a query builder with the given configuration
*/
export declare function easyqb(config?: Configuration): SQF