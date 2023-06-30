import React from "react";
import Lottie from "react-lottie";
import animationData from "../../Images/25523-wok-pan-food-fry-on-fire.json";

export default function LoadingAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}
