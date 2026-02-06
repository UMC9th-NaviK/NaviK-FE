import Lottie from 'lottie-react';
import animationData from '../../assets/animation.json';

export const HomeBackground = () => {
  return (
    <div className="absolute inset-0 z-10 flex justify-center">
      <img
        src="/images/small-symbol-white.svg"
        className="absolute top-5.75 right-4 z-10 opacity-20"
      />
      <div className="relative w-full max-w-106.25">
        <Lottie animationData={animationData} loop className="w-full" />
        <Lottie animationData={animationData} loop className="w-full" />
        <div className="bg-primary-blue-500/60 absolute inset-0" />
        <div className="home-white-gradient absolute inset-0" />
      </div>
    </div>
  );
};
