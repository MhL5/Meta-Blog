"use server";
/**
 * this is a script used for cleaning and adding fake but reasonable data into the database
 * for demo purposes
 */

import prismaClient from "@/lib/prismaClient";
import { slugify } from "@/utils/slugify";
import { faker } from "@faker-js/faker";
import { Categories } from "@prisma/client";

async function createUserArticles(num: number) {
  try {
    console.log(`Pending createUserArticles...🏗️`);

    const user = await prismaClient.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "author",
        password: `test1234`,
        bio: faker.lorem.paragraph(),
        image: faker.image.avatar(),
      },
    });
    for (let i = 0; i < num; i++) {
      const randomCategory = Object.keys(Categories)[
        Math.floor(Math.random() * Object.keys(Categories).length)
      ] as keyof typeof Categories;

      const title = faker.lorem.words();

      await prismaClient.article.create({
        data: {
          title,
          slug: `${slugify(title)}`,
          avatar: faker.image.urlPicsumPhotos(),
          content: faker.lorem.paragraphs(15),
          readingTime: faker.number.int(60),
          category: randomCategory,
          tags: generateTagsFromTitle(title),
          authorId: user.id,
        },
      });

      console.log(`${i} Record created📄`);
    }

    console.log(`Done createUserArticles.🏁`);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

function generateTagsFromTitle(title: string) {
  // Basic tag generation from title
  const words = title.split(" ");
  return words.map((word) => word.toLowerCase().replace(/[^a-z0-9]/g, "")); // Clean and lower-case words for tags
}

export async function importDevData() {
  try {
    await createUserArticles(16);

    console.log(`\n importDevData execution Done. \n`);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

if (process.argv[2] === "--import") importDevData();
// if (process.argv[2] === "--delete") deleteData();
