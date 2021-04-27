import { SQF } from './sq'

interface Configuration {
    oneCallback(trx: any, tableName: string): Promise<Record<string, any> | number>;
    allCallback(trx: any, tableName: string): Promise<Record<string, any>[] | number>;
    tableName?: string;
}

/**
* Creates and returns a query builder with the given configuration
*/
export declare function easyqb(config?: Configuration): SQF