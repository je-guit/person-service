#!/usr/bin/env node
/* eslint-disable import/prefer-default-export */

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import DevConfiguration from './environment-configuration/development';
import PersonServiceStack from '../lib/person-service-stack';

const app = new cdk.App();
export const personServiceStackDev = new PersonServiceStack(app, 'person-service-stack-dev', DevConfiguration);
