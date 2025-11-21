import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: any;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: any;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: any;
export declare const ModelName: {
    readonly User: "User";
    readonly UserProfile: "UserProfile";
    readonly ChatSession: "ChatSession";
    readonly Message: "Message";
    readonly DayPlan: "DayPlan";
    readonly PlanBlock: "PlanBlock";
    readonly DayReflection: "DayReflection";
    readonly HabitTemplate: "HabitTemplate";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly displayName: "displayName";
    readonly timezone: "timezone";
    readonly wakeTime: "wakeTime";
    readonly sleepTime: "sleepTime";
    readonly workStartTime: "workStartTime";
    readonly workEndTime: "workEndTime";
    readonly pacePreference: "pacePreference";
    readonly stylePreference: "stylePreference";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum];
export declare const ChatSessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly relatedDate: "relatedDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChatSessionScalarFieldEnum = (typeof ChatSessionScalarFieldEnum)[keyof typeof ChatSessionScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly userId: "userId";
    readonly role: "role";
    readonly content: "content";
    readonly aiRawPayload: "aiRawPayload";
    readonly hasPlanUpdate: "hasPlanUpdate";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const DayPlanScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly planDate: "planDate";
    readonly dayGoal: "dayGoal";
    readonly overallAdvice: "overallAdvice";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DayPlanScalarFieldEnum = (typeof DayPlanScalarFieldEnum)[keyof typeof DayPlanScalarFieldEnum];
export declare const PlanBlockScalarFieldEnum: {
    readonly id: "id";
    readonly dayPlanId: "dayPlanId";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly title: "title";
    readonly description: "description";
    readonly notes: "notes";
    readonly category: "category";
    readonly priority: "priority";
    readonly status: "status";
    readonly fromPreviousBlockId: "fromPreviousBlockId";
    readonly aiBlockId: "aiBlockId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PlanBlockScalarFieldEnum = (typeof PlanBlockScalarFieldEnum)[keyof typeof PlanBlockScalarFieldEnum];
export declare const DayReflectionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly planDate: "planDate";
    readonly selfRating: "selfRating";
    readonly userNotes: "userNotes";
    readonly aiSummary: "aiSummary";
    readonly completionRate: "completionRate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DayReflectionScalarFieldEnum = (typeof DayReflectionScalarFieldEnum)[keyof typeof DayReflectionScalarFieldEnum];
export declare const HabitTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly defaultDurationMinutes: "defaultDurationMinutes";
    readonly recommendedTimeOfDay: "recommendedTimeOfDay";
    readonly category: "category";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HabitTemplateScalarFieldEnum = (typeof HabitTemplateScalarFieldEnum)[keyof typeof HabitTemplateScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map