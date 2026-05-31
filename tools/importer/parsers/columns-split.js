/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-split
 * Base block: columns
 * Source: https://www.racv.com.au/
 * Selector: .splitpanel.parent .cmp-split-panel
 * Generated: 2026-05-31
 *
 * Maps a split panel component (image + content side) into a Columns block.
 * Source structure: .cmp-split-panel with .cmp-split-panel-image-container (picture)
 * and .cmp-split-panel-content (heading, description, icon-text items, CTA button).
 */
export default function parse(element, { document }) {
  // Extract the image from the image container
  const imageContainer = element.querySelector('.cmp-split-panel-image-container');
  const image = imageContainer ? imageContainer.querySelector('picture, img') : null;

  // Extract the heading
  const heading = element.querySelector('.cmp-split-panel-content h2, .cmp-split-panel-content .cmp-title__text');

  // Extract the description text
  const descriptionEl = element.querySelector('.cmp-split-panel-content > .cmp-text p, .cmp-split-panel-content .cmp-text p');

  // Extract icon-text items as a list
  const iconTextItems = Array.from(element.querySelectorAll('.icon-text-group .icon-text-container'));

  // Extract CTA button/link if present
  const ctaLink = element.querySelector('.cmp-split-panel-content a.btn, .cmp-split-panel-content a.button, .cmp-split-panel-content .cmp-button a, .cmp-split-panel-content > a');

  // Build the content cell (right side: heading + description + icon list + CTA)
  const contentCell = [];

  if (heading) {
    contentCell.push(heading);
  }

  if (descriptionEl) {
    contentCell.push(descriptionEl);
  }

  // Convert icon-text items into a list
  if (iconTextItems.length > 0) {
    const ul = document.createElement('ul');
    iconTextItems.forEach((item) => {
      const li = document.createElement('li');
      const textEl = item.querySelector('.cmp-text p, p');
      if (textEl) {
        li.textContent = textEl.textContent;
      }
      ul.appendChild(li);
    });
    contentCell.push(ul);
  }

  if (ctaLink) {
    contentCell.push(ctaLink);
  }

  // Build the image cell (left side)
  const imageCell = [];
  if (image) {
    imageCell.push(image);
  }

  // Determine column order based on panel class
  // Class "left" means image is on the left side
  const isImageLeft = element.classList.contains('left');

  // Build cells as a single row with two columns (matching Columns block structure)
  const cells = [];
  if (isImageLeft) {
    cells.push([imageCell, contentCell]);
  } else {
    cells.push([contentCell, imageCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-split', cells });
  element.replaceWith(block);
}
