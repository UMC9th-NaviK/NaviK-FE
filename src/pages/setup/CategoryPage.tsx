import { motion } from 'framer-motion';

export default function CategoryPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute right-0 bottom-0 left-0 overflow-hidden">
          <motion.img
            src="/images/setup-bg-rotate.svg"
            alt=""
            className="h-auto w-full"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        {/* 내부 요소 서서히 등장하기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          className="relative z-10"
        >
          {/* 카테고리 선택 UI */}
        </motion.div>
      </div>
    </div>
  );
}
