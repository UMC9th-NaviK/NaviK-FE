import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="gradient-bg-01 relative flex h-dvh flex-col items-center justify-center overflow-hidden">
      <motion.img
        src="/images/small-symbol-white.svg"
        alt=""
        initial={{
          scale: 0.448,
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: 1,
          top: 'auto',
          bottom: '1.125rem',
          left: '-4.875rem',
          x: '0',
          y: '0',
        }}
        transition={{
          delay: 1.0,
          duration: 0.6,
          ease: [0.6, -0.28, 0.735, 0.045],
        }}
        className="absolute h-98 w-99.75"
      />
      <motion.img
        src="/icons/logo-white.svg"
        alt="NaviK Logo"
        initial={{
          scale: 0.421,
          position: 'absolute',
          bottom: '5.375rem',
          left: '50%',
          x: '-50%',
        }}
        animate={{
          scale: 1,
          bottom: 'auto',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
        }}
        transition={{
          delay: 1.2,
          duration: 0.6,
          ease: [0.68, -0.55, 0.265, 1.55],
        }}
        className="h-10.4 absolute z-10 w-66.5"
      />
      <div className="bg-primary-blue-700 absolute -bottom-25 left-1/2 h-43 w-82 -translate-x-1/2 rounded-full blur-3xl" />
    </div>
  );
};

export default SplashScreen;
