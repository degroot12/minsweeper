import React, { useState, useEffect } from 'react';
import createBoard from './createBoard'
import {revealed} from './reveal'


function Board() {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState(0);

    // mounting the component
    useEffect(() => {
        function freshBoard(){
            const newBoard = createBoard(10,10,15);
        console.log(newBoard);
        setNonMineCount(10*10 - 15);
        setMineLocations(newBoard.mineLocation)
        setGrid(newBoard.board);
        }
        freshBoard();
    },[]);

    // right click/ add flag
    const updateFlag = (event, x, y) => {
        event.preventDefault();
        let clonedGrid = JSON.parse(JSON.stringify(grid));
        clonedGrid[x][y].flagged = true;
        setGrid(clonedGrid);
        console.log('right click')
    }

    // Reveal the cell on click
    const revealCell = (x,y) => {
        let clonedGrid = JSON.parse(JSON.stringify(grid));
        if(clonedGrid[x][y].value === 'X'){
            alert('found a mine!');
            for(let i = 0;i<mineLocations.length;i++){
                clonedGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(clonedGrid)
        } else {
            let newRevealedBoard = revealed(clonedGrid, x, y, nonMineCount);
            clonedGrid[x][y].revealed = true;
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount)
        }
   
    }


    if(!grid){
        return <div>Loading</div>
    }

    return (
        <div >
        {grid.map(singleRow => {
            return (
                <div className='board'>
                    {singleRow.map(singleBlock =>  {
                return (
                    <div className='rowsBoard'  onClick={() => revealCell(singleBlock.x, singleBlock.y)} onContextMenu={(event) => updateFlag(event, singleBlock.x, singleBlock.y)}>
                        {singleBlock.revealed ? singleBlock.value: ''}
                        {/* {singleBlock.value!==0 && singleBlock.value} */}
                    </div>
                )
            })}
            </div>
            )
        })}
        </div>
    )
       
    
}

export default Board