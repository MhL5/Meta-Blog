import { ReactElement } from "react";
import Tag from "./Tag";
import inspirationTagImg from "../assets/tags/inspirationTag.jpg";
import natureTagImg from "../assets/tags/natureTag.jpg";
import lifeStyleTagImg from "../assets/tags/lifeStyleTag.jpg";
import healthTagImg from "../assets/tags/healthTag.jpg";
import travelTagImg from "../assets/tags/travelTag.jpg";
import foodTagImg from "../assets/tags/foodTag.jpg";
import technologyTagImg from "../assets/tags/technologyTag.jpg";

const fakeTagData = [
  { tag: `inspiration`, imgUrl: inspirationTagImg },
  { tag: `nature`, imgUrl: natureTagImg },
  { tag: `lifestyle`, imgUrl: lifeStyleTagImg },
  { tag: `health`, imgUrl: healthTagImg },
  { tag: `travel`, imgUrl: travelTagImg },
  { tag: `Food`, imgUrl: foodTagImg },
  { tag: `Technology`, imgUrl: technologyTagImg },
  { tag: `see all tags`, imgUrl: `` },
];

function Tags(): ReactElement {
  return (
    <div className="flex max-w-globalWidthContent flex-wrap items-center justify-center gap-4 p-2 text-center ">
      {fakeTagData.map((tag) => (
        <Tag {...tag} key={Math.random() * 999} />
      ))}
    </div>
  );
}

export default Tags;
