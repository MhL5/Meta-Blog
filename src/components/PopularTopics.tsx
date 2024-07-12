import Image from "next/image";

export default function PopularTopics() {
  return (
    <>
      <p className="mb-8 mt-24 text-center text-2xl font-bold">
        Popular topics:
      </p>
      <section className="flex flex-wrap items-center justify-center gap-4">
        {Array.from({ length: 14 }).map((v, i) => (
          <div
            className="custom-hover || flex cursor-pointer flex-row gap-2 rounded-full border p-2"
            key={i}
          >
            <div className="relative flex aspect-square h-8 items-center justify-center">
              {/* TODO: REPLACE WITH CLOUDINARY */}
              <Image
                src="https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg"
                alt="test"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="m-auto text-nowrap text-xs"> next js </span>
          </div>
        ))}
        <div className="custom-hover || flex cursor-pointer flex-row gap-2 rounded-full border p-2">
          <span className="m-auto text-nowrap p-2 text-xs"> See MORE ➡️</span>
        </div>
      </section>
    </>
  );
}
