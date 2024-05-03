import { ReactElement } from "react";

type TotalMemberCardProps = { className?: string };

function TotalMemberCard({ className }: TotalMemberCardProps): ReactElement {
  return (
    <div
      className={`${className} custom-shadow || flex w-80 gap-4 rounded-2xl bg-bodyBackgroundColor p-6`}
    >
      <div className="text-5xl font-bold">+70</div>
      <div className="text-sm">Readers who joined the community</div>
    </div>
  );
}

export default TotalMemberCard;
