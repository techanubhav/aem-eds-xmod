/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-category
 * Base block: cards
 * Source: https://www.racv.com.au/
 * Selector: .productlisting.parent .cmp-productListing
 * Generated: 2026-05-31
 *
 * Source structure:
 *   ul.cmp-productListing__group > li.cmp-productListing__item
 *     - i.c-icon--illustration > img (category illustration SVG)
 *     - div.cmp-productListing__group-list > h2.cmp-list_heading > a > span.cmp-list__item-title
 *
 * Target: Cards block with rows of [image, title-link]
 */
export default function parse(element, { document }) {
  // Find all category list items
  const items = element.querySelectorAll('li.cmp-productListing__item');

  const cells = [];

  items.forEach((item) => {
    // Extract the illustration image
    const illustrationIcon = item.querySelector('i.c-icon--illustration img, .c-icon--illustration img');

    // Extract the category heading link
    const headingLink = item.querySelector('h2.cmp-list_heading a.cmp-list_heading__linkwithicon, h2.cmp-list_heading a');
    const titleSpan = item.querySelector('span.cmp-list__item-title');

    // Build image cell
    const imageCell = [];
    if (illustrationIcon) {
      imageCell.push(illustrationIcon);
    }

    // Build content cell with linked title
    const contentCell = [];
    if (headingLink && titleSpan) {
      // Create a clean link with just the title text (drop nested icon)
      const link = document.createElement('a');
      link.href = headingLink.href || headingLink.getAttribute('href');
      const strong = document.createElement('strong');
      strong.textContent = titleSpan.textContent.trim();
      link.appendChild(strong);
      contentCell.push(link);
    } else if (titleSpan) {
      // Fallback: title without link
      const strong = document.createElement('strong');
      strong.textContent = titleSpan.textContent.trim();
      contentCell.push(strong);
    }

    // Only add row if we have meaningful content
    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell.length > 0 ? imageCell : '', contentCell.length > 0 ? contentCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-category', cells });
  element.replaceWith(block);
}
