/**
 * Blog Content Utilities
 * 
 * Functions for processing blog content, including inserting CTA embeds
 */

/**
 * Split content and insert CTA embeds at specified positions
 * Returns an array of content chunks and CTA positions
 * 
 * Inserts CTAs at approximately 30% and 85% through the content
 */
export function insertCTAEmbeds(
  content: string,
  ctaComponent: string = 'CTA_EMBED_PLACEHOLDER'
): Array<{ type: 'content' | 'cta'; content: string }> {
  // Remove HTML tags to calculate text length
  const textContent = content.replace(/<[^>]*>/g, ' ')
  const words = textContent.trim().split(/\s+/).filter(w => w.length > 0)
  const totalWords = words.length

  if (totalWords < 150) {
    // For very short content, just add one CTA at the end
    return [
      { type: 'content', content },
      { type: 'cta', content: ctaComponent },
    ]
  }

  // Calculate insertion points (25-35% and 85-90%)
  const firstInsertPoint = Math.floor(totalWords * 0.3) // ~30% through
  const secondInsertPoint = Math.floor(totalWords * 0.85) // ~85% through (near end, above conclusion)

  // Split content by closing tags (paragraphs, headings, lists)
  // This preserves HTML structure
  const splitRegex = /(<\/p>|<\/h[2-6]>|<\/ul>|<\/ol>|<\/div>)/gi
  const parts: string[] = []
  let lastIndex = 0
  let match

  while ((match = splitRegex.exec(content)) !== null) {
    const endIndex = match.index + match[0].length
    parts.push(content.substring(lastIndex, endIndex))
    lastIndex = endIndex
  }
  
  // Add remaining content
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex))
  }

  // Calculate word count for each part
  let currentWordCount = 0
  const result: Array<{ type: 'content' | 'cta'; content: string }> = []
  let currentChunk = ''
  let firstCTAInserted = false
  let secondCTAInserted = false

  for (const part of parts) {
    const partText = part.replace(/<[^>]*>/g, ' ')
    const partWords = partText.trim().split(/\s+/).filter(w => w.length > 0).length

    currentChunk += part
    currentWordCount += partWords

    // Check if we've reached the first insertion point (around 30%)
    if (!firstCTAInserted && currentWordCount >= firstInsertPoint) {
      result.push({ type: 'content', content: currentChunk })
      result.push({ type: 'cta', content: ctaComponent })
      currentChunk = ''
      firstCTAInserted = true
    }
    // Check if we've reached the second insertion point (around 85%)
    else if (firstCTAInserted && !secondCTAInserted && currentWordCount >= secondInsertPoint) {
      result.push({ type: 'content', content: currentChunk })
      result.push({ type: 'cta', content: ctaComponent })
      currentChunk = ''
      secondCTAInserted = true
    }
  }

  // Add remaining content
  if (currentChunk.trim()) {
    result.push({ type: 'content', content: currentChunk })
  }

  // Ensure we have at least one CTA
  if (!firstCTAInserted && !secondCTAInserted) {
    result.push({ type: 'cta', content: ctaComponent })
  } else if (firstCTAInserted && !secondCTAInserted) {
    // If only first was inserted, add second at the end
    result.push({ type: 'cta', content: ctaComponent })
  }

  return result
}
