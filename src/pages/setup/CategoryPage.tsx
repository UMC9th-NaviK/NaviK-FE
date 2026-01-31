import { motion } from 'framer-motion';
import JobSelect from '../../components/setup/JobSelect';

export default function CategoryPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-white">
      <div className="absolute inset-0">
        {/* 내부 요소 서서히 등장하기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          className="relative z-10"
        >
          {/* 카테고리 선택 UI */}
          <JobSelect />
        </motion.div>
      </div>
    </div>
  );
}
