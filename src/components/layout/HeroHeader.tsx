"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg",
  },
];

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
