import { getEnvironments, getApps, getArgPosition, parameterPositioning } from './args';

const ENVIRONMENTS = getEnvironments();
const APPS = getApps();
const ARGUMENT_POSITION = getArgPosition();

export const getEnvironment = (args) => {
    const environment = args.find((environment) => ENVIRONMENTS.includes(environment));
    if (!environment) {
        throw new Error(
            `Environment ${
                args[parameterPositioning.environment]
            } is not a valid environment. Try one of ${ENVIRONMENTS}`,
        );
    } else {
        return environment;
    }
};

export const getApp = (args) => {
    const app = args.find((app) => APPS.includes(app));
    if (!app) {
        throw new Error(
            `App ${args[parameterPositioning.app]} is not a valid app. Try one of ${APPS}`,
        );
    } else {
        return app.toUpperCase();
    }
};

export const formatProcessedArguments = (args, argumentPosition = ARGUMENT_POSITION) => {
    if (argumentPosition === 2) {
        return args.toLowerCase().split(':');
    }
    return args.split(':');
};

export const getProcessedArguments = (argumentPosition = ARGUMENT_POSITION) => {
    const args = process.argv.slice(argumentPosition)[0];
    if (!args) {
        return [];
    }
    return formatProcessedArguments(args, argumentPosition);
};
