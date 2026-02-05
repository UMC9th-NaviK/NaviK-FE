import CalendarIcon from '../../../assets/social/material-symbols_calendar-today-rounded.svg';
import PersonIcon from '../../../assets/social/material-symbols_person-rounded.svg';

type InfoRowProps = {
  icon: 'calendar' | 'person';
  label: string;
  value: string;
};

export default function InfoRow({ icon, label, value }: InfoRowProps) {
  const src = icon === 'calendar' ? CalendarIcon : PersonIcon;

  return (
    <div className="flex w-full items-start gap-2">
      <img src={src} alt="" className="mt-[3px] h-4 w-4" />
      <span className="w-[56px] text-[14px] leading-[160%] font-bold tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        {label}
      </span>
      <span className="flex-1 text-[14px] leading-[160%] font-normal tracking-[-0.14px] text-[rgba(17,17,17,0.8)]">
        {value}
      </span>
    </div>
  );
}
