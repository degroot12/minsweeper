// import React, { useState, useEffect } from 'react';
// import createBoard from './createBoard'
// import {revealed} from './reveal'


// function Board() {
//     const [grid, setGrid] = useState([]);
//     const [nonMineCount, setNonMineCount] = useState(0);
//     const [mineLocations, setMineLocations] = useState(0);

//     // mounting the component
//     useEffect(() => {
//         function freshBoard(){
//             const newBoard = createBoard(10,10,15);
//         console.log(newBoard);
//         setNonMineCount(10*10 - 15);
//         setMineLocations(newBoard.mineLocation)
//         setGrid(newBoard.board);
//         }
//         freshBoard();
//     },[]);

//     // right click/ add flag
//     const updateFlag = (event, x, y) => {
//         event.preventDefault();
//         let clonedGrid = JSON.parse(JSON.stringify(grid));
//         clonedGrid[x][y].flagged = true;
//         setGrid(clonedGrid);
//         console.log('right click')
//     }

//     // Reveal the cell on click
//     const revealCell = (x,y) => {
//         let clonedGrid = JSON.parse(JSON.stringify(grid));
//         if(clonedGrid[x][y].value === 'X'){
//             alert('found a mine!');
//             for(let i = 0;i<mineLocations.length;i++){
//                 clonedGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
//             }
//             setGrid(clonedGrid)
//         } else {
//             let newRevealedBoard = revealed(clonedGrid, x, y, nonMineCount);
//             clonedGrid[x][y].revealed = true;
//             setGrid(newRevealedBoard.arr);
//             setNonMineCount(newRevealedBoard.newNonMinesCount)
//         }
   
//     }


//     if(!grid){
//         return <div>Loading</div>
//     }

//     return (
//         <div >
//         {grid.map(singleRow => {
//             return (
//                 <div className='board'>
//                     {singleRow.map(singleBlock =>  {
//                 return (
//                     <div className='rowsBoard'  onClick={() => revealCell(singleBlock.x, singleBlock.y)} onContextMenu={(event) => updateFlag(event, singleBlock.x, singleBlock.y)}>
//                         {singleBlock.revealed ? singleBlock.value: ''}
//                         {/* {singleBlock.value!==0 && singleBlock.value} */}
//                     </div>
//                 )
//             })}
//             </div>
//             )
//         })}
//         </div>
//     )
       
    
// }

// export default Board


import React, { useEffect, useState } from 'react'

export default function Board() {

    const [grid, setGrid] = useState([]);
    const [mines, setMines] = useState(0);
    const [nonMines, setNonMines] = useState(0);
    const[isActive, setActive] = useState(false);

    useEffect(() => {
        setGrid(setBoard(10,10,5))
    },[])

   
    function setBoard(numCols,numRows, mines){
        setMines(mines);
        let nonMines = numCols * numRows - mines
        setNonMines(nonMines)
        const boardArr = []
        for(let i=0;i<numRows ;i++){
            let rowArr = [];
            for(let j=0; j<numCols;j++){
                rowArr.push({
                    value: 0,
                    row: i,
                    col: j,
                    revealed: false,
                    flagged: false
                })
            }
            boardArr.push(rowArr);
        }


        for(let i=0;i<mines;i++){
            let rowIndex = Math.floor(Math.random() * boardArr.length);
            let colIndex = Math.floor(Math.random() * boardArr[0].length);
            console.log('position',rowIndex, colIndex)
            if(boardArr){
                while(boardArr[rowIndex][colIndex] === 'X'){
                    colIndex++
                    
                    if(colIndex >= boardArr[0].length){
                        colIndex = 0;
                    }
                }
            }
            
            boardArr[rowIndex][colIndex].value = 'X';
        }
        
        //const nonBombs = numRows * numCols - mines;

        for(let i=0;i<numRows ;i++){
            for(let j=0; j<numCols;j++){
                if(boardArr[i][j].value !== 'X'){            
                    if( boardArr[i-1] && boardArr[i-1][j] && boardArr[i-1][j].value === 'X'){
                            boardArr[i][j].value++
                    }
                    if(boardArr[i-1] && boardArr[i-1][j-1] && boardArr[i-1][j-1].value === 'X'){
                            boardArr[i][j].value++
                    }
                    if(boardArr[i] && boardArr[i][j-1] && boardArr[i][j-1].value === 'X'){
                            boardArr[i][j].value++
                    }
                    if(boardArr[i+1] && boardArr[i+1][j-1] && boardArr[i+1][j-1].value === 'X'){
                            boardArr[i][j].value++
                    }
                    if(boardArr[i+1] && boardArr[i+1][j] && boardArr[i+1][j].value === 'X'){
                            boardArr[i][j].value++
                    }
                    if(boardArr[i-1] && boardArr[i-1][j+1] && boardArr[i-1][j+1].value === 'X'){
                            boardArr[i][j].value++
                    }
                    if(boardArr[i] && boardArr[i][j+1] && boardArr[i][j+1].value === 'X'){
                            boardArr[i][j].value++
                    }
                    if(boardArr[i+1] && boardArr[i+1][j+1] && boardArr[i+1][j+1].value === 'X'){
                            boardArr[i][j].value++
                    }
                }
                if(boardArr[i][j].value === 1){

                }
            }
        }
        return boardArr
    }

    // function revealZero(row,col){

    // }
    // const nonBombs = {}
    function handleClick(row, col){  
        const zeroesObj = {};
        let nonMinesCount = nonMines
        let clonedGrid = JSON.parse(JSON.stringify(grid));
        function revealSquare(row,col){
                if(clonedGrid[row][col].value === 0){
                    if(!clonedGrid[row][col].revealed){
                        nonMinesCount--;
                    }
                    clonedGrid[row][col].revealed = true;
                    
                    if(clonedGrid[row] && clonedGrid[row][col+1] &&!clonedGrid[row][col+1].revealed){
                        clonedGrid[row][col+1].revealed = true;
                        nonMinesCount--
                        if(clonedGrid[row][col+1].value === 0){
                            revealSquare(row, col+1)
                        }
                    
                    }
                    if(clonedGrid[row+1] && clonedGrid[row+1][col+1] && !clonedGrid[row+1][col+1].revealed){
                        clonedGrid[row+1][col+1].revealed = true;
                        nonMinesCount--
                        if(clonedGrid[row+1][col+1].value === 0){
                            revealSquare(row+1, col+1)
                        }
                       
                         
                    }
                    if(clonedGrid[row+1] && clonedGrid[row+1][col] && !clonedGrid[row+1][col].revealed){
                        clonedGrid[row+1][col].revealed = true;
                        nonMinesCount--;
                        if(clonedGrid[row+1] && clonedGrid[row+1][col] && clonedGrid[row+1][col].value === 0 && !zeroesObj[`${row+1}-${col}`]){
                            revealSquare(row+1, col)
                        }
                       
                         
                    }
                    if(clonedGrid[row+1] && clonedGrid[row+1][col-1] && !clonedGrid[row+1][col-1].revealed){
                        clonedGrid[row+1][col-1].revealed = true;
                        nonMinesCount--;
                        if(clonedGrid[row+1] && clonedGrid[row+1][col-1] && clonedGrid[row+1][col-1].value === 0 && !zeroesObj[`${row+1}-${col-1}`]){
                            revealSquare(row+1, col-1)
                        }
                        
                         
                    }
                    if(clonedGrid[row-1] && clonedGrid[row-1][col+1] && !clonedGrid[row-1][col+1].revealed){
                        clonedGrid[row-1][col+1].revealed = true;
                        nonMinesCount--;
                        if(clonedGrid[row-1] && clonedGrid[row-1][col+1] && clonedGrid[row-1][col+1].value === 0  && !zeroesObj[`${row-1}-${col+1}`]){
                            revealSquare(row-1, col+1)
                        }
                        
                         
                    }
                    if(clonedGrid[row-1] && clonedGrid[row-1][col] && !clonedGrid[row-1][col].revealed){
                        clonedGrid[row-1][col].revealed = true;
                        nonMinesCount--
                        if(clonedGrid[row-1] && clonedGrid[row-1][col] && clonedGrid[row-1][col].value === 0  && !zeroesObj[`${row-1}-${col}`]){
                            revealSquare(row-1, col)
                        }
                        
                         
                    }
                    if(clonedGrid[row-1] && clonedGrid[row-1][col-1] && !clonedGrid[row-1][col-1].revealed){
                        clonedGrid[row-1][col-1].revealed = true;
                        nonMinesCount--;
                        if(clonedGrid[row-1] && clonedGrid[row-1][col-1] && clonedGrid[row-1][col-1].value === 0  && !zeroesObj[`${row-1}-${col-1}`]){
                            revealSquare(row-1, col-1)
                        }
                        
                         
                    }
                    if(clonedGrid[row] && clonedGrid[row][col-1] && !clonedGrid[row][col-1].revealed){
                        clonedGrid[row][col-1].revealed = true;
                        nonMinesCount--;
                        if(clonedGrid[row] && clonedGrid[row][col-1] && clonedGrid[row][col-1].value === 0  && !zeroesObj[`${row}-${col-1}`]){
                            revealSquare(row, col-1)
                            
                        }
                       
                        
                    }
    
                    zeroesObj[`${row}-${col}`] = true;
                    
                }
                if(clonedGrid[row][col].value !== 0 && clonedGrid[row][col].value !== 'X'){
                    clonedGrid[row][col].revealed = true;
                    nonMinesCount--;
                }
            
                if(clonedGrid[row][col].value === 'X'){
                    alert('you died')
                }
                setGrid(clonedGrid);
            // console.log('mines', mines);
            // console.log('nonmines', nonMines)
            if(mines === 0 && nonMines === 0){
                alert('You won!')
            }
            console.log(nonMinesCount)
            
            }
            
        revealSquare(row, col)
        setNonMines(nonMinesCount)
        console.log('mines', mines)
        console.log('non-mines', nonMines)
        if(mines === 0 && nonMinesCount === 0){
            alert('You won!')
        }
    }

    function handleFlag(event, row, col){
        event.preventDefault();
        let clonedGrid = JSON.parse(JSON.stringify(grid));
        clonedGrid[row][col].flagged = true;
        setGrid(clonedGrid)
        let clonedMines = JSON.parse(JSON.stringify(mines));
        setMines(clonedMines-1)
        if(mines === 0 && nonMines === 0){
            alert('You won!')
        }
    }

    const toggleClass = () => {
        setActive(true)
    }

    
   
    

    return (
        <div className='background-app'>
            <div className='full-board score'>
                <h2>{mines}</h2>
                <button onClick={() => window.location.reload()}>Play again</button>
                <h2>{nonMines}</h2>
                
            </div>
            
            <div className='full-board'>
            {grid.map((singleRow)=> {
                return (
                    <div className='board'>
                        {singleRow.map((singleBlock) => {
                            return (
                                <div className={isActive ? 'rowsBoard': 'not-revealed'} onClick={() => handleClick(singleBlock.row, singleBlock.col)} onContextMenu={(event) => handleFlag(event, singleBlock.row, singleBlock.col)}>
                                    {singleBlock.revealed ? singleBlock.value: singleBlock.flagged ? 'F': ''}
                                </div>
                                )
                        })}
                    </div>
                )
            })}
            </div>
        </div>
    )
}
