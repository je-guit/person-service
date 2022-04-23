import { Environment } from '../stack-environment-types';
import getStackConfiguration from '../stack-configuration';

const DevConfiguration = getStackConfiguration(Environment.DEV, {
  env: {
    account: '',
  },
});

export default DevConfiguration;
