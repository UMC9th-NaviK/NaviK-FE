import { motion } from 'framer-motion';
import JobSliderItem from './JobSliderItem';

const JobName = ['PM', 'Product Designer', 'Frontend Developer', 'Backend Developer'];

const SLIDER_CONFIG = [
  { initial: '0%', animate: '-50%' }, // 1번째 줄: 왼쪽에서 오른쪽
  { initial: '-40%', animate: '0%' }, // 2번째 줄: 오른쪽에서 왼쪽
  { initial: '10%', animate: '-40%' }, // 3번째 줄: 왼쪽에서 오른쪽
];

const JobSlider = () => {
  const duplicatedJobs = [...JobName, ...JobName, ...JobName, ...JobName];

  return (
    <div className="flex flex-col gap-4">
      {SLIDER_CONFIG.map((config, rowIndex) => (
        <div key={`row-${rowIndex}`} className="overflow-hidden">
          <motion.div
            className="flex gap-3"
            initial={{ x: config.initial }}
            animate={{ x: config.animate }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            }}
          >
            {duplicatedJobs.map((job, index) => (
              <JobSliderItem key={`row${rowIndex}-${index}`} text={job} />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default JobSlider;
