import { ReactElement } from "react";
import ArticleCard from "./ArticleCard";
import Button from "./Button";
import travelImg from "../assets/travel.jpg";
import lifestyleImg from "../assets/lifestyle.jpg";
import healthImg from "../assets/health.jpg";
import natureImg from "../assets/nature.jpg";
import foodImg from "../assets/food.jpg";
import inspirationImg from "../assets/inspiration.jpg";
import techImg from "../assets/tech.jpg";
import food2Img from "../assets/food2.jpg";
import Tags from "./Tags";

export type TempFakeCardsDataType = {
  className?: string;
  imgUrl: string;
  title:
    | `travel`
    | `health`
    | `lifestyle`
    | `nature`
    | `food`
    | `technology`
    | `inspiration`;
  heading: string;
  paragraph: string;
  readingTime: number;
};
const tempFakeCardsData: TempFakeCardsDataType[] = [
  {
    imgUrl: travelImg,
    title: `travel`,
    heading: `Never let your memories be greater than your dreams`,
    paragraph: `Mr. Branghton's house is small and inconvenient; though his shop, which takes in all the ground floor, is large and commodious. I believe I told you before, that he is a silver-smith.`,
    readingTime: 3,
  },
  {
    imgUrl: lifestyleImg,
    title: `lifestyle`,
    heading: `Self-observation is the first step of inner unfolding`,
    paragraph: `His recital put the Captain into an ecstasy; he went from the lady to the gentleman, and from the gentleman to the lady, to enjoy alternately the sight of their distress. He really shouted with...`,
    readingTime: 4,
  },
  {
    imgUrl: healthImg,
    title: `health`,
    heading: `The mind and body are not separate. what affects one, affects the other`,
    paragraph: `Before long the searchlight discovered some distance away a schooner
        with all sails set, apparently the same vessel which had been noticed
        earlier in the evening. The wind had by this time backed to the east,
        and there was a shudder amongst the watchers on`,
    readingTime: 3,
  },
  {
    imgUrl: natureImg,
    title: `nature`,
    heading: `Autumn is a second spring when every leaf is a flower`,
    paragraph: `She then expatiated very warmly upon the advantages I should reap from her plan; talked in a high style of my future grandeur; assured me how heartily I should despise almost every body and...`,
    readingTime: 3,
  },
  {
    imgUrl: travelImg,
    title: `travel`,
    heading: `Never let your memories be greater than your dreams`,
    paragraph: `Before long the searchlight discovered some distance away a schooner
        with all sails set, apparently the same vessel which had been noticed
        earlier in the evening. The wind had by this time backed to the east,
        and there was a shudder amongst the watchers on`,
    readingTime: 4,
  },
  {
    imgUrl: foodImg,
    title: `food`,
    heading: `Dramatically improve your cooking using just your imagination`,
    paragraph: `You cannot too assiduously attend to Madame Duval herself; but I would wish you to mix as little as possible with her associates, who are not likely to be among those whose acquaintance would`,
    readingTime: 5,
  },
  {
    imgUrl: lifestyleImg,
    title: `lifestyle`,
    heading: `Self-observation is the first step of inner unfolding`,
    paragraph: `His recital put the Captain into an ecstasy; he went from the lady to the gentleman, and from the gentleman to the lady, to enjoy alternately the sight of their distress. He really shouted with...`,
    readingTime: 4,
  },
  {
    imgUrl: inspirationImg,
    title: `inspiration`,
    heading: `It is during our darkest moments that we must focus to see the light`,
    paragraph: `Mina took a growing interest in everything and I was rejoiced to see that the exigency of affairs was helping her to forget for a time the terrible experience of the night. She was very, very pale`,
    readingTime: 2,
  },
  {
    imgUrl: techImg,
    title: `technology`,
    heading: `Bangladesh has developed plastic alternative using jute`,
    paragraph: `Before long the searchlight discovered some distance away a schooner
        with all sails set, apparently the same vessel which had been noticed
        earlier in the evening. The wind had by this time backed to the east,
        and there was a shudder amongst the watchers on`,
    readingTime: 7,
  },
  {
    imgUrl: food2Img,
    title: `food`,
    heading: `I do not stick to rules when cooking. I rely on my imagination`,
    paragraph: `I walked down to the station with them, and then wandered through the streets of the little town, finally returning to the hotel, where I lay upon the sofa and tried to interest myself in a yellow-...`,
    readingTime: 3,
  },
  {
    imgUrl: travelImg,
    title: `health`,
    heading: `The mind and body are not separate. what affects one, affects the other`,
    paragraph: `His recital put the Captain into an ecstasy; he went from the lady to the gentleman, and from the gentleman to the lady, to enjoy alternately the sight of their distress. He really shouted with`,
    readingTime: 5,
  },
  {
    imgUrl: travelImg,
    title: `technology`,
    heading: `Amphibious drone are being used to send medicine to flooded area`,
    paragraph: `Another tragedy. Had single watch to-night, as crew too tired to double. When morning watch came on deck could find no one except steersman. Raised outcry, and all came on deck...`,
    readingTime: 4,
  },
];

function FeaturedPost(): ReactElement {
  return (
    <section className="p-6">
      <div>
        <h2 className="m-auto mb-8 text-center text-5xl font-semibold">
          Most trend Posts
        </h2>
        <div className="m-auto grid max-w-globalWidthContent gap-4 p-4 md:grid-cols-3">
          {tempFakeCardsData.map((card, i) =>
            i >= 3 ? null : <ArticleCard {...card} key={Math.random() * 999} />,
          )}
        </div>
      </div>

      <div className="m-auto mb-14 mt-14 flex max-w-globalWidthContent flex-col items-center justify-center space-y-4">
        <p className="mb-4 text-center text-5xl font-semibold">Popular Tags</p>
        <Tags />
      </div>

      <div className="m-auto grid max-w-globalWidthContent gap-4 p-4 md:grid-cols-3">
        {tempFakeCardsData.map((card) => (
          <ArticleCard {...card} key={Math.random() * 999} />
        ))}
      </div>

      <div className="flex">
        <Button variant="primary" className="m-auto mt-6">
          Load more
        </Button>
      </div>
    </section>
  );
}

export default FeaturedPost;
