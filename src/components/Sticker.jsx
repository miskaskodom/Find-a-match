import React from "react";
import backside from "../assets/backside.png";

const Sticker = ({
  onClick,
  sticker,
  index,
  isInactive,
  isFlipped,
  isDisabled,
}) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };
  return (
    <div
      onClick={handleClick}
      className={`w-[150px] h-[150px]   rounded-[4px] shadow-md  relative   `}
    >
      <div
        className={`  ${
          isInactive ? "opacity-0" : ""
        } absolute rounded-md  w-[150px] h-[150px] border-2 border-solid backface-hidden border-gray-600   `}
      >
        <img src={sticker.img} />
      </div>
      <div
        className={`${isFlipped ? " duration-700 rotate-y-180 " : " "} ${
          isInactive ? "opacity-0" : ""
        } cursor-pointer absolute rounded-md  w-[150px] h-[150px] border-2 border-solid backface-hidden border-gray-600 bg-violet-400 hover:bg-violet-300 hover:scale-105 `}
      >
        <img src={backside} />
      </div>
    </div>
  );
};

export default Sticker;
