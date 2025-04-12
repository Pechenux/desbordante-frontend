/* eslint-disable -- GENERATED FILE, DO NOT EDIT */
export type paths = {
    "/api/common/ping": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Ping */
        get: operations["ping_api_common_ping_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/file/csv": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Upload Csv Dataset */
        post: operations["upload_csv_dataset_api_file_csv_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/file/dataset/{dataset_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Retrieve Dataset */
        post: operations["retrieve_dataset_api_file_dataset__dataset_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/task/set": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set Task */
        post: operations["set_task_api_task_set_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/task/{task_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Retrieve Task */
        get: operations["retrieve_task_api_task__task_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /** AfdTaskConfig */
        AfdTaskConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            primitive_name: AfdTaskConfigPrimitive_name;
            /** Config */
            config: components["schemas"]["PyroConfig"] | components["schemas"]["TaneConfig"];
        };
        /** AfdTaskResult */
        AfdTaskResult: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            primitive_name: AfdTaskResultPrimitive_name;
            result: components["schemas"]["FdAlgoResult"];
        };
        /** AidConfig */
        AidConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: AidConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
        };
        /** Body_upload_csv_dataset_api_file_csv_post */
        Body_upload_csv_dataset_api_file_csv_post: {
            /**
             * File
             * Format: binary
             */
            file: File;
            /** Separator */
            separator: string;
            /** Header */
            header: number[];
        };
        /** DFDConfig */
        DFDConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: DFDConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
            /**
             * Threads
             * @description Number of threads to use
             */
            threads?: number;
        };
        /** DepminerConfig */
        DepminerConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: DepminerConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
        };
        /** FDepConfig */
        FDepConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: FDepConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
        };
        /** FUNConfig */
        FUNConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: FUNConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
        };
        /** FastFDsConfig */
        FastFDsConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: FastFDsConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
            /**
             * Threads
             * @description Number of threads to use
             */
            threads?: number;
        };
        /** FdAlgoResult */
        FdAlgoResult: {
            /** Fds */
            fds: components["schemas"]["FdModel"][];
        };
        /** FdMineConfig */
        FdMineConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: FdMineConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
        };
        /** FdModel */
        FdModel: {
            /** Lhs Indices */
            lhs_indices: number[];
            /** Rhs Index */
            rhs_index: number;
        };
        /** FdTaskConfig */
        FdTaskConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            primitive_name: FdTaskConfigPrimitive_name;
            /** Config */
            config: components["schemas"]["AidConfig"] | components["schemas"]["DFDConfig"] | components["schemas"]["DepminerConfig"] | components["schemas"]["FDepConfig"] | components["schemas"]["FUNConfig"] | components["schemas"]["FastFDsConfig"] | components["schemas"]["FdMineConfig"] | components["schemas"]["HyFDConfig"] | components["schemas"]["PFDTaneConfig"] | components["schemas"]["PyroConfig"] | components["schemas"]["TaneConfig"];
        };
        /** FdTaskResult */
        FdTaskResult: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            primitive_name: FdTaskResultPrimitive_name;
            result: components["schemas"]["FdAlgoResult"];
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** HyFDConfig */
        HyFDConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: HyFDConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
        };
        /** PFDTaneConfig */
        PFDTaneConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: PFDTaneConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
            /**
             * Error
             * @description Error threshold value for Approximate FD algorithms
             */
            error?: number;
            /**
             * Error Measure
             * @description PFD error measure to use
             * @enum {string}
             */
            error_measure?: PFDTaneConfigError_measure;
        };
        /** PyroConfig */
        PyroConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: PyroConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
            /**
             * Error
             * @description Error threshold value for Approximate FD algorithms
             */
            error?: number;
            /**
             * Threads
             * @description Number of threads to use
             */
            threads?: number;
            /**
             * Seed
             * @description RNG seed
             */
            seed?: number;
        };
        /** TaneConfig */
        TaneConfig: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            algo_name: TaneConfigAlgo_name;
            /**
             * Max Lhs
             * @description Max considered LHS size
             */
            max_lhs?: number;
            /**
             * Is Null Equal Null
             * @description Specify whether two NULLs should be considered equal
             */
            is_null_equal_null?: boolean;
            /**
             * Error
             * @description Error threshold value for Approximate FD algorithms
             */
            error?: number;
        };
        /**
         * TaskFailureReason
         * @enum {string}
         */
        TaskFailureReason: TaskFailureReason;
        /**
         * TaskStatus
         * @enum {string}
         */
        TaskStatus: TaskStatus;
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** ResponseSchema */
        internal__rest__http__file__retrieve_dataset__ResponseSchema: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /**
             * File Id
             * Format: uuid
             */
            file_id: string;
            /** Separator */
            separator: string;
            /** Header */
            header: number[];
        };
        /** ResponseSchema */
        internal__rest__http__task__retrieve_task__ResponseSchema: {
            status: components["schemas"]["TaskStatus"];
            /** Config */
            config: components["schemas"]["FdTaskConfig"] | components["schemas"]["AfdTaskConfig"];
            /**
             * Dataset Id
             * Format: uuid
             */
            dataset_id: string;
            /** Result */
            result: (components["schemas"]["FdTaskResult"] | components["schemas"]["AfdTaskResult"]) | null;
            /** Raised Exception Name */
            raised_exception_name: string | null;
            failure_reason: components["schemas"]["TaskFailureReason"] | null;
            /** Traceback */
            traceback: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type SchemaAfdTaskConfig = components['schemas']['AfdTaskConfig'];
export type SchemaAfdTaskResult = components['schemas']['AfdTaskResult'];
export type SchemaAidConfig = components['schemas']['AidConfig'];
export type SchemaBodyUploadCsvDatasetApiFileCsvPost = components['schemas']['Body_upload_csv_dataset_api_file_csv_post'];
export type SchemaDfdConfig = components['schemas']['DFDConfig'];
export type SchemaDepminerConfig = components['schemas']['DepminerConfig'];
export type SchemaFDepConfig = components['schemas']['FDepConfig'];
export type SchemaFunConfig = components['schemas']['FUNConfig'];
export type SchemaFastFDsConfig = components['schemas']['FastFDsConfig'];
export type SchemaFdAlgoResult = components['schemas']['FdAlgoResult'];
export type SchemaFdMineConfig = components['schemas']['FdMineConfig'];
export type SchemaFdModel = components['schemas']['FdModel'];
export type SchemaFdTaskConfig = components['schemas']['FdTaskConfig'];
export type SchemaFdTaskResult = components['schemas']['FdTaskResult'];
export type SchemaHttpValidationError = components['schemas']['HTTPValidationError'];
export type SchemaHyFdConfig = components['schemas']['HyFDConfig'];
export type SchemaPfdTaneConfig = components['schemas']['PFDTaneConfig'];
export type SchemaPyroConfig = components['schemas']['PyroConfig'];
export type SchemaTaneConfig = components['schemas']['TaneConfig'];
export type SchemaTaskFailureReason = components['schemas']['TaskFailureReason'];
export type SchemaTaskStatus = components['schemas']['TaskStatus'];
export type SchemaValidationError = components['schemas']['ValidationError'];
export type SchemaInternalRestHttpFileRetrieveDatasetResponseSchema = components['schemas']['internal__rest__http__file__retrieve_dataset__ResponseSchema'];
export type SchemaInternalRestHttpTaskRetrieveTaskResponseSchema = components['schemas']['internal__rest__http__task__retrieve_task__ResponseSchema'];
export type $defs = Record<string, never>;
export interface operations {
    ping_api_common_ping_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": "Pong!";
                };
            };
        };
    };
    upload_csv_dataset_api_file_csv_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["Body_upload_csv_dataset_api_file_csv_post"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    retrieve_dataset_api_file_dataset__dataset_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["internal__rest__http__file__retrieve_dataset__ResponseSchema"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    set_task_api_task_set_post: {
        parameters: {
            query: {
                dataset_id: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FdTaskConfig"] | components["schemas"]["AfdTaskConfig"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    retrieve_task_api_task__task_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                task_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["internal__rest__http__task__retrieve_task__ResponseSchema"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
export enum AfdTaskConfigPrimitive_name {
    afd = "afd"
}
export enum AfdTaskResultPrimitive_name {
    afd = "afd"
}
export enum AidConfigAlgo_name {
    aid = "aid"
}
export enum DFDConfigAlgo_name {
    dfd = "dfd"
}
export enum DepminerConfigAlgo_name {
    depminer = "depminer"
}
export enum FDepConfigAlgo_name {
    fdep = "fdep"
}
export enum FUNConfigAlgo_name {
    fun = "fun"
}
export enum FastFDsConfigAlgo_name {
    fastfds = "fastfds"
}
export enum FdMineConfigAlgo_name {
    fdmine = "fdmine"
}
export enum FdTaskConfigPrimitive_name {
    fd = "fd"
}
export enum FdTaskResultPrimitive_name {
    fd = "fd"
}
export enum HyFDConfigAlgo_name {
    hyfd = "hyfd"
}
export enum PFDTaneConfigAlgo_name {
    pfdtane = "pfdtane"
}
export enum PFDTaneConfigError_measure {
    per_tuple = "per_tuple",
    per_value = "per_value"
}
export enum PyroConfigAlgo_name {
    pyro = "pyro"
}
export enum TaneConfigAlgo_name {
    tane = "tane"
}
export enum TaskFailureReason {
    memory_limit_exceeded = "memory_limit_exceeded",
    time_limit_exceeded = "time_limit_exceeded",
    worker_killed_by_signal = "worker_killed_by_signal",
    other = "other"
}
export enum TaskStatus {
    failed = "failed",
    created = "created",
    running = "running",
    completed = "completed"
}
export type Algorithms = "aid" | "depminer" | "dfd" | "fastfds" | "fdep" | "fdmine" | "fun" | "hyfd" | "pfdtane" | "pyro" | "tane";
export const AlgorithmList: Array<Algorithms> = ["aid", "depminer", "dfd", "fastfds", "fdep", "fdmine", "fun", "hyfd", "pfdtane", "pyro", "tane"];
