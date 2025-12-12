import { useMemo } from "react";

const escapeHtml = (unsafe) =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const transformLists = (text) =>
  text.replace(/(^|\n)(-\s.+(\n|$))+?/g, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((line) => line.replace(/^-+\s*/, "").trim())
      .filter(Boolean)
      .map((item) => `<li>${item}</li>`)
      .join("");
    return `\n<ul>${items}</ul>\n`;
  });

const markdownToHtml = (markdown = "") => {
  if (!markdown) return "";

  const codeBlocks = [];
  let text = markdown.replace(/\r\n/g, "\n");

  text = text.replace(/```([\s\S]*?)```/g, (_, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre><code>${escapeHtml(code.trim())}</code></pre>`);
    return `__CODE_BLOCK_${idx}__`;
  });

  text = text.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
  text = text.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  text = text.replace(/^\> (.*)$/gm, "<blockquote>$1</blockquote>");
  text = transformLists(text);
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  const blocks = text.split(/\n{2,}/).map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    const isHtmlBlock =
      /^<(h\d|ul|pre|blockquote)/.test(trimmed) || trimmed.startsWith("__CODE_BLOCK_");

    if (isHtmlBlock) return trimmed;
    return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
  });

  let html = blocks.join("\n");

  codeBlocks.forEach((block, idx) => {
    html = html.replace(`__CODE_BLOCK_${idx}__`, block);
  });

  return html;
};

function MarkdownRenderer({ content }) {
  const html = useMemo(() => markdownToHtml(content), [content]);

  return (
    <div
      className="blog-content prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default MarkdownRenderer;
