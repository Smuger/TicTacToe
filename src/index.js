import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

const LineFirstRow = () => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            height: 5,
            top: "5.2em",
            position: "relative",
                    
            }}
    />
)

const LineSecondRow = () => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            height: 5,
            top: "5.2em",
            position: "relative",
                        
        }}
    />
)

const LineThirdRow = () => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            height: 5,
            top: "5.2em",
            position: "relative",
                            
        }}
    />
)

const LineFirstColumn = ({marginFromLeft}) => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            width: 5,
            height:"365px",
            position: "absolute",
            marginLeft: marginFromLeft,
            left: "50%",
        }}
    />
)

const LineSecondColumn = ({marginFromLeft}) => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            width: 5,
            height:"365px",
            position: "absolute",
            marginLeft: marginFromLeft,
            left: "50%",
        }}
    />
)

const LineThirdColumn = ({marginFromLeft}) => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            width: 5,
            height:"365px",
            position: "absolute",
            marginLeft: marginFromLeft,
            left: "50%",
        }}
    />
)

const LineLeftRightACross = ({rotation}) => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            width: 5,
            height:"370px",
            position: "absolute",
            transform: rotation,
            left: "50%",
        }}
    />
)

const LineRightLeftACross = ({rotation}) => (
    <hr
        style={{
            color: "red",
            backgroundColor: "red",
            width: 5,
            height:"370px",
            position: "absolute",
            transform: rotation,
            left: "50%",
        }}
    />
)



class Board extends React.Component {
    constructor(props) {
        super(props);
        this.noLinesDrawnYet = true;
        this.state = {
            move: 0,
            squares: Array(9).fill(null),
            squaresHistory: Array(9).fill(null),
            xIsNext: true,
            clicks: 0,
            isHiddenLineACrossLeftRight: true,
            isHiddenLineACrossRightLeft: true,
            isHiddenLineFirstRow: true,
            isHiddenLineSecondRow: true,
            isHiddenLineThirdRow: true,
            isHiddenLineFirstColumn: true,
            isHiddenLineSecondColumn: true,
            isHiddenLineThirdColumn: true
        };
        
    }

    calculateWinner(squares) {
    
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log("Loop: " + i);
                console.log("No lines yet: " + this.noLinesDrawnYet);
                if (this.noLinesDrawnYet){
                    switch(i) {
                        case 0:
                            this.setState({
                                isHiddenLineFirstRow: false
                            });
                          break;
                        case 1:
                            this.setState({
                                isHiddenLineSecondRow: false
                            });
                        break;
                        case 2:
                            this.setState({
                                isHiddenLineThirdRow: false
                            });
                        break;
                        case 3:
                            this.setState({
                                isHiddenLineFirstColumn: false
                            });
                        break;
                        case 4:
                            this.setState({
                                isHiddenLineSecondColumn: false
                            });
                        break;
                        case 5:
                            this.setState({
                                isHiddenLineThirdColumn: false
                            });
                        break;
                        case 6:
                            this.setState({
                                isHiddenLineACrossLeftRight: false
                            });
                        break;
                        case 7:
                            this.setState({
                                isHiddenLineACrossRightLeft: false
                            });
                        break;
                        default:
                      }
                      this.noLinesDrawnYet=false;
                }
                return squares[a];
            }
        }
        return null;
    }

    handleClick(i) {
        let clicks = this.state.clicks;
        clicks++;
        const squares = this.state.squares.slice();
        const squaresHistory = this.state.squaresHistory.slice();
        let move = this.state.move;

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        let x = 'X';
        let o = 'O';

        squaresHistory[move] = this.state.squares;
        move++;
        squares[i] = this.state.xIsNext ? x : o;

        this.setState({
            clicks: clicks,
            move: move,
            squares: squares,
            squaresHistory: squaresHistory,
            xIsNext: !this.state.xIsNext,
        });

        this.props.onToggleX(this.state.xIsNext);
    }

    handleUndo() {
        let move = this.state.move;
        this.noLinesDrawnYet = true;
        const squaresHistory = this.state.squaresHistory.slice();
        squaresHistory[move] = this.state.squares;

        --move;
        this.setState({
            
            move: move,
            squares: this.state.squaresHistory[move],
            squaresHistory: squaresHistory,
            xIsNext: !this.state.xIsNext,
            isHiddenLineACrossLeftRight: true,
            isHiddenLineACrossRightLeft: true,
            isHiddenLineFirstRow: true,
            isHiddenLineSecondRow: true,
            isHiddenLineThirdRow: true,
            isHiddenLineFirstColumn: true,
            isHiddenLineSecondColumn: true,
            isHiddenLineThirdColumn: true
        });

        this.props.onToggleX(this.state.xIsNext);
    }

    handleRedo() {
        let move = this.state.move;
        move++;
        this.setState({
            move: move,
            squares: this.state.squaresHistory[move],
            xIsNext: !this.state.xIsNext,
        });

        this.props.onToggleX(this.state.xIsNext);
    }

    handleNewGame() {
        this.noLinesDrawnYet = true;
        this.setState({
            clicks: 0,
            move: 0,
            squares: Array(9).fill(null),
            squaresHistory: Array(9).fill(null),
            xIsNext: true,
            isHiddenLineACrossLeftRight: true,
            isHiddenLineACrossRightLeft: true,
            isHiddenLineFirstRow: true,
            isHiddenLineSecondRow: true,
            isHiddenLineThirdRow: true,
            isHiddenLineFirstColumn: true,
            isHiddenLineSecondColumn: true,
            isHiddenLineThirdColumn: true
        });

        this.props.onToggleX(this.state.xIsNext);
    }

    renderSquare(i) {
        return (
            <Square
                extraClass={this.state.xIsNext ? 'revert' : ''}
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    // renderHorizontalRedLineSecond(){
    //     return (
    //         <hr
    //             style={{
    //                 color: "red",
    //                 backgroundColor: "red",
    //                 height: 5,
    //                 top: "5.2em",
    //                 position: "relative",
    //             }}
    //             visibility={this.state.lineSecondRow}
    //         />
    //     )
    // }

    // renderHorizontalRedLineThird(){
    //     return (
    //         <hr
    //             style={{
    //                 color: "red",
    //                 backgroundColor: "red",
    //                 height: 5,
    //                 top: "5.2em",
    //                 position: "relative",
    //             }}
    //         />
    //     )
    // }

    // renderVerticalRedLine(marginFromLeft){
    //     return(
    //         <hr
    //             style={{
    //                 color: "red",
    //                 backgroundColor: "red",
    //                 width: 5,
    //                 height:"405px",
    //                 position: "absolute",
    //                 marginLeft: marginFromLeft,
    //                 left: "50%",
    //             }}
    //         />
    //     )
    // }

    // renderACrossRedLine(rotation){
    //     return(
    //         <hr
    //             style={{
    //                 color: "red",
    //                 backgroundColor: "red",
    //                 width: 5,
    //                 height:"440px",
    //                 position: "absolute",
    //                 transform: rotation,
    //                 left: "50%",
    //                 visibility:"hidden"
    //             }}
    //         />
    //     )
    // }

    

    render() {
        
        const winner = this.calculateWinner(this.state.squares);

        let status;
        console.log("Winner?: " + winner);
        console.log("Click number: " + this.state.clicks);
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            if (this.state.clicks===9){
                status = 'Draw';  
            }
            else{
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }
        return (
            <div>
                
                <div className="status">{status}</div>
                <div className="board-row">
                
                {!this.state.isHiddenLineACrossLeftRight && <LineLeftRightACross rotation="rotate(-45deg)" />}
                {!this.state.isHiddenLineACrossRightLeft && <LineRightLeftACross rotation="rotate(45deg)" />}

                {!this.state.isHiddenLineFirstRow && <LineFirstRow />}
                    {this.renderSquare(0)}
                    {!this.state.isHiddenLineFirstColumn && <LineFirstColumn marginFromLeft="-129px"/>}

                    {this.renderSquare(1)}
                    {!this.state.isHiddenLineSecondColumn && <LineSecondColumn marginFromLeft="-3px"/>}

                    {this.renderSquare(2)}
                    {!this.state.isHiddenLineThirdColumn && <LineThirdColumn marginFromLeft="124px"/>}
                </div>
                <div className="board-row">
                {!this.state.isHiddenLineSecondRow && <LineSecondRow />}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {!this.state.isHiddenLineThirdRow && <LineThirdRow />}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="icons">
                    <button
                        data-tip="Undo"
                        className="function-button"
                        disabled={this.state.move === 0}
                        onClick={() => this.handleUndo()}>
                        <FontAwesomeIcon icon={faUndo} size="4x" />
                    </button>
                    <ReactTooltip place="bottom" type="info" effect="float" />
                    <button
                        data-tip="Redo"
                        className="function-button"
                        disabled={this.state.squaresHistory[this.state.move + 1] === null}
                        onClick={() => this.handleRedo()}>
                        <FontAwesomeIcon icon={faRedo} size="4x" />
                    </button>
                    <ReactTooltip place="bottom" type="info" effect="float" />
                    <button
                        data-tip="New Game"
                        className="function-button"
                        onClick={() => this.handleNewGame()}>
                        <FontAwesomeIcon icon={faFile} size="4x" />
                    </button>
                    <ReactTooltip place="bottom" type="warning" effect="float" />
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: 'game',
        };
    }

    onToggleX = x => {
        this.setState({
            classes: x ? 'revert game' : 'game',
        });
    };
    render() {
        return (
            <div className={this.state.classes}>
                <div className="game-board">
                    <Board onToggleX={this.onToggleX} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
