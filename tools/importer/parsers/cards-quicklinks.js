/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-quicklinks.
 * Base block: cards.
 * Source: https://www.racv.com.au/
 * Selector: .cmp-homepage-banner-bottom .cmp-list
 * Generated: 2026-05-31
 *
 * Transforms quicklink list items (icon + link text) into Cards block rows.
 * Each card row contains: [icon image] [link with text]
 */
export default function parse(element, { document }) {
  // Extract all quicklink items from the list
  const listItems = element.querySelectorAll('.cmp-list-item');
  const cells = [];

  listItems.forEach((item) => {
    const link = item.querySelector('a.cmp-list-item-link');
    if (!link) return;

    // Extract the icon image from the link
    const icon = link.querySelector('i.c-icon img, .c-icon img');

    // Extract the text label
    const label = link.querySelector('span');

    // Build the card row: [icon cell] [link text cell]
    // Icons are inline SVG data URIs - preserve them as img elements for potential re-authoring
    const imageCell = document.createElement('div');
    if (icon) {
      const img = icon.cloneNode(true);
      imageCell.appendChild(img);
    }

    const textCell = document.createElement('div');
    if (label) {
      // Create a link element wrapping the label text
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = label.textContent.trim();
      textCell.appendChild(a);
    }

    if (label) {
      cells.push([[imageCell], [textCell]]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-quicklinks', cells });
  element.replaceWith(block);
}
