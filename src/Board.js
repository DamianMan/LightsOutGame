import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';
import "./App.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    lit: [false, true]
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()

    };
    this.flipCellsAround = this.flipCellsAround.bind(this)

    // TODO: set initial state
  }



  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      board.push(Array.from({ length: this.props.ncols }, (x, i) => this.props.lit[Math.floor(Math.random() * 2) + 1 - 1]))
    }
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */
  // // TODO: flip this cell and the cells around it
  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    console.log(board)
    let [y, x] = coord.split("-").map(Number);
    let nord = y - 1
    let sud = y + 1
    let east = x + 1
    let west = x - 1

    function flipCell(y, x) {
      // if this coord is actually on board, flip it


      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board.map((m, idy) => {
          if (idy === y) {
            m[x] = !m[x] // flip value clicked
            if (y >= 0 && y < ncols - 1) {
              if (y === 0) {
                board[sud][x] = !board[sud][x]

              } else {
                board[sud][x] = !board[sud][x]
                board[nord][x] = !board[nord][x]
              }
            }

            if (y === ncols - 1) board[nord][x] = !board[nord][x]    // toggle NORD if reaches max SUD value
            if (x >= 0 && x < nrows - 1) {
              board[y][east] = !board[y][east]
              board[y][west] = !board[y][west]
            }

            if (x === nrows - 1) board[y][west] = !board[y][west]




            // if (board[sud][x]) board[sud][x] = !board[sud][x]
            // if (board[y][east]) board[y][east] = !board[y][east]
            // if (board[y][west]) board[y][west] = !board[y][west]
          };
        })
      }
      isWon(board)

      return [...board]

    }



    // // win when every cell is turned off
    // // TODO: determine is the game has been won
    function isWon(arr) {
      let count = 0
      arr.map((m, i) => {
        m.map((v, idx) => {
          if (v === false) {
            count += 1
          }
        })
      })
      if (count === (ncols * nrows)) return true
    }

    this.setState({ board: flipCell(y, x), hasWon: isWon(board) })



  }


  /** Render game board or winning message. */

  render() {
    const won = this.state.hasWon

    return (
      // if the game is won, just show a winning msg & render nothing else

      // TODO

      // make table board

      // TODO
      <div>
        {!won ? <div>
          <div className="App-text-container">
            <div className="neon">Lights </div>
            <div className="flux">Out </div>
          </div>

          <table className="Board">
            <tbody>
              {this.state.board.map((m, idx) => (<tr key={idx}>{m.map((m, i) => (

                <Cell key={`${idx}-${i}`} coord={`${idx}-${i}`} flip={this.flipCellsAround} isLit={m} />))}</tr>))}
            </tbody>
          </table>
        </div>
          :
          <div className="App-text-container">
            <div className="neon" style={{ marginTop: '15%' }}>You </div>
            <div className="flux" style={{ marginTop: '15%' }}>Win! </div>
          </div>


        }
      </div>





    )

  }
}


export default Board;
