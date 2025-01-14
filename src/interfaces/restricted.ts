export interface IRestricted {
    siteName: string;
    restricted: boolean;
}

export interface IRestrictedCustom extends IRestricted {
    siteURL: string;
}
