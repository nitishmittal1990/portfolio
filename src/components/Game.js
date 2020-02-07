import React from 'react';

/**
 * Make dynamic grid based on window.width 
 * widnow.height - rocket size
 * Make random circle on different y of grid
 * Make a rocket
 * When rocket fire x,y co-ordinate matches with circle x,y co-odrinate score increase
 * Circle keep moving on x-co-ordinate
 * 
 */

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      gameGrid: [],
      rocketGrid: []
    };
    this.formSpaceGrid = this.formSpaceGrid.bind(this);
    this.formRocketGrid = this.formRocketGrid.bind(this);
    this.generateRandomBubble = this.generateRandomBubble.bind(this);
    this.moveBubble = this.moveBubble.bind(this);
    this.formSpaceGrid();
    this.formRocketGrid();
  }

  formSpaceGrid() {
    for (let i = 0; i < Math.floor(window.innerHeight / 50)-1; i++) {
      for (let j = 0; j < Math.floor(window.innerWidth / 50); j++) {
        this.state.gameGrid.push({ x: i, y: j, isBubble: false });
      }
    }
  }

  formRocketGrid() {
    for (let j = 0; j < Math.floor(window.innerWidth / 50); j++) {
      if(j === 14) {
        this.state.rocketGrid.push({ y: j, isRocket: true });
      } else {
        this.state.rocketGrid.push({y:j, isRocket: false});
      }
    }
  }

  generateRandomBubble() {
    let y1 = Math.floor(Math.random() * (window.innerWidth / 50));
    let y2 = Math.floor(Math.random() * (window.innerWidth / 50));
    let y3 = Math.floor(Math.random() * (window.innerWidth / 50));
    console.log(y1, y2, y3);
    let bubbleObject = [{x: 0, y: y1},{x: 1, y: y2},{x: 2, y: y3}];
    const formspaceGrid = this.state.gameGrid;
    const updatedGrid = formspaceGrid.map((eachgrid) => {
      let {x, y} = eachgrid;
      if(x === 0 && y === bubbleObject[0].y) {
        return {x: 0, y: eachgrid.y, isBubble: true};
      }
      if(x === 1 && y === bubbleObject[1].y){
        return { x: 1, y: eachgrid.y, isBubble: true };
      }
      if(x === 2 && y === bubbleObject[2].y) {
        return { x: 2, y: eachgrid.y, isBubble: true };
      }
      return eachgrid;
    })
    this.setState({
      gameGrid: updatedGrid,
    })
  }

  moveBubble() {
    let filteredBubbleGrid = this.state.gameGrid.filter((eachgrid) => {
      return eachgrid.isBubble;
    })
    let mappedBubbleGrid = filteredBubbleGrid.map((eachgrid) => {
      return {x: eachgrid.x + 1, y: eachgrid.y, isBubble: true};
    })

    // console.log(filteredBubbleGrid,'filter');
    // console.log(mappedBubbleGrid, 'map');
    // console.log(xOrdinateArray, 'xaary');
    // console.log(yOrdinateArray, 'yaary');

    let updatedBubbleGrid = this.state.gameGrid.map((eachgrid) => {
      for(let el of mappedBubbleGrid) {
        if(el.x === eachgrid.x && el.y === eachgrid.y) {
          return { x: eachgrid.x, y: eachgrid.y, isBubble: true }
        }
      }
      return { x: eachgrid.x, y: eachgrid.y, isBubble: false}
    })
    // console.log(updatedBubbleGrid);
    this.setState({
      gameGrid: updatedBubbleGrid,
    })
  }

  componentDidMount() {
    this.generateRandomBubble();
    setInterval(() => {
      console.log('hello');
      this.moveBubble();
    }, 400);
  }
  

  
  render() {
    var spaceGridList = this.state.gameGrid.map((eachgrid) => {
      let gridClass = eachgrid.isBubble ? 'grid bubble': 'grid';
      return <div className={gridClass} x={eachgrid.x} y={eachgrid.y}  key={eachgrid.x + '-' + eachgrid.y}></div>
    })
    var rocketGridList = this.state.rocketGrid.map((eachgrid) => {
      let rocketClass = eachgrid.isRocket ? 'grid rocket': 'grid'; 
      return <div className={rocketClass} y={eachgrid.y} key={eachgrid.y}></div>
    })
    // console.log(this.state.gameGrid);
    return (
      <React.Fragment>
        {spaceGridList}
        <div className='rocketGrid'>
          {rocketGridList}
        </div>
      </React.Fragment>
    );
  }
}

export default Game;