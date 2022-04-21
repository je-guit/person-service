#!/usr/bin/env node
/* eslint-disable no-new */

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import DevConfiguration from './configuration/development';
import PersonServiceStack from '../lib/person-service-stack';

const app = new cdk.App();
new PersonServiceStack(app, 'person-service-stack-dev', DevConfiguration);
