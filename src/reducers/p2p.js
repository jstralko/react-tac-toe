const initP2P = {
  my_id: '',
  peer_id: '',
  initialized: false,
  dataToSend: '',
  dataReceived: '',
};

const p2p = (state = initP2P, action) => {
  if (action.type === 'P2P_OPEN') {
    return Object.assign({}, state, {
      my_id: action.my_id,
    });
  }
  return state;
};

module.exports = p2p;
