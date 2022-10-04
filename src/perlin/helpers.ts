export const gradient1D = (hash: number, x: number): number => {
    return hash & 1 ? -x : x;
};

export const gradient2D = (hash: number, x: number, y: number): number => {
    const H: number = hash & 3;

    return (H < 2 ? x : -x) + (H === 0 || H === 2 ? y : -y);
};

export const gradient3D = (hash: number, x: number, y: number, z: number): number => {
    const H: number = hash & 15;
    const U: number = H < 8 ? x : y;
    const V: number = H < 4 ? y : H === 12 || H === 14 ? x : z;

    return (H & 1 ? -U : U) + (H & 2 ? -V : V);
};

export const gradient4D = (hash: number, x: number, y: number, z: number, t: number): number => {
    const H: number = hash & 31;
    const U: number = H < 24 ? x : y;
    const V: number = H < 16 ? y : z;
    const W: number = H < 8 ? z : t;

    return (H & 1 ? -U : U) + (H & 2 ? -V : V) + (H & 4 ? -W : W);
};
