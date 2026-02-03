const ResultButton = () => {
  return (
    <button
      className="text-primary-blue-500 text-body-16B w-full rounded-full py-3 text-center"
      style={{
        border: '0.5px solid var(--primary-blue-500/40, rgba(78, 131, 249, 0.40))',
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0.00) 0%, var(--base-100-white, #FFF) 100%)',
        boxShadow: '0 0 40px 0 var(--PrimaryBlue-200, #B8D4FE)',
      }}
    >
      분석 결과 활용하기
    </button>
  );
};

export default ResultButton;
