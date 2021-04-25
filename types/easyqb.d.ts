import { SQF } from './sq'

interface StatusResponse {
    success: boolean;
    body?: any;
}

interface Configuration {
    oneCallback(trx: any, tableName: string): Promise<Record<string, any> | StatusResponse>;
    allCallback(trx: any, tableName: string): Promise<Record<string, any>[] | StatusResponse>;
    tableName?: string;
}

/**
* Creates and returns a query builder with the given configuration
*/
export declare function easyqb(config?: Configuration): SQF