import React, { useState, useEffect } from 'react';
import _ from 'lodash';
/**
 * Make dynamic grid based on window.width
 * widnow.height - rocket size
 * Make random circle on different y of grid
 * Make a rocket
 * When rocket fire x,y co-ordinate matches with circle x,y co-odrinate score increase
 * Circle keep moving on x-co-ordinate
 *
 */
const BUBBLE_SIZE = 20;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight - 90;
function getRandomPositionX() {
  return Math.floor(Math.random() * Math.floor(WINDOW_HEIGHT / BUBBLE_SIZE));
}
function getRandomPositionY() {
  return Math.floor(Math.random() * Math.floor(WINDOW_WIDTH / BUBBLE_SIZE));
}

function Game(props) {
  const [fireList, setFireList] = useState([]);
  const [time, setTime] = useState(0);
  const [bubbleList, setBubbleList] = useState([
    {
      x: 0,
      y: getRandomPositionY(),
    },
    {
      x: 0,
      y: getRandomPositionY(),
    },
    {
      x: 0,
      y: getRandomPositionY(),
    },
  ]);
  const [rocketGrid, setRocketGrid] = useState({
    x: WINDOW_HEIGHT,
    y: WINDOW_WIDTH / 2,
  });
  // console.log(bubbleList);

  const bubbleMove = () => {
    if (bubbleList.length > 0) {
      let updatedBubbleList = bubbleList.map((bubble) => {
        return { x: bubble.x + 1, y: bubble.y };
      });
      let filterBubble = updatedBubbleList.filter((bubble) => {
        return bubble.x < WINDOW_HEIGHT / BUBBLE_SIZE;
      });
      console.log(filterBubble, 'bubblearray');
      setBubbleList(filterBubble);
    }
  };
  const fireMove = () => {
    if (fireList.length > 0) {
      let updatedFireList = fireList.map((fire) => {
        return { x: fire.x - 1, y: fire.y };
      });
      let filterFire = updatedFireList.filter((fire) => {
        return fire.x > 0;
      });
      // console.log(filterBubble, 'bubblearray');
      setFireList(filterFire);
    }
  };
  const generateBubble = () => {
    console.log('generateBubble called');
    setBubbleList([
      ...bubbleList,
      { x: 0, y: getRandomPositionY() },
      { x: 0, y: getRandomPositionY() },
      { x: 0, y: getRandomPositionY() },
    ]);
  };

  const generateFire = () => {
    const updatedFireList = {
      x: Math.floor(rocketGrid.x / BUBBLE_SIZE),
      y: Math.floor(rocketGrid.y / BUBBLE_SIZE),
    };
    console.log(updatedFireList);
    setFireList([...fireList, updatedFireList]);
  };

  const handleKeyEvents = (event) => {
    const rightArrow = 39;
    const leftArrow = 37;

    if (event.keyCode === rightArrow) {
      // moverRocketRight();
    }
    if (event.keyCode === leftArrow) {
      // moverRocketLeft();
    }

    if (event.keyCode === 0 || event.keyCode === 32) {
      // _.debounce(fireRocket(), 300);
      generateFire();
    }
  };

  const gameOver = () => {
    setFireList([]);
    setBubbleList([
      {
        x: 0,
        y: getRandomPositionY(),
      },
      {
        x: 0,
        y: getRandomPositionY(),
      },
      {
        x: 0,
        y: getRandomPositionY(),
      },
    ]);
    setRocketGrid({
      x: WINDOW_WIDTH / 2,
      y: WINDOW_HEIGHT,
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvents);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
      bubbleMove();
      fireMove();
      if (bubbleList.length < 3) {
        generateBubble();
      }
    }, 200);
    return () => {
      // gameOver();
      clearTimeout(timer);
    };
  }, [time, generateBubble]);

  return (
    <>
      {bubbleList.length > 0
        ? bubbleList.map((bubble) => {
            let style = {
              left: bubble.y === 0 ? BUBBLE_SIZE : bubble.y * BUBBLE_SIZE,
              top: bubble.x === 0 ? BUBBLE_SIZE : bubble.x * BUBBLE_SIZE,
            };
            return (
              <div
                x={bubble.x}
                y={bubble.y}
                id={`bubble${bubble.x}${bubble.y}`}
                className="grid bubble"
                style={style}
              ></div>
            );
          })
        : ''}
      {fireList.length > 0
        ? fireList.map((fire) => {
            let style = {
              left: fire.y === 0 ? BUBBLE_SIZE : fire.y * BUBBLE_SIZE,
              top: fire.x === 0 ? BUBBLE_SIZE : fire.x * BUBBLE_SIZE,
            };
            return (
              <div
                x={fire.x}
                y={fire.y}
                id={`fire${fire.x}${fire.y}`}
                className="grid fire"
                style={style}
              ></div>
            );
          })
        : ''}
      <div className="rocketGrid">
        <div
          className="grid rocket"
          key={rocketGrid.y}
          style={{
            position: 'absolute',
            left: rocketGrid.y,
            top: rocketGrid.x,
          }}
        ></div>
      </div>
      {/* <div
        class=""
        style={{
          background: 'red',
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: '200px',
          width: '200px',
        }}
      ></div> */}
    </>
  );
}

export default Game;
