import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { widgetCreator, Header, Text } from '@bpanel/bpanel-ui';

import { updateFiat, updateFeed } from './actions';

class PriceSettings extends Component {
  constructor(props) {
    super(props);
  }
  static get propTypes() {
    return {
      refreshPrice: PropTypes.func,
      updateFiat: PropTypes.func,
      updateFeed: PropTypes.func,
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
    };
  }

  moneyNumber(number) {
    number = parseFloat(number);
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  render() {
    const { price, updateFeed, updateFiat, refreshPrice, chain } = this.props;
    const formattedChain = chain === 'bitcoincash' ? 'Bitcoin Cash' : chain;

    return (
      <div className={'col'}>
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
            this.moneyNumber(price.price) +
            ' '}
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
    );
  }
}

const mapStateToProps = state => ({
  price: state.plugins.price,
  chain: state.clients.currentClient.chain,
});

const mapDispatchToProps = dispatch => {
  return {
    refreshPrice: () => dispatch({ type: 'REFRESH_PRICE' }),
    updateFiat: fiat => dispatch(updateFiat(fiat)),
    updateFeed: feed => dispatch(updateFeed(feed)),
  };
};

const PriceSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceSettings);

export default widgetCreator(PriceSettingsContainer);
