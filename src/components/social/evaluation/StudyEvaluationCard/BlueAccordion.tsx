import { useState } from 'react';
import ClickIcon from '../../../../assets/social/material-symbols_arrow-back-ios-new-rounded (1).svg';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export default function BlueAccordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`bg-primary-blue-500 flex h-12 w-full -rotate-[0.015deg] cursor-pointer items-center justify-between self-stretch px-3 py-2 ${
          open ? 'rounded-t-lg' : 'rounded-lg'
        }`}
      >
        <span className="text-body-16B text-white">[{title}] 스터디</span>

        <img
          src={ClickIcon}
          alt="toggle"
          className={`h-4 w-4 transition-transform duration-200 ease-out ${
            open ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex w-full flex-col items-start self-stretch rounded-b-lg border border-[#B8D4FE] bg-white px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
