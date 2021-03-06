/*
 * Copyright (c) 2017 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Steps extends Component {
  componentWillMount() {
    const { wizard, wizardInit } = this.context;

    // Register steps with Wizard if they're not already registered
    if (wizard && !wizard.steps.length) {
      const steps = React.Children.map(
        this.props.children,
        ({ props: { children, render, ...config } }) => config
      );
      wizardInit(steps);
    }
  }

  render() {
    const currentStep = this.props.step || this.context.wizard.step;
    const [child = null] = React.Children
      .toArray(this.props.children)
      .filter(step => currentStep && step.props.path === currentStep.path);
    return child;
  }
}

Steps.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string,
  }),
};

Steps.defaultProps = {
  step: null,
};

Steps.contextTypes = {
  wizard: PropTypes.object,
  wizardInit: PropTypes.func,
};

export default Steps;
