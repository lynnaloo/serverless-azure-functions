"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var armTemplates_1 = require("../../models/armTemplates");
var namingService_1 = require("../../services/namingService");
var AppServicePlanResource = /** @class */ (function () {
    function AppServicePlanResource() {
    }
    AppServicePlanResource.getResourceName = function (config) {
        var options = {
            config: config,
            resourceConfig: config.provider.appServicePlan,
            suffix: "asp",
        };
        return namingService_1.AzureNamingService.getResourceName(options);
    };
    AppServicePlanResource.prototype.getTemplate = function () {
        var parameters = {
            appServicePlanName: {
                defaultValue: "",
                type: armTemplates_1.ArmParamType.String
            },
            location: {
                defaultValue: "",
                type: armTemplates_1.ArmParamType.String
            },
            appServicePlanSkuName: {
                defaultValue: "EP1",
                type: armTemplates_1.ArmParamType.String
            },
            appServicePlanSkuTier: {
                defaultValue: "ElasticPremium",
                type: armTemplates_1.ArmParamType.String
            }
        };
        return {
            "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            "contentVersion": "1.0.0.0",
            parameters: parameters,
            "variables": {},
            "resources": [
                {
                    "apiVersion": "2016-09-01",
                    "name": "[parameters('appServicePlanName')]",
                    "type": "Microsoft.Web/serverfarms",
                    "location": "[parameters('location')]",
                    "properties": {
                        "name": "[parameters('appServicePlanName')]",
                        "workerSizeId": "3",
                        "numberOfWorkers": "1",
                        "maximumElasticWorkerCount": "10",
                        "hostingEnvironment": ""
                    },
                    "sku": {
                        "name": "[parameters('appServicePlanSkuName')]",
                        "tier": "[parameters('appServicePlanSkuTier')]"
                    }
                }
            ]
        };
    };
    AppServicePlanResource.prototype.getParameters = function (config) {
        var resourceConfig = __assign({ sku: {} }, config.provider.storageAccount);
        var params = {
            appServicePlanName: {
                value: AppServicePlanResource.getResourceName(config),
            },
            appServicePlanSkuName: {
                value: resourceConfig.sku.name,
            },
            appServicePlanSkuTier: {
                value: resourceConfig.sku.tier,
            }
        };
        return params;
    };
    return AppServicePlanResource;
}());
exports.AppServicePlanResource = AppServicePlanResource;
