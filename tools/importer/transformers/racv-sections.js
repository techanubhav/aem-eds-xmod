/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: RACV section breaks and section metadata.
 * Inserts <hr> section breaks and Section Metadata blocks based on template sections.
 * All selectors verified against captured DOM in migration-work/cleaned.html.
 *
 * Template sections (homepage):
 *   1. Hero Banner         - .herobanner.parent        - style: null
 *   2. Popular Products    - .productlisting.parent    - style: "grey"
 *   3. RACV App Promo      - .splitpanel.parent        - style: null
 *   4. Highlight Cards     - .highlightcards.parent    - style: null
 *   5. RACV Difference     - #container-3a020d5778     - style: "blue"
 *   6. Stay Up to Date     - .relatedinformation.parent - style: null
 *   7. Need Support        - .wayfinder.parent         - style: "grey"
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };

    // Process sections in reverse order to avoid offset issues when inserting elements
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before this section (but not before the first section)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
