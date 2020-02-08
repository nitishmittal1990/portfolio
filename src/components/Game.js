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
      rocketGrid: [],
      bubbleGrid: []
    };

    this.formRocketGrid = this.formRocketGrid.bind(this);
    this.generateRandomBubble = this.generateRandomBubble.bind(this);
    this.moveBubble = this.moveBubble.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.formRocketGrid();
  }

  formRocketGrid() {
    const middleRocket = Math.floor(window.innerWidth / 20);
    const xordinateRocket = Math.floor(window.innerHeight / 10);
    this.state.rocketGrid.push({ x: xordinateRocket, y: middleRocket });
    console.log(this.state.rocketGrid);
  }

  generateRandomBubble() {
    let y1 = Math.floor(Math.random() * (window.innerWidth / 10));
    let y2 = Math.floor(Math.random() * (window.innerWidth / 10));
    let y3 = Math.floor(Math.random() * (window.innerWidth / 10));
    console.log(y1, y2, y3);
    let bubbleObject = [
      { x: 0, y: y1 },
      { x: 1, y: y2 },
      { x: 2, y: y3 }
    ];
    this.setState({
      bubbleGrid: bubbleObject
    });
  }

  handleKeyDown(event) {
    const rightArrow = 39;
    const leftArrow = 37;
    const maxY = Math.floor(window.innerWidth / 10);
    const minY = 0;
    const {x, y} = this.state.rocketGrid[0];
    if (event.keyCode === rightArrow) {
      if(y < maxY) {
        this.setState({
          rocketGrid: [{ x: x, y: y + 1 }]
        });
      }
    }
    if (event.keyCode === leftArrow) {
      if(y > minY) {
        this.setState({
          rocketGrid: [{ x: x, y: y - 1 }]
        });
      }
    }
    
    
  };

  moveBubble() {
    let updatedBubbleGrid = this.state.bubbleGrid.map(eachgrid => {
      return { x: eachgrid.x + 1, y: eachgrid.y };
    });

    this.setState({
      bubbleGrid: updatedBubbleGrid
    });
  }

  componentDidMount() {
    this.generateRandomBubble();
    document.addEventListener('keydown', this.handleKeyDown);
    setInterval(() => {
      this.moveBubble();
    }, 200);
  }

  render() {
    var bubbleObject = this.state.bubbleGrid.map(eachbubble => {
      let style = {
        position: "absolute",
        left: eachbubble.y === 0 ? 10 : eachbubble.y * 10,
        top: eachbubble.x === 0 ? 10 : eachbubble.x * 10
      };
      return (
        <div
          className="grid bubble"
          x={eachbubble.x}
          y={eachbubble.y}
          key={`${eachbubble.x} ${eachbubble.y}`}
          style={style}
        ></div>
      );
    });
    var rocketGridList = this.state.rocketGrid.map(eachgrid => {
      let style = {
        position: "absolute",
        left: eachgrid.y === 0 ? 10 : eachgrid.y * 10,
        top: eachgrid.x * 10
      };
      return (
        <div className='grid rocket' y={eachgrid.y} key={eachgrid.y} style={style}></div>
      );
    });

    return (
      <React.Fragment>
        {bubbleObject}
        <div className="rocketGrid">{rocketGridList}</div>
      </React.Fragment>
    );
  }
}

export default Game;