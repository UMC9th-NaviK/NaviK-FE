const JobSliderItem = ({ text }: { text: string }) => {
  return (
    <div className="border-primary-blue-200 text-body-eng-16SB text-primary-blue-900 rounded-[20px] border bg-white/30 px-5 py-2 whitespace-nowrap">
      {text}
    </div>
  );
};

export default JobSliderItem;
