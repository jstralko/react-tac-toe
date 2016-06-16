const initP2P = {
  my_id: '',
  peer_id: '',
  connected: false,
  dataToSend: '',
  dataReceived: '',
};

const p2p = (state = initP2P, action) => {
  if (action.type === 'P2P_OPEN') {
    return Object.assign({}, state, {
      my_id: action.my_id,
    });
  } else if (action.type === 'P2P_CONNECTED') {
    return Object.assign({}, state, {
      connected: action.connected,
    });
  }
  return state;
};

module.exports = p2p;
