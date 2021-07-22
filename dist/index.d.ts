export interface ModelsMPodCastsByThemes {
    idCanal?: string;
    limit?: number;
    order_type?: string;
    ordre?: string;
    searchWord?: string;
    start?: number;
    themes?: number[];
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker?;
    private abortControllers;
    private customFetch;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType) => void;
    private encodeQueryParam;
    private addQueryParam;
    private addArrayQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title podcast-api DOC
 * @version beta
 * @baseUrl //146.59.200.81:8200
 * @contact
 *
 * This is the podcast-api documentation
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api: {
        /**
         * @description Get all podcasts by themes
         *
         * @name PodcastByThemesCreate
         * @summary Get all podcasts by themes
         * @request POST:/api/podcast/by-themes
         * @secure
         */
        podcastByThemesCreate: (mPodCastsByThemes: ModelsMPodCastsByThemes, params?: Pick<FullRequestParams, "window" | "cache" | "credentials" | "headers" | "integrity" | "keepalive" | "mode" | "redirect" | "referrer" | "referrerPolicy" | "signal" | "secure" | "type" | "format" | "baseUrl" | "cancelToken">) => Promise<HttpResponse<string, any>>;
        /**
         * @description Get home podcasts
         *
         * @name PodcastHomeList
         * @summary Get home podcasts
         * @request GET:/api/podcast/home
         * @secure
         */
        podcastHomeList: (query?: {
            idTheme?: string;
            idChannel?: string;
            ordre?: string;
            page?: string;
            nbParPage?: string;
            order_type?: string;
            searchWord?: string;
        }, params?: Pick<FullRequestParams, "window" | "cache" | "credentials" | "headers" | "integrity" | "keepalive" | "mode" | "redirect" | "referrer" | "referrerPolicy" | "signal" | "secure" | "type" | "format" | "baseUrl" | "cancelToken">) => Promise<HttpResponse<string, any>>;
        /**
         * @description Get infos of one podcast by id
         *
         * @name PodcastInfosIdList
         * @summary Get infos of one podcast by id
         * @request GET:/api/podcast/infos/:id
         * @secure
         */
        podcastInfosIdList: (id: number, params?: Pick<FullRequestParams, "window" | "cache" | "credentials" | "headers" | "integrity" | "keepalive" | "mode" | "redirect" | "referrer" | "referrerPolicy" | "signal" | "secure" | "type" | "format" | "baseUrl" | "cancelToken">) => Promise<HttpResponse<string, any>>;
        /**
         * @description Get most popular podcasts
         *
         * @name PodcastMostPopularList
         * @summary Get most popular podcasts
         * @request GET:/api/podcast/most-popular
         * @secure
         */
        podcastMostPopularList: (query?: {
            idTheme?: string;
            idChannel?: string;
            ordre?: string;
            page?: string;
            nbParPage?: string;
            order_type?: string;
            searchWord?: string;
            notIn?: string;
        }, params?: Pick<FullRequestParams, "window" | "cache" | "credentials" | "headers" | "integrity" | "keepalive" | "mode" | "redirect" | "referrer" | "referrerPolicy" | "signal" | "secure" | "type" | "format" | "baseUrl" | "cancelToken">) => Promise<HttpResponse<string, any>>;
        /**
         * @description Get most visited podcasts
         *
         * @name PodcastMostVisitedList
         * @summary Get most visited podcasts
         * @request GET:/api/podcast/most-visited
         * @secure
         */
        podcastMostVisitedList: (query?: {
            idTheme?: string;
            idChannel?: string;
            ordre?: string;
            page?: string;
            nbParPage?: string;
            order_type?: string;
            searchWord?: string;
            notIn?: string;
        }, params?: Pick<FullRequestParams, "window" | "cache" | "credentials" | "headers" | "integrity" | "keepalive" | "mode" | "redirect" | "referrer" | "referrerPolicy" | "signal" | "secure" | "type" | "format" | "baseUrl" | "cancelToken">) => Promise<HttpResponse<string, any>>;
    };
}
export {};
