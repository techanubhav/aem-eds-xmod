/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-wayfinder
 * Base block: cards
 * Source: https://www.racv.com.au/
 * Selector: .wayfinder.parent .cmp-wayfinder
 * Generated: 2026-05-31
 *
 * Source structure:
 *   .cmp-wayfinder
 *     .cmp-wayfinder-headingContainer
 *       h2.heading - section heading
 *       .cmp-text.description > p - section description
 *     .cmp-wayfinder--tile-wrapper
 *       a.cmp-wayfinder-tile[href] (repeated)
 *         .cmp-wayfinder-tile--icon > i.c-icon > img (SVG icon)
 *         .cmp-wayfinder-tile--content > h4.tile-heading
 *
 * Target: Cards block - each row has [image, text] cells
 * The section heading/description are placed before the block as default content.
 */
export default function parse(element, { document }) {
  // Extract heading and description (to place before block as default content)
  const heading = element.querySelector('.cmp-wayfinder-headingContainer h2.heading, .cmp-wayfinder-headingContainer h2');
  const description = element.querySelector('.cmp-wayfinder-headingContainer .description p, .cmp-wayfinder-headingContainer .cmp-text p');

  // Extract all wayfinder tiles
  const tiles = Array.from(element.querySelectorAll('a.cmp-wayfinder-tile'));

  // Build cells array - each tile becomes one card row with [icon, linked heading]
  const cells = [];

  tiles.forEach((tile) => {
    const icon = tile.querySelector('.cmp-wayfinder-tile--icon img, .cmp-wayfinder-tile--icon i img');
    const tileHeading = tile.querySelector('.cmp-wayfinder-tile--content .tile-heading, .cmp-wayfinder-tile--content h4');
    const href = tile.getAttribute('href');

    // Cell 1: icon image
    const imageCell = [];
    if (icon) {
      imageCell.push(icon);
    }

    // Cell 2: linked heading text
    const contentCell = [];
    if (tileHeading && href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = tileHeading.textContent.trim();
      const strong = document.createElement('strong');
      strong.appendChild(link);
      contentCell.push(strong);
    } else if (tileHeading) {
      const strong = document.createElement('strong');
      strong.textContent = tileHeading.textContent.trim();
      contentCell.push(strong);
    }

    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  // Create the block
  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-wayfinder', cells });

  // Place heading and description before the block as default content
  const container = document.createElement('div');
  if (heading) {
    container.appendChild(heading);
  }
  if (description) {
    container.appendChild(description);
  }
  container.appendChild(block);

  element.replaceWith(container);
}
