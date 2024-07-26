import { visit } from "unist-util-visit";

/**
 * a custom plugin for rendering admonitions in markdown.
 * It adds a class to the first child of each paragraph that starts with ':::tip', ':::danger', etc.
 */
export default function customAdmonitionPlugin() {
  return (tree: any) => {
    visit(tree, "paragraph", (node) => {
      ["tip", "danger", "info", "caution", "note"].forEach((s) =>
        checkAndAddClass(node, s),
      );
    });
  };
}

function checkAndAddClass(node: any, string: string) {
  const { children } = node;

  const isAdmonition =
    children.length > 0 &&
    children[0].type === "text" &&
    children[0].value.startsWith(`:::${string}`);

  if (!isAdmonition) return;
  // Modify the first child to remove ':::tip' and add a class

  children[0].value = children[0].value.replace(`:::${string}`, "").trim();
  children[children.length - 1].value = children[children.length - 1].value
    .replace(`:::`, "")
    .replace(`:::'`, "")
    .replace(`:::"`, "")
    .trim();

  node.data = {
    hProperties: {
      className: string,
    },
  };
}
