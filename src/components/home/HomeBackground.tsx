export const HomeBackground = () => {
  return (
    <div className="absolute inset-0 z-10 flex justify-center">
      <div className="relative w-full max-w-106.25">
        {/* TODO: Lottie 애니메이션 */}
        <div className="absolute inset-0 bg-gray-200" />
        <div className="bg-primary-blue-500/60 absolute inset-0" />
        <div className="home-white-gradient absolute inset-0" />
      </div>
    </div>
  );
};
