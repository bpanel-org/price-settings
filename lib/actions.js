function updateFiat(fiat) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PRICE',
      payload: '...',
    });
    dispatch({ type: 'UPDATE_FIAT', payload: fiat });
  };
}

function updateFeed(feed) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PRICE',
      payload: '...',
    });
    dispatch({ type: 'UPDATE_FEED', payload: feed });
  };
}

export { updateFiat, updateFeed };
