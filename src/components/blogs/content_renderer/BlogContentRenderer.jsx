import Image from 'next/image';
import { Info, Quote } from 'lucide-react';
import RichText from './RichText';

const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function getText(value) {
  if (typeof value === 'string') return value;

  if (Array.isArray(value)) {
    return value.map(getText).join('');
  }

  if (value && typeof value === 'object') {
    return value.value ?? value.text ?? '';
  }

  return '';
}

function HeadingBlock({ block }) {
  const level = Math.min(Math.max(Number(block.level) || 2, 1), 4);
  const Heading = `h${level}`;
  const text = block.text ?? getText(block.children);
  const id = block.id || slugify(text);

  const styles = {
    1: 'pt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl',
    2: 'scroll-mt-28 pt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl',
    3: 'scroll-mt-28 pt-2 text-xl font-semibold sm:text-2xl',
    4: 'scroll-mt-28 pt-2 text-lg font-semibold',
  };

  return (
    <Heading id={id} className={`${styles[level]} text-slate-900 dark:text-white`}>
      {block.children ? <RichText content={block.children} /> : block.text}
    </Heading>
  );
}

function ParagraphBlock({ block }) {
  const content = block.children ?? block.text;

  return (
    <p className="text-[17px] leading-[1.85] text-slate-700 dark:text-white/75">
      <RichText content={content} />
    </p>
  );
}

function ListItems({ items = [], ordered = false }) {
  const List = ordered ? 'ol' : 'ul';

  return (
    <List
      className={
        ordered
          ? 'list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#B31942] dark:marker:text-[#ff8da0]'
          : 'list-disc space-y-2 pl-6 marker:text-[#B31942] dark:marker:text-[#ff8da0]'
      }
    >
      {items.map((item, index) => {
        const isObject = item && typeof item === 'object';
        const content = isObject ? (item.children ?? item.content ?? item.text ?? '') : item;

        return (
          <li key={item?.id ?? index} className="pl-1">
            <RichText content={content} />

            {isObject && item.items?.length > 0 && (
              <div className="mt-2">
                <ListItems items={item.items} ordered={Boolean(item.ordered)} />
              </div>
            )}
          </li>
        );
      })}
    </List>
  );
}

function ListBlock({ block }) {
  const ordered = block.type === 'ol' || block.ordered === true || block.style === 'ordered';

  return <ListItems items={block.items ?? block.children ?? []} ordered={ordered} />;
}

function TableBlock({ block }) {
  const headers = block.headers ?? [];
  const rows = block.rows ?? [];

  return (
    <div className="my-2 w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        {headers.length > 0 && (
          <thead className="bg-slate-100 dark:bg-white/10">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900 dark:border-white/10 dark:text-white"
                >
                  <RichText content={header} />
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className="border-b border-slate-100 last:border-0 dark:border-white/10"
            >
              {(row.cells ?? row).map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-slate-700 dark:text-white/75">
                  <RichText content={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageBlock({ block }) {
  if (!block.src) return null;

  return (
    <figure className="my-2">
      <Image
        src={block.src}
        alt={block.alt ?? ''}
        width={block.width ?? 1600}
        height={block.height ?? 900}
        sizes="(min-width: 1280px) 800px, (min-width: 768px) 90vw, 100vw"
        className="h-auto w-full rounded-2xl object-cover"
      />

      {block.caption && (
        <figcaption className="mt-3 text-center text-sm leading-relaxed text-slate-500 dark:text-white/55">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function QuoteBlock({ block }) {
  return (
    <blockquote className="relative rounded-3xl bg-linear-to-br from-[#0A3161] via-[#17104d] to-[#5c2150] p-7 text-xl font-medium leading-relaxed text-white shadow-xl">
      <Quote className="mb-2 h-7 w-7 text-white/40" aria-hidden="true" />
      <RichText content={block.children ?? block.text} />
    </blockquote>
  );
}

function CalloutBlock({ block }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#0A3161]/20 bg-[#0A3161]/5 p-5 text-[15px] leading-relaxed text-slate-700 dark:border-[#4da3ff]/30 dark:bg-[#4da3ff]/10 dark:text-white/80">
      <Info
        className="mt-0.5 h-5 w-5 shrink-0 text-[#0A3161] dark:text-[#7cc4ff]"
        aria-hidden="true"
      />
      <div>
        <RichText content={block.children ?? block.text} />
      </div>
    </div>
  );
}

const BLOCK_COMPONENTS = {
  heading: HeadingBlock,
  h1: HeadingBlock,
  h2: HeadingBlock,
  h3: HeadingBlock,
  h4: HeadingBlock,

  paragraph: ParagraphBlock,
  p: ParagraphBlock,

  list: ListBlock,
  ul: ListBlock,
  ol: ListBlock,

  table: TableBlock,
  image: ImageBlock,
  quote: QuoteBlock,
  callout: CalloutBlock,
};

export default function BlogContentRenderer({ content = [] }) {
  if (!Array.isArray(content)) return null;

  return (
    <div className="space-y-6 text-[17px] leading-[1.85] text-slate-700 dark:text-white/75">
      {content.map((block, index) => {
        if (!block || typeof block !== 'object') return null;

        const Component = BLOCK_COMPONENTS[block.type];

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Unsupported blog content block: ${block.type}`);
          }

          return null;
        }

        // Convert legacy heading blocks into the new heading format.
        const normalizedBlock = {
          ...block,
          level:
            block.level ??
            (block.type === 'h1' ? 1 : block.type === 'h3' ? 3 : block.type === 'h4' ? 4 : 2),
        };

        return <Component key={block.id ?? `${block.type}-${index}`} block={normalizedBlock} />;
      })}
    </div>
  );
}
