/**
 * Escapes regex
 * @param string String to escape.
 */
export default function escape(string: string) {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
