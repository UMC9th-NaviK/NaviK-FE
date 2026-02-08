type Props = {
  ProfileIcon: string;
  author: string;
  authorMeta: string;
};

export default function AuthorCard({ ProfileIcon, author, authorMeta }: Props) {
  return (
    <div className="flex w-full items-center gap-2 self-stretch rounded-[8px] bg-[#F5F8FF] px-[13px] py-[10px]">
      <img src={ProfileIcon} alt="프로필" className="h-10 w-10 rounded-full object-cover" />

      <div className="flex flex-col">
        <span className="text-body-14B text-base-900">{author}</span>
        <span className="text-caption-12R text-opacity-black-60">{authorMeta}</span>
      </div>
    </div>
  );
}
