interface JobSummaryProps {
  job: string;
  title: string;
  body: string;
}

const JobSummary = ({ job, title, body }: JobSummaryProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-heading-20B text-base-900 flex">
        <span className="text-primary-blue-500">{job}&nbsp;</span>직무요약
      </p>
      <div className="shadow-card bg-base-100 text-body-14M flex flex-col gap-2 rounded-2xl p-4">
        <p className="text-primary-blue-500">{title}</p>
        <p className="text-opacity-black-80">{body}</p>
      </div>
    </div>
  );
};

export default JobSummary;
