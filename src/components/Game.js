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
    this._isMounted = false;
    this._size = 20;
    this.score = 0;
    this.state = {
      rocketGrid: [],
      bubbleGrid: [],
      fire: []
    };

    this.formRocketGrid = this.formRocketGrid.bind(this);
    this.moveBubble = this.moveBubble.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.moveFire = this.moveFire.bind(this);
    this.isDestroyBubble = this.isDestroyBubble.bind(this);
    this.generateBubble = this.generateBubble.bind(this);
    this.fireRocket = this.fireRocket.bind(this);
    this.moverRocketLeft = this.moverRocketLeft.bind(this);
    this.moverRocketRight = this.moverRocketRight.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.formRocketGrid();
    this.interval = setInterval(() => {
      this.moveBubble();
      this.isDestroyBubble();
      this.generateBubble();
      this.moveFire();
    }, 200);
    
  }

  formRocketGrid() {
    const middleRocket = Math.floor(window.innerWidth / (this._size*2));
    const xordinateRocket = Math.floor(window.innerHeight / this._size) - 4;
    this.state.rocketGrid.push({ x: xordinateRocket, y: middleRocket });
    // console.log(this.state.rocketGrid);
  }


  moverRocketRight() {
    const maxY = Math.floor(window.innerWidth / this._size);
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
    // console.log(rocketx, rockety);
    this.state.fire.push({ x: rocketx, y: rockety });
  }

  handleClick(e) {
    // console.log(e.target.value);
    if (e.target.value === "right") {
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

  isGameOverHandle = () => {
    const isGameOver = this.state.bubbleGrid.every(
      eachbubble => eachbubble.x < Math.floor(window.innerHeight / this._size) - 8
    );
    this.props.isGameOverCallback({ isGameOver: isGameOver, score: this.score});
  };

  moveBubble() {
    this.isGameOverHandle();
    let updatedBubbleGrid = this.state.bubbleGrid
      .map(eachgrid => {
        return { x: eachgrid.x + 1, y: eachgrid.y };
      })
      .filter(eachbubble => {
        return eachbubble.x < Math.floor(window.innerHeight / this._size);
      });

    this._isMounted && this.setState({
      bubbleGrid: updatedBubbleGrid
    });
  }

  moveFire() {
    if (this.state.fire.length !== 0) {
      let updatedFire = this.state.fire
        .map(eachfire => {
          return {
            x: eachfire.x - 1,
            y: eachfire.y
          };
        })
        .filter(eachfire => {
          if (eachfire.x < 0) {
            return false;
          } else {
            return true;
          }
        });

      this._isMounted && this.setState({
        fire: updatedFire
      });
    }
  }

  isDestroyBubble() {
    const bubbleArray = this.state.bubbleGrid;
    const fireArray = this.state.fire;
    if (fireArray.length > 0) {
      bubbleArray.forEach(element => {
        // console.log(element, 'bubbleArray');
        for (let i = 0; i < fireArray.length; i++) {
          // console.log(fireArray, "bubbleArray");

          console.log('bubbleArray', element.x, element.y);
          console.log('fireArray', fireArray[i].x, fireArray[i].y);
          if (element.x === fireArray[i].x && element.y === fireArray[i].y) {
            this.score += 10;
            fireArray.splice(i, 1);
            bubbleArray.splice(bubbleArray.indexOf(element), 1);
          }
        }
      });
    }

    this._isMounted && this.setState({
      bubbleGrid: bubbleArray,
      fire: fireArray
    });
  }

  generateBubble() {
    // this.state.bubbleGrid;
    if (this.state.bubbleGrid.length < 3) {
      let y1 = Math.floor(Math.random() * (window.innerWidth / this._size));
      this.state.bubbleGrid.push({ x: 0, y: y1 });
    }
  }


  componentDidMount() {
    this._isMounted = true;
    document.addEventListener("keydown", this.handleKeyDown);
   
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this._isMounted = false;
    clearInterval(this.interval);
  }

  render() {
    var bubbleObject = this.state.bubbleGrid.map(eachbubble => {
      let style = {
        position: "absolute",
        left: eachbubble.y === 0 ? this._size : eachbubble.y * this._size,
        top: eachbubble.x === 0 ? this._size : eachbubble.x * this._size
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
        left: eachgrid.y === 0 ? this._size : eachgrid.y * this._size,
        top: eachgrid.x * this._size
      };
      // console.log(style);
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
        left: eachfire.y === 0 ? this._size : eachfire.y * this._size,
        top: eachfire.x * this._size
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
          <button className="smallBtn" onClick={this.handleClick} value="left">
            Left
          </button>
          &nbsp;
          <button className="smallBtn" onClick={this.handleClick} value="right">
            Right
          </button>
        </div>
        <div className="fireButton">
          <button className="smallBtn" onClick={this.handleClick} value="fire">
            Fire
          </button>
        </div>
        {firelist}
        <div className="rocketGrid">{rocketGridList}</div>
      </React.Fragment>
    );
  }
}

export default Game;