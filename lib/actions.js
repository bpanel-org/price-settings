import {
  UPDATE_PRICE,
  UPDATE_FIAT,
  UPDATE_FEED,
  HIDE_WIDGET_MENUS,
} from './constants';
function updateFiat(fiat) {
  return dispatch => {
    dispatch({
      type: UPDATE_PRICE,
      payload: '...',
    });
    dispatch({ type: UPDATE_FIAT, payload: fiat });
  };
}

function updateFeed(feed) {
  return dispatch => {
    dispatch({
      type: UPDATE_PRICE,
      payload: '...',
    });
    dispatch({ type: UPDATE_FEED, payload: feed });
  };
}

function hideWidgetMenus(hide) {
  return {
    type: HIDE_WIDGET_MENUS,
    payload: hide,
  };
}

export { updateFiat, updateFeed, hideWidgetMenus };
