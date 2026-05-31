/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature variant.
 * Base block: columns
 * Source: https://www.racv.com.au/
 * Selector: .icontext.parent
 * Generated: 2026-05-31
 *
 * Extracts icon-text items from the RACV "The RACV Difference" section
 * and arranges them as columns. Each column contains an illustration icon,
 * a heading, and a description paragraph.
 *
 * Source structure: .icontext.parent > div > .cmp-icon-text with
 *   - .cmp-icon-text--icon > i > img (illustration)
 *   - .cmp-icon-text--content > h4.title (heading)
 *   - .cmp-icon-text--content > .cmp-text > p (description)
 *
 * Target structure: Columns block with one row, each cell containing
 * icon image + heading + description text.
 *
 * Note: Multiple .icontext.parent elements exist as siblings. The first
 * instance gathers all siblings into one multi-column block. Subsequent
 * instances are consumed (removed) to avoid duplicate output.
 */
export default function parse(element, { document }) {
  // The element is one .icontext.parent column item.
  // Gather all sibling .icontext.parent elements to form the full columns block.
  const parent = element.parentElement;
  const allColumnItems = parent
    ? Array.from(parent.querySelectorAll(':scope > .icontext.parent, :scope > [class*="icontext"][class*="parent"]'))
    : [element];

  // If this is not the first icon-text item among siblings, mark as already processed.
  // We add a data attribute so the first parser call can detect them, then remove.
  if (allColumnItems.length > 1 && allColumnItems[0] !== element) {
    element.setAttribute('data-columns-feature-processed', 'true');
    element.remove();
    return;
  }

  // Build cells - one row with multiple columns
  const cells = [];
  const row = [];

  const items = allColumnItems.length > 0 ? allColumnItems : [element];

  items.forEach((item) => {
    const cellContent = [];

    // Extract icon/illustration image (SVG inline or raster img)
    const icon = item.querySelector('.cmp-icon-text--icon img, .cmp-icon-text--icon svg, [class*="icon--illustration"] img');
    if (icon) {
      cellContent.push(icon);
    } else {
      // Fallback: any img in the item
      const fallbackImg = item.querySelector('img');
      if (fallbackImg) {
        cellContent.push(fallbackImg);
      }
    }

    // Extract heading (h4.title or fallbacks)
    const heading = item.querySelector('.cmp-icon-text--content h4.title, .cmp-icon-text--content h4, .cmp-icon-text--content h3, .cmp-icon-text--content h2');
    if (heading) {
      cellContent.push(heading);
    }

    // Extract description text
    const description = item.querySelector('.cmp-icon-text--content .cmp-text p, .cmp-icon-text--content p');
    if (description) {
      cellContent.push(description);
    }

    // Only add column if it has content
    if (cellContent.length > 0) {
      row.push(cellContent);
    }
  });

  cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
