/**
 * Parses markdown-like inline syntax into safe HTML.
 * Supports: [text](url) for accent links, `code` for inline code.
 *
 * Only used with controlled content (our own blog data), never with user input.
 */
export function renderInlineMarkup(text: string): string {
  return text
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:text-accent-blue/80 transition-colors duration-300 border-b border-accent-blue/30 hover:border-accent-blue">$1</a>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-foreground/[0.06] text-accent-blue" style="font-family: \'Space Mono\', monospace; font-size: 0.8rem">$1</code>',
    )
}

/**
 * Highlights specific keywords in text by wrapping them with accent-styled links.
 * Case-insensitive matching. Used for blog excerpts and experience descriptions.
 */
export function highlightText(
  text: string,
  links: { word: string; href: string }[],
): string {
  if (!links.length) return text

  let result = text

  for (const link of links) {
    const escapedWord = link.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedWord})`, 'gi')
    result = result.replace(
      regex,
      `<a href="${link.href}" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:text-accent-blue/80 transition-colors duration-300 border-b border-accent-blue/30 hover:border-accent-blue">$1</a>`,
    )
  }

  return result
}
