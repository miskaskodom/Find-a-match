import { useEffect, useState} from "react";
import sticker from "./assets/sticker.jpg";
import stickerone from "./assets/stickerone.jpg";
import stickertwo from "./assets/stickertwo.jpg";
import stickerthree from "./assets/stickerthree.jpg";
import stickerfour from "./assets/stickerfour.jpg";
import stickerfive from "./assets/stickerfive.jpg";
import stickersix from "./assets/stickersix.jpg";
import stickerseven from "./assets/stickerseven.jpg";
import Sticker from "./components/Sticker";

const initialArrayCards = [
  { id: "1", img: sticker },
  { id: "2", img: stickerone },
  { id: "3", img: stickertwo },
  { id: "4", img: stickerthree },
  { id: "5", img: stickerfour },
  { id: "6", img: stickerfive },
  { id: "7", img: stickersix },
  { id: "8", img: stickerseven },
];

const pairArrayCards = [...initialArrayCards, ...initialArrayCards];

function App() {
  const [arrayCards, setArrayCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matched, setMatched] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [pair, setPair] = useState(0);
  const [text, setText] = useState("Найдите все одинаковые карточки");

  const disable = () => {
    setIsDisabled(true);
  };
  const enable = () => {
    setIsDisabled(false);
  };

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (arrayCards[first].id === arrayCards[second].id) {
      setMatched((prev) => ({ ...prev, [arrayCards[first].id]: true }));
      setPair((pair) => pair + 1);
      setOpenCards([]);
      return;
    }
    setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const checkWin = () => {
    if (pair == 8) {
      setTimeout(() => {
        setText("Вы победили 🥳!!!");
      }, 500);
    }
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      setOpenCards([index]);
    }
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (sticker) => {
    return Boolean(matched[sticker.id]);
  };

  useEffect(() => {
    setArrayCards(shuffle(pairArrayCards));
  }, []);

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluate, 300);
    }
  }, [openCards]);

  useEffect(() => {
    checkWin();
  }, [matched]);

  return (
    <>
      <div>
        <div className="flex justify-center font-bold text-4xl p-2">
          {text}
        </div>
        <div className="flex flex-col justify-center mt-1 ">
          <div className="grid grid-rows-4 grid-cols-4 gap-3 items-stretch justify-center  p-8 bg-orange-300 rounded-[4px] w-[700px] h-[700px] shadow-xl">
            {arrayCards.map((sticker, index) => (
              <Sticker
                sticker={sticker}
                key={index}
                index={index}
                isDisabled={isDisabled}
                isInactive={checkIsInactive(sticker)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between  font-bold text-2xl p-4">
          <div>Сделано ходов: {moves}</div>
          <button
            className=" bg-orange-300 p-4 rounded-3xl shadow-md hover:bg-orange-200 hover:scale-105"
            onClick={() => location.reload()}
          >
            Начать заново
          </button>
          <div>Пар найдено: {pair} </div>
        </div>
      </div>
    </>
  );
}

export default App;
