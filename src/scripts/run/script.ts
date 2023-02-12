import { exec } from 'child_process';

import { getProcessedArguments, getEnvironment, getApp } from './libs';

function runMocha() {
    const args = getProcessedArguments();
    const environment = getEnvironment(args).toUpperCase();
    const app = getApp(args).toUpperCase();
    const spec = 'tests/integration/**/**.spec.ts';

    const cmd = `env=${environment} app=${app} mocha -r ts-node/register -r tsconfig-paths/register ${spec} --grep --exit`;
    console.log('Executing command: ', cmd);
    const mocha = exec(cmd);

    mocha.stdout.setEncoding('utf8');

    mocha.stdout.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    mocha.on('close', (code) => {
        console.log(`process exited with code ${code}`);
        process.exit(code);
    });
}

runMocha();
