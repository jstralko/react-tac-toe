import Peer from 'peerjs';

const initP2P = {
  peer: new Peer({ key: 'ubxnt4vwdx11yvi' }),
  my_id: '',
  peer_id: '',
  initialized: false,
  dataToSend: '',
  dataReceived: '',
};

const p2p = (state = initP2P, action) => {
  console.log(`action ${action}`);
  return state;
};

module.exports = p2p;
