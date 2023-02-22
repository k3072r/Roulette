import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import './App.css';
import FeverImage from './images/fever.png'
import FeverSlideImage from './images/feverSlide.png'
import Modal from './Modal';

const App = (props) => {
  //var slideContainer = document.getElementById("slideContainer");

  const [spin, setSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isFever, setIsFever] = useState(false);
  const [turnFever, setTurnFever] = useState(false);
  const [finishFever, setFinishFever] = useState(false);

  const datum_times1 = { option: '×1', style: { backgroundColor: '#00BFFF', textColor: 'black'} };
  const datum_times2 = { option: '×2', style: { backgroundColor: '#87CEEB', textColor: 'black'} };
  const datum_times3 = { option: '×3', style: { backgroundColor: '#00FA9A', textColor: 'black'} };
  const datum_times5 = { option: '×5', style: { backgroundColor: '#FFD700', textColor: 'black'} };
  const datum_halfMoon = { option: '半月', style: { backgroundColor: '#FF8C00', textColor: 'black'} };
  const datum_fullMoon = { option: '満月', style: { backgroundColor: '#FF4500', textColor: 'black'} };
  
  const dataNormal = [
    datum_times1,
    datum_times2,
    datum_times1,
    datum_times5,
    datum_times1,
    datum_times2,
    datum_times1,
    datum_halfMoon,
    datum_times1,
    datum_times2,
    datum_times1,
    datum_times3   
  ];

  const dataFever = [
    datum_times2,
    datum_halfMoon,
    datum_times3,
    datum_times5,
    datum_times2,
    datum_halfMoon,
    datum_times3,
    datum_times5,
    datum_times1,
    datum_fullMoon,
    datum_times3,
    datum_times5
  ];

  const [data, setData] = useState(dataNormal);

  const handleSpinClick = () => {
    const newIsFever = (((isFever ? 0.4 : 0.11) > Math.random() ) ? true : false);
    const newTurnFever = newIsFever > isFever ? true : false;
    const newFinishFever = newIsFever < isFever ? true : false;
    setIsFever(newIsFever);
    setTurnFever(newTurnFever);
    setFinishFever(newFinishFever);
    setData(newIsFever ? dataFever : dataNormal);
    if (!newTurnFever && !newFinishFever) {
      rouletteSpin();
    }
  };

  const rouletteSpin = () => {
    setPrizeNumber(Math.random() * data.length);
    setSpin(true);
  }

  const rouletteDidSpin = () => {
    setSpin(false);
  };

  return (
    <div className="App">
      
    <div className="roulette" align="center">
    <Wheel
      mustStartSpinning={spin}
      prizeNumber={prizeNumber}
      data={data}
      radiusLineColor='white'
      outerBorderColor='white'
      fontSize={'30'}
      spinDuration={0.3}
      perpendicularText={true}
      onStopSpinning={rouletteDidSpin}
    />
    </div>

    <div className='buttonSpace'>
    { !spin &&
      <button
        className='spinButton'
        style={{marginTop: '20px'}}
        onClick={handleSpinClick}
      >
        spin
      </button>
    }
    </div>

    <style>
      {`@keyframes turnFever {
          0% {
            top: -50%;
            opacity: 0;   
          } 100% {
            top: 0%;
            opacity: 1;
          }
        }`}
    </style>

    { turnFever &&
      <Modal closeModal={() => {setTurnFever(false); rouletteSpin()}}>
        <img
          style={{animation: 'turnFever 1s linear 0s 1 normal forwards'}}
          src={FeverImage}
          alt='sliding string'
          height={"100%"}
          width={"100%"}
        />
      </Modal>
    }

    { finishFever &&
      <Modal closeModal={() => {setFinishFever(false); rouletteSpin()}}>
        <img
          style={{animation: 'turnFever 1s linear 0s 1 reverse forwards'}}
          src={FeverImage}
          alt='sliding string'
          height={"100%"}
          width={"100%"}
        />
      </Modal>
    }

    { isFever &&
      <div className='slideContainer'>
        {/*<p>Fever Mode !!!</p>*/}
        <img src={FeverSlideImage} alt='error'></img>
      </div>
    }

    </div>
  );

};


export default App;
