// Entry point for your plugin
// This should expose your plugin's modules
/* START IMPORTS */
import modules from './plugins';
import priceWidget from './PriceSettings';
/* END IMPORTS */

const plugins = Object.values(modules);

/* START EXPORTS */

export const metadata = {
  name: '@bpanel/price-settings',
  pathName: '',
  displayName: 'Price Settings',
  author: 'bpanel-devs',
  description: 'A settings widget for choosing price display options',
  version: require('../package.json').version,
};

export const pluginConfig = { plugins };

function decorateSettings(SettingsDashboard, { React, PropTypes }) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.PriceSettings = priceWidget();
    }

    static get displayName() {
      const wrappedName =
        SettingsDashboard.displayName || SettingsDashboard.name || 'Component';
      return `PriceSettings-${wrappedName}`;
    }

    static get propTypes() {
      return {
        settingsTabs: PropTypes.arrayOf(
          PropTypes.shape({
            header: PropTypes.string,
            body: PropTypes.function,
          })
        ),
      };
    }

    render() {
      const { settingsTabs = [] } = this.props;
      settingsTabs.unshift({
        header: 'Price',
        body: <this.PriceSettings />,
      });
      return <SettingsDashboard {...this.props} settingsTabs={settingsTabs} />;
    }
  };
}

export const decoratePlugin = { '@bpanel/settings': decorateSettings };

/* END EXPORTS */
