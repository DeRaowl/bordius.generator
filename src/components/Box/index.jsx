import { useEffect, useState } from 'react';
import Slider from '../Slider';
import './index.css';
import { FiCopy } from 'react-icons/fi';

function Box() {
  const [positions, setPositions] = useState({
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  });
  const [isCopied, setIsCopied] = useState(false);

  const onRangeChange = (event) => {
    const { name, value } = event.target;
    setPositions({ ...positions, [name]: value });
  };

  const { top, right, bottom, left } = positions;
  const borderRadius = `${top}% ${100 - top}% ${100 - bottom}% ${bottom}% / ${left}% ${right}% ${
    100 - right
  }% ${100 - left}%`;

  /* Border radius is been defined in this format 
  border-radius: top-left-up top-right-up bottom-right-down bottom-left-down /
  top-left-left top-right-right bottom-right-right bottom-left-left;
   */
  const boxStyle = {
    width: '300px',
    height: '300px',
    borderRadius,
    transform: 'translate 0.2s ease',
    backgroundImage:
      'linear-gradient(70deg,hsl(240deg 100% 20%) 0%,hsl(289deg 100% 21%) 6%,hsl(315deg 100% 27%) 15%,hsl(329deg 100% 36%) 28%,hsl(337deg 100% 43%) 46%,hsl(357deg 91% 59%) 65%,hsl(17deg 100% 59%) 78%,hsl(34deg 100% 53%) 88%,hsl(45deg 100% 50%) 95%,hsl(55deg 100% 50%) 100%)',
    boxShadow: '-100px 75px rgba(20,25,155,0.1)'
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
    <div className="main">
      <div className="header">
        <p className="header__title">Bordius Generator</p>
        <span role="img" aria-label="spark" className="header__desc">
          A perfect border radius ✨
        </span>
      </div>
      <section className="box">
        <div className="box__wrapper" style={boxStyle}></div>
        <div className="sliders">
          <Slider type="range" className="slider top" name="top" onChange={onRangeChange} />
          <Slider type="range" className="slider right" name="right" onChange={onRangeChange} />
          <Slider type="range" className="slider bottom" name="bottom" onChange={onRangeChange} />
          <Slider type="range" className="slider left" name="left" onChange={onRangeChange} />
        </div>
      </section>
      <div className="content">
        <p className="content__actual">
          <span>border-radius: </span>
          {`${top}% ${100 - top}% ${100 - bottom}% ${bottom}% / ${left}% ${right}% ${
            100 - right
          }% ${100 - left}%`}
        </p>
        <p className="content__clipboard" onClick={copyToClipBoard}>
          <span>{<FiCopy />}</span>
          {isCopied ? 'Copied' : 'Copy'}
        </p>
      </div>
    </div>
  );
}

export default Box;
