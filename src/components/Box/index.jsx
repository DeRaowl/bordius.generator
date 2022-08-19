import React, { useCallback, useEffect, useState } from 'react';
import Slider from '../Slider';
import _debounce from 'lodash/debounce';
import './index.css';

function Box() {
  const [positions, setPositions] = useState({ top: 30, right: 30, bottom: 30, left: 30 });
  const [isCopied, setIsCopied] = useState(false);

  const onRangeChange = (event) => {
    const { name, value } = event.target;
    setPositions({ ...positions, [name]: value });
  };

  const debounceFn = useCallback(_debounce(onRangeChange, 500), []);
  const { top, right, bottom, left } = positions;
  const borderRadius = `${top}% ${100 - top}% ${100 - bottom}% ${bottom}% / ${left}% ${right}% ${
    100 - right
  }% ${100 - left}%`;

  /* Border radius is been defined in this format 
  border-radius: top-left-up top-right-up bottom-right-down bottom-left-down /
  top-left-left top-right-right bottom-right-right bottom-left-left;
   */
  const boxStyle = {
    width: '450px',
    height: '450px',
    borderRadius,
    transform: 'translate 0.2s ease',
    background: '#272727',
    boxShadow: '-200px 100px rgba(200,200,200,0.1)'
  };

  const copyToClipBoard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(borderRadius);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <>
      <section className="box">
        <div className="box__wrapper" style={boxStyle}></div>
        <div className="sliders">
          <Slider type="range" className="slider top" name="top" onChange={onRangeChange} />
          <Slider type="range" className="slider right" name="right" onChange={onRangeChange} />
          <Slider type="range" className="slider bottom" name="bottom" onChange={onRangeChange} />
          <Slider type="range" className="slider left" name="left" onChange={onRangeChange} />
        </div>
      </section>
      <div className="user__content">
        <span className="title"> Border-Radius :</span>{' '}
        <span className="actual__output">
          {`${top}% ${100 - top}% ${100 - bottom}% ${bottom}% / ${left}% ${right}% ${
            100 - right
          }% ${100 - left}%`}
        </span>
        <span className="clipboard" onClick={copyToClipBoard}>
          {isCopied ? 'Copied' : 'Copy to Clipboard'}
        </span>
      </div>
    </>
  );
}

export default Box;
