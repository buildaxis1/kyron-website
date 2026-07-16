import type { Menu } from "@/types/menu";

const menuData: Menu[] = [
  { id: 1, title: "Home", path: "/", newTab: false },
  { id: 2, title: "About", path: "/about", newTab: false },
  { id: 6, title: "How it works", path: "/#how-it-works", newTab: false },
  { id: 4, title: "News", path: "/news", newTab: false },
  { id: 7, title: "Careers", path: "/careers", newTab: false },
  {
    id: 5,
    title: "Resources",
    newTab: false,
    submenu: [
      { id: 51, title: "Blog", path: "/blog", newTab: false },
      {
        id: 55,
        title: "Resource Library",
        path: "/resources/blog",
        newTab: false,
      },
      {
        id: 52,
        title: "Case Studies",
        path: "/resources/case-studies",
        newTab: false,
      },
      {
        id: 53,
        title: "Whitepapers",
        path: "/resources/whitepapers",
        newTab: false,
      },
      { id: 54, title: "FAQs", path: "/resources/faqs", newTab: false },
      // {
      //   id: 55,
      //   title: "For Developers",
      //   path: "/resources/developers",
      //   newTab: false,
      // },
    ],
  },
];

export default menuData;
