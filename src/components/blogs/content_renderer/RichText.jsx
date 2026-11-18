import Link from 'next/link';

const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

function isSafeHref(href) {
  if (typeof href !== 'string' || !href.trim()) return false;

  // Allow internal relative links.
  if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/\\')) {
    return true;
  }

  try {
    const url = new URL(href);
    return ALLOWED_PROTOCOLS.includes(url.protocol);
  } catch {
    return false;
  }
}

function applyMarks(content, marks = []) {
  const normalizedMarks = Array.isArray(marks) ? marks : [marks];

  return normalizedMarks.reduce((result, mark) => {
    switch (typeof mark === 'string' ? mark : mark?.type) {
      case 'bold':
        return <strong>{result}</strong>;

      case 'italic':
        return <em>{result}</em>;

      case 'underline':
        return <u>{result}</u>;

      case 'strike':
      case 'strikethrough':
        return <s>{result}</s>;

      case 'code':
        return (
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-[#B31942] dark:bg-white/10 dark:text-[#ff8da0]">
            {result}
          </code>
        );

      default:
        return result;
    }
  }, content);
}

export default function RichText({ content, className = '' }) {
  if (content == null) return null;

  // Supports existing plain strings from blogData.js.
  if (typeof content === 'string' || typeof content === 'number') {
    return <span className={className}>{content}</span>;
  }

  if (!Array.isArray(content)) {
    return null;
  }

  return (
    <span className={className}>
      {content.map((node, index) => {
        if (node == null) return null;

        if (typeof node === 'string' || typeof node === 'number') {
          return <span key={index}>{node}</span>;
        }

        if (node.type === 'hardBreak') {
          return <br key={index} />;
        }

        if (node.type !== 'text' && node.type !== 'link') {
          return null;
        }

        const value = node.value ?? node.text ?? '';
        const marks = node.marks ?? [];

        let output = applyMarks(value, marks);

        const linkMark = marks.find(
          (mark) => typeof mark === 'object' && (mark.type === 'link' || mark.type === 'a'),
        );

        const href = node.href ?? node.url ?? linkMark?.href ?? linkMark?.url;

        if ((node.type === 'link' || linkMark) && isSafeHref(href)) {
          const isExternal = /^https?:\/\//i.test(href);

          output = isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#0A3161] underline decoration-[#0A3161]/30 underline-offset-4 transition hover:text-[#B31942] dark:text-[#7cc4ff] dark:hover:text-[#ff8da0]"
            >
              {output}
            </a>
          ) : (
            <Link
              href={href}
              className="font-medium text-[#0A3161] underline decoration-[#0A3161]/30 underline-offset-4 transition hover:text-[#B31942] dark:text-[#7cc4ff] dark:hover:text-[#ff8da0]"
            >
              {output}
            </Link>
          );
        }

        return <span key={index}>{output}</span>;
      })}
    </span>
  );
}
