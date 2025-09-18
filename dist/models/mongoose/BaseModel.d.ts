export declare const baseSchema: {
    createdAt: {
        type: DateConstructor;
        default: () => number;
    };
    updatedAt: {
        type: DateConstructor;
        default: () => number;
    };
};
export declare const baseSchemaOptions: {
    timestamps: boolean;
    toJSON: {
        transform: (doc: any, ret: any) => any;
    };
    toObject: {
        transform: (doc: any, ret: any) => any;
    };
};
