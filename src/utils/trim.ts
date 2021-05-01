export default function trim(string: string, char: string) {
    let trimmed = string;

    while (trimmed.startsWith(char)) trimmed = trimmed.slice(char.length);
    while (trimmed.endsWith(char)) trimmed = trimmed.slice(0, -char.length);

    return trimmed;
}
