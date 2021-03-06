import React from 'react';
import Tile from '../tile/Tile.jsx';

import './row.scss';

const Row = ({ row, index, move }) => {
  const mappedRows = row.map(
    (claim, i) => <Tile key={i} claim={claim} rowIndex={index} index={i} move={move} />
  );

  return (
    <div className="row">{mappedRows}</div>
  );
};

Row.propTypes = {
  row: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
  move: React.PropTypes.func.isRequired,
};

module.exports = Row;
