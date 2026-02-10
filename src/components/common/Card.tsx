// import type { ReactNode } from 'react';
// import StudyImage from '../../assets/social/study.png';

// interface CardProps {
//   children: ReactNode;
//   className?: string;
// }

// export default function Card({ className = '' }: CardProps) {
//   return (
//     <div
//       className={`flex w-[240px] flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE] ${className} cursor-pointer`}
//     >
//       <div
//         className="relative mx-auto flex h-[126px] w-[208px] flex-col items-end gap-[10px] rounded-[8px] bg-[lightgray] bg-cover bg-center bg-no-repeat px-[8px] py-[11px]"
//         style={{
//           backgroundImage: `url(${StudyImage})`,
//         }}
//       ></div>

//       <div className="w-full">
//         <div className="flex items-center gap-1">
//           <span className="truncate text-[16px] leading-[140%] font-semibold tracking-[-0.32px] text-[#2C2C2C]">
//             스터디명
//           </span>
//           <span className="text-primary-blue-500 text-[14px] leading-[140%] font-medium tracking-[-0.14px]">
//             (3/5)
//           </span>
//         </div>

//         <div className="mt-2 h-px w-full bg-[#DBEBFE]" />

//         <div className="mt-2">
//           <span className="text-opacity-black-80 text-caption-12M block">
//             스터디에 관한 간단한 소개
//           </span>
//         </div>

//         <div className="mt-1 flex items-center gap-1.5">
//           <span className="text-opacity-black-60 text-caption-12R">1월 7일 ~ 1월 14일</span>
//           <span className="text-opacity-black-60 text-caption-12R">/</span>
//           <span className="text-opacity-black-60 text-caption-12R">5명</span>
//         </div>
//       </div>
//     </div>
//   );
// }
