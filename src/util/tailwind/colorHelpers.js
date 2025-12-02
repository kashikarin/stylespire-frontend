export function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgb(var(${variableName}) / ${opacityValue})`
        }
        return `rgb(var(${variableName}))`
    }
}