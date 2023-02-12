type App = 'PETSTORE';
type Environment = 'LOCALHOST' | 'DEV' | 'PROD';

const app = process.env.app as App;
const env = process.env.env as Environment;

export type EnvironmentConfig = {
    URL?: string;
};

const CONFIG: Record<App, Record<Environment, EnvironmentConfig>> = {
    PETSTORE: {
        PROD: {
            URL: 'https://petstore.swagger.io/v2',
        },
        DEV: {},
        LOCALHOST: {},
    },
};

export const getEnv = (): EnvironmentConfig => {
    return CONFIG[app][env];
};
