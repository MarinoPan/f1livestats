export type CarsData = {
    // this is what we have at state
    [key: string]: {
        Channels: CarDataChannels;
    };
};

export type CarDataChannels = {
    /** 0 - RPM */
    "0": number;
    /** 2 - Speed number km/h */
    "2": number;
    /** 3 - gear number */
    "3": number;
    /** 4 - Throttle int 0-100 */
    "4": number;
    /** 5 - Brake number boolean */
    "5": number;
    /** 45 - DRS */
    "45": number;
};
