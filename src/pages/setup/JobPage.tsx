import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import JobStart from '../../components/setup/JobStart';

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
    <div className="relative min-h-dvh overflow-hidden bg-white">
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
          src="/icons/reports/logo-gradient.svg"
          alt="logo gradient"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ width: 310, height: 48, top: 72 }}
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
          <JobStart onNext={handleNext} />
        </motion.div>
      </div>
    </div>
  );
}
