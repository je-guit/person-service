import { PartialDeep } from 'type-fest';
import { defaultsDeep } from 'lodash';
import { PersonStackProps, Environment } from './stack-environment-types';

const getStackConfiguration = (env: Environment, config: PartialDeep<PersonStackProps>)
: PersonStackProps => defaultsDeep({}, config, {
  environment: env,
  tags: {},
  env: {
    region: 'eu-west-1',
    account: '',
  },
  restApi: {
    person: {
      stageName: 'v1',
    },
  },
} as PersonStackProps);

export default getStackConfiguration;
