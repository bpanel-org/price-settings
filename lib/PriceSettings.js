import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { widgetCreator, Header, Text, Label, Button } from '@bpanel/bpanel-ui';

import { updateFiat, updateFeed, hideWidgetMenus } from './actions';

class PriceSettings extends Component {
  constructor(props) {
    super(props);
  }
  static get propTypes() {
    return {
      refreshPrice: PropTypes.func,
      updateFiat: PropTypes.func,
      updateFeed: PropTypes.func,
      hideWidgetMenus: PropTypes.func,
      footerWidgets: PropTypes.array,
      chain: PropTypes.string,
      price: PropTypes.shape({
        fiat: PropTypes.string,
        fiatSymbol: PropTypes.string,
        price: PropTypes.float,
        feed: PropTypes.string,
        crypto: PropTypes.string,
        availableFiats: PropTypes.array,
      }),
      priceWidget: PropTypes.shape({
        hideMenus: PropTypes.bool,
      }),
    };
  }

  moneyNumber(number) {
    number = parseFloat(number);
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  render() {
    const {
      price,
      updateFeed,
      updateFiat,
      refreshPrice,
      hideWidgetMenus,
      chain,
      priceWidget: { hideMenus },
    } = this.props;
    const formattedChain = chain === 'bitcoincash' ? 'Bitcoin Cash' : chain;

    return (
      <div className="col">
        <div className="row mb-4">
          <Header type="h3">Select your price settings</Header>
          <Text type="p">
            These settings will update the price display across your app. The
            cryptocurrency is based on the node you are currently connected to (
            <span style={{ textTransform: 'capitalize' }}>
              {formattedChain || '...'}
            </span>
            ).
          </Text>
          <Text>
            {price.crypto +
              ' ' +
              price.fiatSymbol +
              this.moneyNumber(price.price)}
            &nbsp;
          </Text>
          <select
            value={price.fiat}
            onChange={e => {
              updateFiat(e.target.value);
              refreshPrice();
            }}
          >
            {price.availableFiats.map(val => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
          &nbsp;
          <select
            value={price.feed}
            onChange={e => {
              updateFeed(e.target.value);
              refreshPrice();
            }}
          >
            {price.availableFeeds.map(val => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <Header type="h5">Settings for Widget Display</Header>
          <Label text="Show/Hide dropdown menus?" stacked={false}>
            {hideMenus ? (
              <Button onClick={() => hideWidgetMenus(false)}>Show Menus</Button>
            ) : (
              <Button type="action" onClick={() => hideWidgetMenus(true)}>
                Hide Menus
              </Button>
            )}
          </Label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  price: state.plugins.price,
  chain: state.clients.currentClient.chain,
  priceWidget: state.plugins.priceWidget,
});

const mapDispatchToProps = dispatch => {
  return {
    refreshPrice: () => dispatch({ type: 'REFRESH_PRICE' }),
    updateFiat: fiat => dispatch(updateFiat(fiat)),
    updateFeed: feed => dispatch(updateFeed(feed)),
    hideWidgetMenus: hide => dispatch(hideWidgetMenus(hide)),
  };
};

const PriceSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceSettings);

export default widgetCreator(PriceSettingsContainer);
