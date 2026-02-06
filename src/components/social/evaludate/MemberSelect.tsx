import TeamMemberOn from '../../../../public/images/social/TeamMemberOn.svg';
import TeamMemberOff from '../../../../public/images/social/TeamMemeberOff.svg';

interface Member {
  id: number;
  name: string;
}

interface MemberSelectProps {
  members: Member[];
  selectedMember: number | null;
  onSelect: (id: number) => void;
}

export const MemberSelect = ({ members, selectedMember, onSelect }: MemberSelectProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="text-body-16B font-bold">평가할 스터디원을 선택하세요.</div>
      <div className="grid grid-cols-3 gap-4 pt-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex cursor-pointer flex-col items-center"
            onClick={() => onSelect(member.id)}
          >
            <div className="relative z-0 -mb-5.25 aspect-square w-full">
              <img
                src={selectedMember === member.id ? TeamMemberOn : TeamMemberOff}
                alt="profile"
                className="h-full w-full object-contain"
              />
            </div>
            <div
              className={`z-10 w-full rounded-lg border py-2 text-center transition-all ${
                selectedMember === member.id
                  ? 'bg-primary-blue-100 border-primary-blue-200 text-primary-blue-600 text-body-16B font-bold'
                  : 'border-base-300 bg-base-100 text-base-400 text-body-14B'
              }`}
            >
              {member.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
