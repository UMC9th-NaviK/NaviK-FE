import React from 'react';

const PolicyItem = () => {
  return (
    <div className="flex gap-2 py-2">
      {/* 체크박스 */}
      <span className="flex w-full justify-between">
        <p className="text-body-16M text-opacity-black-60 flex">
          서비스 이용약관
          <p className="text-opacity-black-40">(필수)</p>
        </p>
        <p>보기</p>
      </span>
    </div>
  );
};

export default PolicyItem;
