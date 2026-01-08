const SplashScreen = () => {
  return (
    <div className="gradient-bg-01 relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <img src="/icons/logo-white.svg" alt="NaviK Logo" className="h-10.4 w-66.5" />
      <img
        src="/images/big-symbol-white.svg"
        alt="NaviK Logo"
        className="absolute bottom-4.5 left-0"
      />

      <div className="bg-primary-blue-700 absolute -bottom-25 left-1/2 h-43 w-82 -translate-x-1/2 rounded-full blur-3xl" />
    </div>
  );
};

export default SplashScreen;
