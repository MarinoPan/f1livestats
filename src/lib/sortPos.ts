/* eslint-disable  @typescript-eslint/no-explicit-any */

export const sortPos = (a: any, b: any) => {
    const posA = a.PersonalBestLapTime?.Position || Infinity;
    const posB = b.PersonalBestLapTime?.Position || Infinity;
    return Number(posA) - Number(posB);
};
