import { motion } from 'framer-motion';

const AnalysisPage = () => {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute top-[calc(50%-60px)] left-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #94BBFD 0%, rgba(184, 212, 254, 0) 100%)',
        }}
      />

      {/* 로딩 인디케이터 */}
      <div className="relative z-10 mb-20 h-62.5 w-62.5">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4E83F9]"
          animate={{
            width: ['100px', '250px', '100px'],
            height: ['100px', '250px', '100px'],
            opacity: [0.15, 0.05, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4E83F9]"
          animate={{
            width: ['100px', '177.78px', '100px'],
            height: ['100px', '177.78px', '100px'],
            opacity: [0.15, 0.08, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 flex h-25 w-25 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#4E83F9]"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img src="/images/small-symbol-white.svg" width={57} height={56} />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2">
        <p className="text-heading-20B text-gradient">AI 분석 결과 로딩중...</p>
        <p className="text-body-14M text-opacity-black-60">
          활동 데이터를 분석해 결과를 생성하고 있어요
        </p>
      </div>
    </div>
  );
};

export default AnalysisPage;
