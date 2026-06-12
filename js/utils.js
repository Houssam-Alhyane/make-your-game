export function toField(field, r) {
    const f = field.getBoundingClientRect()
    return {
        left:   r.left   - f.left,
        top:    r.top    - f.top,
        right:  r.right  - f.left,
        bottom: r.bottom - f.top,
        width:  r.width,
        height: r.height
    }
}
