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

    useEffect(() => {
        setGrid(setBoard(10,10,10))
    },[])

    function setBoard(numCols,numRows, mines){
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
            }
        }
        return boardArr
    }

    // function revealZero(row,col){

    // }
   
    function handleClick(row, col){  
        const zeroesObj = {};
        let clonedGrid = JSON.parse(JSON.stringify(grid));
        function revealSquare(row,col){
            if(clonedGrid[row][col].value === 0){
                if(clonedGrid[row] && clonedGrid[row][col+1]){
                    clonedGrid[row][col+1].revealed = true;  
                }
                if(clonedGrid[row+1] && clonedGrid[row+1][col+1]){
                    clonedGrid[row+1][col+1].revealed = true;
                }
                if(clonedGrid[row+1] && clonedGrid[row+1][col]){
                    clonedGrid[row+1][col].revealed = true;
                }
                if(clonedGrid[row+1] && clonedGrid[row+1][col-1]){
                    clonedGrid[row+1][col-1].revealed = true;
                }
                if(clonedGrid[row-1] && clonedGrid[row-1][col+1]){
                    clonedGrid[row-1][col+1].revealed = true;
                }
                if(clonedGrid[row-1] && clonedGrid[row-1][col]){
                    clonedGrid[row-1][col].revealed = true;
                }
                if(clonedGrid[row-1] && clonedGrid[row-1][col-1]){
                    clonedGrid[row-1][col-1].revealed = true;
                }
                if(clonedGrid[row] && clonedGrid[row][col-1]){
                    clonedGrid[row][col-1].revealed = true
                    //revealedZero(row,col-1)
                    
                }
            }
            clonedGrid[row][col].revealed = true;
        
            if(clonedGrid[row][col].value === 'X'){
                alert('you died')
            }
            if(clonedGrid[row][col].value === 0){
                zeroesObj[`${row}-${col}`] = true;
                if(clonedGrid[row] && clonedGrid[row][col+1] && clonedGrid[row][col+1].value === 0 && !zeroesObj[`${row}-${col+1}`]){
                    revealSquare(row, col+1)
                }
                if(clonedGrid[row+1] && clonedGrid[row+1][col+1] && clonedGrid[row+1][col+1].value === 0 && !zeroesObj[`${row+1}-${col+1}`]){
                    revealSquare(row+1, col+1)
                }
                if(clonedGrid[row+1] && clonedGrid[row+1][col] && clonedGrid[row+1][col].value === 0 && !zeroesObj[`${row+1}-${col}`]){
                    revealSquare(row+1, col)
                }
                if(clonedGrid[row+1] && clonedGrid[row+1][col-1] && clonedGrid[row+1][col-1].value === 0 && !zeroesObj[`${row+1}-${col-1}`]){
                    revealSquare(row+1, col-1)
                }
                if(clonedGrid[row-1] && clonedGrid[row-1][col+1] && clonedGrid[row-1][col+1].value === 0  && !zeroesObj[`${row-1}-${col+1}`]){
                    revealSquare(row-1, col+1)
                }
                if(clonedGrid[row-1] && clonedGrid[row-1][col] && clonedGrid[row-1][col].value === 0  && !zeroesObj[`${row-1}-${col}`]){
                    revealSquare(row-1, col)
                }
                if(clonedGrid[row-1] && clonedGrid[row-1][col-1] && clonedGrid[row-1][col-1].value === 0  && !zeroesObj[`${row-1}-${col-1}`]){
                    revealSquare(row-1, col-1)
                }
                if(clonedGrid[row] && clonedGrid[row][col-1] && clonedGrid[row][col-1].value === 0  && !zeroesObj[`${row}-${col-1}`]){
                    revealSquare(row, col-1)
                    //revealedZero(row,col-1)
                    
                }
            }
            setGrid(clonedGrid);
            }
    
        revealSquare(row, col)
    }

    function handleFlag(event, row, col){
        event.preventDefault();
        let clonedGrid = JSON.parse(JSON.stringify(grid));
        clonedGrid[row][col].flagged = true;
        setGrid(clonedGrid)
    }
    

    return (
        <div>
            <h1>Board</h1>
            {grid.map((singleRow)=> {
                return (
                    <div className='board'>
                        {singleRow.map((singleBlock) => {
                            return (
                                <div className='rowsBoard' onClick={() => handleClick(singleBlock.row, singleBlock.col)} onContextMenu={(event) => handleFlag(event, singleBlock.row, singleBlock.col)}>
                                    {singleBlock.revealed ? singleBlock.value: singleBlock.flagged ? 'F': ''}
                                </div>
                                )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
