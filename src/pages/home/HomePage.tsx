import { HomeBackground } from '../../components/home/HomeBackground';

const HomePage = () => {
  return (
    <>
      <div className="relative min-h-dvh overflow-hidden">
        <HomeBackground />
        <div className="relative z-10 py-200">
          <h1>Home Content</h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
