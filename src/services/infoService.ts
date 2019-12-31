import { BaseService } from "./baseService";
import Serverless from "serverless";
import { ServiceInfo } from "../models/serverless"

export class AzureInfoService extends BaseService {
  
  public constructor(serverless: Serverless, options: Serverless.Options) {
    super(serverless, options);
  }

  public stringifiedInfo() {

  }

  public getInfo(): ServiceInfo {

  }
}