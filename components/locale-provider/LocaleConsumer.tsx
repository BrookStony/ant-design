import React from 'react';
import PropTypes from 'prop-types';

export interface LocaleConsumerProps {
  componentName: string;
  defaultLocale: Object;
  children: (locale) => React.ReactElement<any>;
}

export interface LocaleConsumerContext {
  antLocale?: { [key: string]: any };
}

export default class LocaleConsumer extends React.Component<LocaleConsumerProps> {
  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: LocaleConsumerContext;

  getLocale() {
    const { componentName, defaultLocale } = this.props;
    const { antLocale } = this.context;
    const localeFromContext = antLocale && antLocale[componentName];
    return {
      ...defaultLocale,
      ...(localeFromContext || {}),
    };
  }

  render() {
    return this.props.children(this.getLocale());
  }
}
