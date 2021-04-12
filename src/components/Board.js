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

    // [
    // [[1][2][3][4][5]], [[1][2][3][4][5]], [[1][2][3][4][5]],
    // [[1][2][3][4][5]],
    // [[1][2][3][4][5]],
    // ]

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        setGrid(setBoard(5,5,5))
    },[])

    function setBoard(numRows,numCols, mines){
        const boardArr = []
        for(let i=0;i<numCols ;i++){
            let rowArr = [];
            for(let j=0; j<numRows;j++){
                rowArr.push('')
            }
            boardArr.push(rowArr);
        }

        for(let i=0;i<mines;i++){
            let rowIndex = Math.floor(Math.random() * boardArr[0].length);
            let colIndex = Math.floor(Math.random() * boardArr[0].length);
            console.log('position',rowIndex, colIndex)
            if(boardArr){
                while(boardArr[rowIndex][colIndex] === 'X'){
                    colIndex++
                    if(colIndex > boardArr[0].length){
                        colIndex = 0;
                    }
                }
            }
            
            boardArr[rowIndex][colIndex] = 'X';
        }
        let num = 0
        const nonBombs = numRows * numCols - mines;
        // for(let i =0;i<nonBombs;i++){
        //     // Top left
        //     if(boardArr[0][0+1] === 'X'){
        //         num++
        //     }
        //     if(boardArr[0+1][0] === 'X'){
        //         num++
        //     }
        //     if(boardArr[0+1][0+1] === 'X'){
        //         num++
        //     }
        // }
        for(let i=0;i<numCols ;i++){
            for(let j=0; j<numRows;j++){
                if(boardArr[i][j] !== 'X'){
                    // Top Left
                    if(boardArr[0][0]){
                        if(boardArr[i+1][j] === 'X'){
                            num++
                        }
                        if(boardArr[i+1][j+1] === 'X'){
                            num++
                        }
                        if(boardArr[i][j+1] === 'X'){
                            num++
                        }
                    }
                    
                    // Bot Right

                    if(boardArr[numRows-1][numCols-1]){
                        if(boardArr[i+1][j] === 'X'){
                            num++
                        }
                        if(boardArr[i+1][j+1] === 'X'){
                            num++
                        }
                        if(boardArr[i][j+1] === 'X'){
                            num++
                        }
                    }
                    if(boardArr[i-1][j] === 'X'){
                        num++
                    }
                    if(boardArr[i-1][j-1] === 'X'){
                        num++
                    }
                    if(boardArr[i][j-1] === 'X'){
                        num++
                    }
                    // Top right
                    if(boardArr[i-1][j+1] === 'X'){
                        num++
                    }
                    if(boardArr[i+1][j-1] === 'X'){
                        num++
                    }
                }
                boardArr[i][j] = num
            }
        }


        return boardArr
    }
   
    

    return (
        <div>
            <h1>Board</h1>
            {grid.map((singleRow)=> {
                return (
                    <div className='board'>
                        {singleRow.map((singleBlock) => {
                            return (
                                <div className='rowsBoard'>
                                    {singleBlock}
                                </div>
                                )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
