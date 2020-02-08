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
  constructor(props) {
    super(props);
    this.state = {
      rocketGrid: [],
      bubbleGrid: [],
      score: 0,
      fire: []
    };

    this.formRocketGrid = this.formRocketGrid.bind(this);
    this.generateRandomBubble = this.generateRandomBubble.bind(this);
    this.moveBubble = this.moveBubble.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.moveFire = this.moveFire.bind(this);
    this.isDestroyBubble = this.isDestroyBubble.bind(this);
    this.generateBubble = this.generateBubble.bind(this);
    this.fireRocket = this.fireRocket.bind(this);
    this.moverRocketLeft = this.moverRocketLeft.bind(this);
    this.moverRocketRight = this.moverRocketRight.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startGame = this.startGame.bind(this);
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

  moverRocketRight() {
    const maxY = Math.floor(window.innerWidth / 10);
    const { x, y } = this.state.rocketGrid[0];
    if (y < maxY) {
      this.setState({
        rocketGrid: [{ x: x, y: y + 1 }]
      });
    }
  }

  moverRocketLeft() {
    const minY = 0;
    const { x, y } = this.state.rocketGrid[0];
    if (y > minY) {
      this.setState({
        rocketGrid: [{ x: x, y: y - 1 }]
      });
    }
  }

  fireRocket() {
    const { x: rocketx, y: rockety } = this.state.rocketGrid[0];
    console.log(rocketx, rockety);
    this.state.fire.push({ x: rocketx, y: rockety });
  }

  handleClick(e) {
    // console.log(e.target.value);
    if (e.target.value === 'right') {
      this.moverRocketRight();
    }
    if (e.target.value === "left") {
      this.moverRocketLeft();
    }

    if (e.target.value === "fire") {
      this.fireRocket();
    }
  }

  handleKeyDown(event) {
    
    const rightArrow = 39;
    const leftArrow = 37;

    if (event.keyCode === rightArrow) {
      this.moverRocketRight();
    }
    if (event.keyCode === leftArrow) {
      this.moverRocketLeft();
    }

    if (event.keyCode === 0 || event.keyCode === 32) {
      this.fireRocket();
    }
  }

  moveBubble() {
    let updatedBubbleGrid = this.state.bubbleGrid
      .map(eachgrid => {
        return { x: eachgrid.x + 1, y: eachgrid.y };
      })
      .filter(eachbubble => {
        return eachbubble.x < Math.floor(window.innerHeight / 10);
      });

    this.setState({
      bubbleGrid: updatedBubbleGrid
    });
  }

  moveFire() {
    if (this.state.fire.length !== 0) {
      let updatedFire = this.state.fire.map(eachfire => {
        return { x: eachfire.x - 1, y: eachfire.y };
      })
      this.setState({
        fire: updatedFire
      });
    }
  }

  isDestroyBubble() {
    const bubbleArray = this.state.bubbleGrid;
    const fireArray = this.state.fire;
    if(fireArray.length > 1) {
      bubbleArray.forEach(element => {
        // console.log(element, 'bubbleArray');
        for (let i = 0; i < fireArray.length; i++) {
          // console.log(fireArray, "bubbleArray");
          if (fireArray[i].x < -10) {
            fireArray.splice(i, 1);
          }
          if (element.x === fireArray[i].x && element.y === fireArray[i].y) {
            fireArray.splice(i, 1);
            bubbleArray.splice(bubbleArray.indexOf(element), 1);
          }
        }
      });
    }
    

    this.setState({
      bubbleGrid: bubbleArray,
      fire: fireArray
    });
  }

  generateBubble() {
    // this.state.bubbleGrid;
    if (this.state.bubbleGrid.length < 3) {
      let y1 = Math.floor(Math.random() * (window.innerWidth / 10));
      this.state.bubbleGrid.push({ x: 0, y: y1 });
    }
  }

  startGame() {
    this.generateRandomBubble();
    document.addEventListener("keydown", this.handleKeyDown);
    setInterval(() => {
      this.moveBubble();
      this.isDestroyBubble();
      this.generateBubble();
      this.moveFire();
    }, 200);
  }

  componentDidMount() {
    this.startGame();
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
        <div
          className="grid rocket"
          y={eachgrid.y}
          key={eachgrid.y}
          style={style}
        ></div>
      );
    });

    var firelist = this.state.fire.map(eachfire => {
      let style = {
        position: "absolute",
        left: eachfire.y === 0 ? 10 : eachfire.y * 10,
        top: eachfire.x * 10
      };
      return (
        <div
          className="grid fire"
          x={eachfire.x}
          y={eachfire.y}
          key={`${eachfire.x} ${eachfire.y}`}
          style={style}
        ></div>
      );
    });
    return (
      <React.Fragment>
        {bubbleObject}
        <div className="arrows">
          <button className='smallBtn' onClick={this.handleClick} value='left'> Left </button> &nbsp;
          <button className='smallBtn' onClick={this.handleClick} value='right'> Right </button>
        </div>
        <div className="fireButton">
          <button className='smallBtn' onClick={this.handleClick} value='fire'>Fire</button>
        </div>
        {firelist}
        <div className="rocketGrid">{rocketGridList}</div>
      </React.Fragment>
    );
  }
}

export default Game;