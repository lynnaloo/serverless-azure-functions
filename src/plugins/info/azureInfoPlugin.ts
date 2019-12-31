import Serverless from "serverless";
import { AzureBasePlugin } from "../azureBasePlugin";
import { constants } from "../../shared/constants";

export class AzureInfoPlugin extends AzureBasePlugin {

  public constructor(serverless: Serverless, options: Serverless.Options) {
    super(serverless, options);

    this.hooks = {
      "info:info": this.info.bind(this)
    };

    this.commands = {
      info: {
        usage: "Get information about deployed Azure resources for service",
        lifecycleEvents: [
          "info",
        ],
        options: {
          ...constants.deployedServiceOptions
        }
      }
    }
  }

  private async info() {
    /**
     * TODO print info about deployed service
     * Resource Group Name
     *    Resources within group w/ types
     * Function App Name(s)
     *    Functions within app, enabled or not
     *    Runtime
     *    Version
     * Metrics??
     */
  }
}