import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function JobPage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/setup/category');
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0">
        {/* 배경 이미지 - 위로 사라짐 */}
        <motion.img
          src="/images/setup-bg.svg"
          alt=""
          className="absolute top-0 right-0 left-0 h-auto w-full"
          initial={{ y: 0 }}
          animate={{ y: isExiting ? '-100%' : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.img
          src="/icons/logo-gradient.svg"
          alt="logo gradient"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ width: 310, height: 48, top: 84 }}
          initial={{ y: 0 }}
          animate={{ y: isExiting ? '-100vh' : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* 나머지 요소 - opacity로 사라짐 */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src="/images/setup-ellipse.svg"
            alt="setup ellipse background"
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{ width: 741, height: 440 }}
          />
          {/* 내부 요소 */}
          <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-8">
            <button
              onClick={handleNext}
              className="bg-primary-blue-500 text-body-16B text-base-100 mx-4 w-full cursor-pointer rounded-full py-3"
            >
              나의 직무 선택하기
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
