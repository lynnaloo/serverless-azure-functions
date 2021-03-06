import Serverless from "serverless";
import { ServerlessAzureFunctionConfig, ServerlessAzureConfig } from "../models/serverless";
export interface FunctionMetadata {
    entryPoint: any;
    handlerPath: any;
    params: any;
}
export declare class Utils {
    static getFunctionMetaData(functionName: string, serverless: Serverless): FunctionMetadata;
    static getEntryPointAndHandlerPath(handler: string, config: ServerlessAzureConfig): {
        entryPoint: string;
        handlerPath: string;
    };
    /**
     * Take the first `substringSize` characters from each string and return as one string
     * @param substringSize Size of substring to take from beginning of each string
     * @param args Strings to take substrings from
     */
    static appendSubstrings(substringSize: number, ...args: string[]): string;
    static get(object: any, key: string, defaultValue?: any): any;
    static getTimestampFromName(name: string): string;
    static getIncomingBindingConfig(functionConfig: ServerlessAzureFunctionConfig): import("../models/serverless").ServerlessAzureFunctionBindingConfig;
    static getOutgoingBinding(functionConfig: ServerlessAzureFunctionConfig): import("../models/serverless").ServerlessAzureFunctionBindingConfig;
    /**
     * Runs an operation with auto retry policy
     * @param operation The operation to run
     * @param maxRetries The max number or retreis
     * @param retryWaitInterval The time to wait between retries
     */
    static runWithRetry<T>(operation: (retry?: number) => Promise<T>, maxRetries?: number, retryWaitInterval?: number): Promise<T>;
    /**
     * Waits for the specified amount of time.
     * @param time The amount of time to wait (default = 1000ms)
     */
    static wait(time?: number): Promise<unknown>;
}
