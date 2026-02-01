type JobKpiItemProps = {
  index?: string;
  content?: string;
};

const JobKpiItem = ({ index, content }: JobKpiItemProps) => {
  return (
    <div className="border-b-primary-blue-100 flex gap-2 border-b px-2 py-3 last:border-0">
      <p className="text-body-16B text-primary-blue-500">{index}</p>
      <p className="text-body-16SB text-base-600">{content}</p>
    </div>
  );
};

export default JobKpiItem;
