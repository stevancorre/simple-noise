import { create } from "random-seed";

import { fade, lerp } from "../math";
import { gradient1D, gradient2D, gradient3D, gradient4D } from "./helpers";

const Permutations: ReadonlyArray<number> = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99,
    37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27,
    166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102,
    143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116,
    188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126,
    255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152,
    2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113,
    224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
    61, 156, 180,
];

export default class PerlinGenerator {
    private readonly offset: number;

    public constructor(seed?: string | number) {
        this.offset = create(seed?.toString()).range(Permutations.length);
    }

    private P(n: number): number {
        return Permutations[(n + this.offset) % Permutations.length] as number;
    }

    public get1D(x: number): number {
        const FX = Math.floor(x),
            X = FX & 255;

        return lerp(fade(x), gradient1D(this.P(this.P(X)), x), gradient1D(this.P(this.P(X + 1)), x - 1));
    }

    public get2D(x: number, y: number): number {
        const FX = Math.floor(x),
            FY = Math.floor(y),
            X = FX & 255,
            Y = FY & 255,
            A = this.P(X) + Y,
            B = this.P(X + 1) + Y;

        x -= FX;
        y -= FY;

        const FDX = fade(x),
            x1 = x - 1,
            y1 = y - 1;

        return lerp(
            fade(y),
            lerp(FDX, gradient2D(this.P(A), x, y), gradient2D(this.P(B), x1, y)),
            lerp(FDX, gradient2D(this.P(A + 1), x, y1), gradient2D(this.P(B + 1), x1, y1)),
        );
    }

    public get3D(x: number, y: number, z: number): number {
        const FX = Math.floor(x),
            FY = Math.floor(y),
            FZ = Math.floor(z),
            X = FX & 255,
            Y = FY & 255,
            Z = FZ & 255,
            A = this.P(X) + Y,
            B = this.P(X + 1) + Y,
            AA = this.P(A) + Z,
            BA = this.P(B) + Z,
            AB = this.P(A + 1) + Z,
            BB = this.P(B + 1) + Z;

        x -= FX;
        y -= FY;
        z -= FZ;

        const FDX = fade(x),
            FDY = fade(y),
            x1 = x - 1,
            y1 = y - 1,
            z1 = z - 1;

        return lerp(
            fade(z),
            lerp(
                FDY,
                lerp(FDX, gradient3D(this.P(AA), x, y, z), gradient3D(this.P(BA), x1, y, z)),
                lerp(FDX, gradient3D(this.P(AB), x, y1, z), gradient3D(this.P(BB), x1, y1, z)),
            ),
            lerp(
                FDY,
                lerp(FDX, gradient3D(this.P(AA + 1), x, y, z1), gradient3D(this.P(BA + 1), x1, y, z1)),
                lerp(FDX, gradient3D(this.P(AB + 1), x, y1, z1), gradient3D(this.P(BB + 1), x1, y1, z1)),
            ),
        );
    }

    public get4D(x: number, y: number, z: number, t: number): number {
        const FX = Math.floor(x),
            FY = Math.floor(y),
            FZ = Math.floor(z),
            FT = Math.floor(t),
            X = FX & 255,
            Y = FY & 255,
            Z = FZ & 255,
            T = FT & 255,
            A = this.P(X) + Y,
            B = this.P(X + 1) + Y,
            AA = this.P(A) + Z,
            BA = this.P(B) + Z,
            AB = this.P(A + 1) + Z,
            BB = this.P(B + 1) + Z,
            AAA = this.P(AA) + T,
            BAA = this.P(BA) + T,
            ABA = this.P(AB) + T,
            BBA = this.P(BB) + T,
            AAB = this.P(AA + 1) + T,
            BAB = this.P(BA + 1) + T,
            ABB = this.P(AB + 1) + T,
            BBB = this.P(BB + 1) + T;

        x -= FX;
        y -= FY;
        z -= FZ;
        t -= FT;

        const FDX = fade(x),
            FDY = fade(y),
            FDZ = fade(z),
            x1 = x - 1,
            y1 = y - 1,
            z1 = z - 1,
            t1 = t - 1;

        return lerp(
            fade(t),
            lerp(
                FDZ,
                lerp(
                    FDY,
                    lerp(FDX, gradient4D(this.P(AAA), x, y, z, t), gradient4D(this.P(BAA), x1, y, z, t)),
                    lerp(FDX, gradient4D(this.P(ABA), x, y1, z, t), gradient4D(this.P(BBA), x1, y1, z, t)),
                ),
                lerp(
                    FDY,
                    lerp(FDX, gradient4D(this.P(AAB), x, y, z1, t), gradient4D(this.P(BAB), x1, y, z1, t)),
                    lerp(FDX, gradient4D(this.P(ABB), x, y1, z1, t), gradient4D(this.P(BBB), x1, y1, z1, t)),
                ),
            ),
            lerp(
                FDZ,
                lerp(
                    FDY,
                    lerp(
                        FDX,
                        gradient4D(this.P(AAA + 1), x, y, z, t1),
                        gradient4D(this.P(BAA + 1), x1, y, z, t1),
                    ),
                    lerp(
                        FDX,
                        gradient4D(this.P(ABA + 1), x, y1, z, t1),
                        gradient4D(this.P(BBA + 1), x1, y1, z, t1),
                    ),
                ),
                lerp(
                    FDY,
                    lerp(
                        FDX,
                        gradient4D(this.P(AAB + 1), x, y, z1, t1),
                        gradient4D(this.P(BAB + 1), x1, y, z1, t1),
                    ),
                    lerp(
                        FDX,
                        gradient4D(this.P(ABB + 1), x, y1, z1, t1),
                        gradient4D(this.P(BBB + 1), x1, y1, z1, t1),
                    ),
                ),
            ),
        );
    }
}

Object.seal(PerlinGenerator);