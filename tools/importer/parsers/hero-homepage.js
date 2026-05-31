/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-homepage
 * Base block: hero
 * Source: https://www.racv.com.au/
 * Selector: .herobanner.parent .cmp-homepage-banner
 * Generated: 2026-05-31
 *
 * Source structure:
 *   .cmp-homepage-banner-top
 *     .cmp-homepage-banner-content
 *       h1.title - main heading
 *       .cmp-text p - description
 *       .banner-button a.cmp-button - CTA link
 *     .cmp-homepage-banner-image
 *       picture > img - hero image
 *   .cmp-homepage-banner-bottom (excluded - separate cards-quicklinks block)
 *
 * Target structure (hero block):
 *   Row 1: background/hero image
 *   Row 2: heading, description, CTA
 */
export default function parse(element, { document }) {
  // Extract hero image from the banner image area
  const heroImage = element.querySelector('.cmp-homepage-banner-image picture, .cmp-homepage-banner-image img');

  // Extract heading from content area
  const heading = element.querySelector('.cmp-homepage-banner-content h1, .cmp-homepage-banner-content h2, .cmp-homepage-banner-content .title');

  // Extract description text
  const description = element.querySelector('.cmp-homepage-banner-content .cmp-text p, .cmp-homepage-banner-content p');

  // Extract CTA button/link
  const ctaLink = element.querySelector('.cmp-homepage-banner-content .banner-button a, .cmp-homepage-banner-content a.cmp-button');

  // Build cells array matching hero block structure
  const cells = [];

  // Row 1: Hero image
  if (heroImage) {
    cells.push([heroImage]);
  }

  // Row 2: Content - heading, description, CTA in a single cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (ctaLink) contentCell.push(ctaLink);

  if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
