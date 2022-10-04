export const lerp = (t: number, a: number, b: number): number => {
    return a + t * (b - a);
};

export const fade = (t: number): number => {
    return t * t * t * (t * (t * 6 - 15) + 10);
};
