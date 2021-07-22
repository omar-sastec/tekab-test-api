/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GormDeletedAt {
  time?: string;

  /** Valid is true if Time is not NULL */
  valid?: boolean;
}

export interface ModelsAnswer {
  answer_choices?: ModelsAnswerChoices[];
  answer_file?: string;
  answer_text?: string;
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  id?: number;
  point?: number;
  question_id: number;
  test_candidate_id: number;
  updatedAt?: string;
}

export interface ModelsAnswerChoices {
  answer_id?: number;
  choices_id: number;
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  id?: number;
  updatedAt?: string;
}

export interface ModelsCandidate {
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  email?: string;
  id?: number;
  name?: string;
  test_candidate?: ModelsTestCandidate[];
  updatedAt?: string;
}

export interface ModelsChoices {
  answer_choices?: ModelsAnswerChoices[];
  choice_text: string;
  id?: number;
  is_answer: boolean;
  question_id?: number;
}

export interface ModelsCreateCandidateInput {
  email: string;
  name?: string;
}

export interface ModelsCreateQuestionInput {
  choices?: ModelsChoices[];
  difficulty: string;
  expected_time: number;
  file_read_me?: string;
  max_points: number;
  name: string;
  question_text: string;
  skill_id?: number;
  type: string;
}

export interface ModelsLoginInput {
  email: string;
  password: string;
}

export interface ModelsQuestion {
  answer?: ModelsAnswer[];
  choices?: ModelsChoices[];
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  difficulty?: string;
  expected_time?: number;
  file_read_me?: string;
  id?: number;
  max_points?: number;
  name?: string;
  question_text?: string;
  skill_id?: number;
  test_questions?: ModelsTestQuestion[];
  type?: string;
  updatedAt?: string;
}

export interface ModelsSkill {
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  id?: number;
  name: string;
  question?: ModelsQuestion[];
  updatedAt?: string;
}

export interface ModelsTest {
  archived: boolean;
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  description: string;
  id?: number;
  name: string;
  notifyEmails?: string;
  passingScore: number;
  showScore: boolean;
  test_candidate?: ModelsTestCandidate[];
  test_questions?: ModelsTestQuestion[];
  timingPolicy: string;
  updatedAt?: string;
}

export interface ModelsTestCandidate {
  answer?: ModelsAnswer[];
  candidate_id: number;
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  id?: number;
  score?: number;
  test_id: number;
  test_status?: string;
  updatedAt?: string;
}

export interface ModelsTestQuestion {
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  id?: number;
  question_id: number;
  test_id: number;
  updatedAt?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

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

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return `${value.map(this.addQueryParam).join("&")}`;
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
                                              body,
                                              secure,
                                              path,
                                              type,
                                              query,
                                              format,
                                              baseUrl,
                                              cancelToken,
                                              ...params
                                            }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
          .then((data) => {
            if (r.ok) {
              r.data = data;
            } else {
              r.error = data;
            }
            return r;
          })
          .catch((e) => {
            r.error = e;
            return r;
          });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title tekab-test
 * @version 1.0
 * @baseUrl /api
 * @contact
 *
 * this is an application web of interview assessment tests for interviewing out of the box .
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  candidate = {
    /**
     * @description create new Candidate by json
     *
     * @tags Candidate
     * @name CandidateCreate
     * @summary add new  Candidate
     * @request POST:/candidate
     */
    candidateCreate: (candidate: ModelsCreateCandidateInput, params: RequestParams = {}) =>
      this.request<ModelsCandidate, any>({
        path: `/candidate`,
        method: "POST",
        body: candidate,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Login to the app
     *
     * @tags Login
     * @name LoginCreate
     * @summary Login to the app
     * @request POST:/login
     */
    loginCreate: (user: ModelsLoginInput, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/login`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  myTests = {
    /**
     * @description create new Test by json
     *
     * @tags test
     * @name MyTestsCreate
     * @summary add new Test
     * @request POST:/my-tests
     */
    myTestsCreate: (Test: ModelsTest, params: RequestParams = {}) =>
      this.request<ModelsTest, any>({
        path: `/my-tests`,
        method: "POST",
        body: Test,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description create test_candidate by json and path
     *
     * @tags test_candidate
     * @name CandidatesIdCreate
     * @summary add new  test_candidate
     * @request POST:/my-tests/candidates/:id
     */
    candidatesIdCreate: (testId: number, id: string, test_candidate: ModelsTestCandidate, params: RequestParams = {}) =>
      this.request<ModelsTestCandidate, any>({
        path: `/my-tests/candidates/${id}`,
        method: "POST",
        body: test_candidate,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  questions = {
    /**
     * @description find a question by type or difficulty
     *
     * @tags question
     * @name QuestionsList
     * @summary find a question
     * @request GET:/questions
     */
    questionsList: (query?: { type?: string; difficulty?: string }, params: RequestParams = {}) =>
      this.request<ModelsQuestion[], any>({
        path: `/questions`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description create new question by json
     *
     * @tags question
     * @name EditCreate
     * @summary add new  question
     * @request POST:/questions/edit
     */
    editCreate: (question: ModelsCreateQuestionInput, params: RequestParams = {}) =>
      this.request<ModelsQuestion, any>({
        path: `/questions/edit`,
        method: "POST",
        body: question,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  score = {
    /**
     * @description calculate score by query and update a status test
     *
     * @tags test_candidate
     * @name ScoreCreate
     * @summary calculate a test score
     * @request POST:/score
     */
    scoreCreate: (query: { test_candidate_id: number }, params: RequestParams = {}) =>
      this.request<ModelsTestCandidate, any>({
        path: `/score`,
        method: "POST",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  skill = {
    /**
     * @description create new skill by json
     *
     * @tags skill
     * @name SkillCreate
     * @summary add new  skill
     * @request POST:/skill
     */
    skillCreate: (skill: ModelsSkill, params: RequestParams = {}) =>
      this.request<ModelsQuestion, any>({
        path: `/skill`,
        method: "POST",
        body: skill,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  tests = {
    /**
     * @description get tests by skill
     *
     * @tags test
     * @name TestsList
     * @summary get tests
     * @request GET:/tests
     * @secure
     */
    testsList: (query?: { type?: number }, params: RequestParams = {}) =>
      this.request<ModelsTest[], any>({
        path: `/tests`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
