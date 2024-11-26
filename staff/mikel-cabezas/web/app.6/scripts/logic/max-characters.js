export function cutText (textToCut, maxChars) {
    return textToCut = textToCut.substring(0, maxChars) + '...'
}