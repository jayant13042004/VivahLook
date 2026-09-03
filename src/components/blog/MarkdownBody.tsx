import ReactMarkdown from "react-markdown";

type MarkdownBodyProps = {
  markdown: string;
};

/** Server-safe markdown renderer for blog posts. */
export function MarkdownBody({ markdown }: MarkdownBodyProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h2>{children}</h2>,
        a: ({ href, children }) => (
          <a href={href} className="text-foreground underline underline-offset-4">
            {children}
          </a>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
