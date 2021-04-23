import { SQF } from './sq'

interface StatusResponse {
    success: boolean;
    body?: any;
}

interface Configuration {
    oneCallback(trx: any): Promise<Record<string, any> | StatusResponse>;
    allCallback(trx: any): Promise<Record<string, any>[] | StatusResponse>;
}

/**
* Creates and returns a query builder with the given configuration
*/
export declare function easyqb(config?: Configuration): SQF