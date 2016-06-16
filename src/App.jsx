import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board/Board.jsx';
import store from './stores/ticTacToe.js';
import Peer from 'peerjs';


import './sass/app.scss';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this.peer = new Peer({ key: 'ubxnt4vwdx11yvi' });
    this.state = {
      board: props.board,
      player: props.player,
      size: props.size,
      conn: undefined,
    };
  }

  componentWillMount() {
    this.peer.on('open', (id) => {
      console.log(`My peer ID is: ${id}`);
      store.dispatch({ type: 'P2P_OPEN', my_id: id });

      this.peer.on('connection', (connection) => {
        this.setState({ conn: connection }, () => this.establishConnection());
      });
    });

    this.peer.on('error', (err) => {
      const errStringify = JSON.stringify(err);
      console.log(errStringify);
    });
  }

  componentWillUnmount() {
    this.peer.destroy();
  }

  setSize(event) {
    const size = event.target.value;

    store.dispatch({ type: 'SET_SIZE', size });
  }

  establishConnection() {
    this.peer.on('connection', (connection) => {
      const str = JSON.stringify(connection);
      console.log(`We have established a connection ${str}`);

      this.setState({ conn: connection }, () => {
        this.state.conn.on('open', () => {
            store.dispatch({
              type: 'P2P_CONNECTED',
              connected: true,
            });
          });
      });
    });
  }

  newGame(event) {
    event.preventDefault();
    store.dispatch({ type: 'NEW_GAME', size: store.getState().size });
  }

  reset(event) {
    event.preventDefault();
    store.dispatch({ type: 'SET_SIZE', size: 3 });
    store.dispatch({ type: 'NEW_GAME', size: 3 });
  }

  move(event) {
    const [x, y] = event.target.dataset.coords.split(',');

    store.dispatch({
      type: 'MOVE',
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      player: store.getState().player,
    });

    store.dispatch({ type: 'SWITCH_PLAYER' });
  }

  render() {
    return (
      <div id="container">
        <Board
          {...store.getState()}
          move={this.move}
          newGame={this.newGame}
          setSize={this.setSize}
        />

        <footer className="pin-to-bottom">
          <a className="reset" href="" onClick={this.newGame}>reset</a>
          <a className="reset" href="" onClick={this.reset}>reset to 3x3</a>
        </footer>
      </div>
    );
  }
}

TicTacToe.propTypes = {
  board: React.PropTypes.array.isRequired,
  player: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired,
};

const render = () => {
  ReactDOM.render(
    <TicTacToe {...store.getState()} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
store.dispatch({ type: 'INIT' });

render();
