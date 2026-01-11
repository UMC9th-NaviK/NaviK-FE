// pages/job/CategoryPage.tsx
import { motion } from 'framer-motion';

export default function CategoryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* 카테고리 선택 컨텐츠 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 px-4 py-8"
      >
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">직무 카테고리 선택</h1>
        {/* 카테고리 선택 UI */}
      </motion.div>
    </div>
  );
}
