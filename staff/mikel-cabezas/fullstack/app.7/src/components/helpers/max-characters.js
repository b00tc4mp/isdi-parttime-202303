export function cutText (textToCut, maxChars) {
    if (textToCut.length > maxChars) {
        return textToCut = textToCut.substring(0, maxChars) + '...'
    } else {
        return textToCut

    }
}