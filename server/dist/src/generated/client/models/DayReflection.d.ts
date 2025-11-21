import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DayReflection
 *
 */
export type DayReflectionModel = runtime.Types.Result.DefaultSelection<Prisma.$DayReflectionPayload>;
export type AggregateDayReflection = {
    _count: DayReflectionCountAggregateOutputType | null;
    _avg: DayReflectionAvgAggregateOutputType | null;
    _sum: DayReflectionSumAggregateOutputType | null;
    _min: DayReflectionMinAggregateOutputType | null;
    _max: DayReflectionMaxAggregateOutputType | null;
};
export type DayReflectionAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    selfRating: number | null;
    completionRate: number | null;
};
export type DayReflectionSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    selfRating: number | null;
    completionRate: number | null;
};
export type DayReflectionMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    planDate: Date | null;
    selfRating: number | null;
    userNotes: string | null;
    aiSummary: string | null;
    completionRate: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DayReflectionMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    planDate: Date | null;
    selfRating: number | null;
    userNotes: string | null;
    aiSummary: string | null;
    completionRate: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DayReflectionCountAggregateOutputType = {
    id: number;
    userId: number;
    planDate: number;
    selfRating: number;
    userNotes: number;
    aiSummary: number;
    completionRate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DayReflectionAvgAggregateInputType = {
    id?: true;
    userId?: true;
    selfRating?: true;
    completionRate?: true;
};
export type DayReflectionSumAggregateInputType = {
    id?: true;
    userId?: true;
    selfRating?: true;
    completionRate?: true;
};
export type DayReflectionMinAggregateInputType = {
    id?: true;
    userId?: true;
    planDate?: true;
    selfRating?: true;
    userNotes?: true;
    aiSummary?: true;
    completionRate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DayReflectionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    planDate?: true;
    selfRating?: true;
    userNotes?: true;
    aiSummary?: true;
    completionRate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DayReflectionCountAggregateInputType = {
    id?: true;
    userId?: true;
    planDate?: true;
    selfRating?: true;
    userNotes?: true;
    aiSummary?: true;
    completionRate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DayReflectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DayReflection to aggregate.
     */
    where?: Prisma.DayReflectionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DayReflections to fetch.
     */
    orderBy?: Prisma.DayReflectionOrderByWithRelationInput | Prisma.DayReflectionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DayReflectionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DayReflections from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DayReflections.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DayReflections
    **/
    _count?: true | DayReflectionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DayReflectionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DayReflectionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DayReflectionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DayReflectionMaxAggregateInputType;
};
export type GetDayReflectionAggregateType<T extends DayReflectionAggregateArgs> = {
    [P in keyof T & keyof AggregateDayReflection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDayReflection[P]> : Prisma.GetScalarType<T[P], AggregateDayReflection[P]>;
};
export type DayReflectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DayReflectionWhereInput;
    orderBy?: Prisma.DayReflectionOrderByWithAggregationInput | Prisma.DayReflectionOrderByWithAggregationInput[];
    by: Prisma.DayReflectionScalarFieldEnum[] | Prisma.DayReflectionScalarFieldEnum;
    having?: Prisma.DayReflectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DayReflectionCountAggregateInputType | true;
    _avg?: DayReflectionAvgAggregateInputType;
    _sum?: DayReflectionSumAggregateInputType;
    _min?: DayReflectionMinAggregateInputType;
    _max?: DayReflectionMaxAggregateInputType;
};
export type DayReflectionGroupByOutputType = {
    id: number;
    userId: number;
    planDate: Date;
    selfRating: number | null;
    userNotes: string | null;
    aiSummary: string | null;
    completionRate: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DayReflectionCountAggregateOutputType | null;
    _avg: DayReflectionAvgAggregateOutputType | null;
    _sum: DayReflectionSumAggregateOutputType | null;
    _min: DayReflectionMinAggregateOutputType | null;
    _max: DayReflectionMaxAggregateOutputType | null;
};
type GetDayReflectionGroupByPayload<T extends DayReflectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DayReflectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DayReflectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DayReflectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DayReflectionGroupByOutputType[P]>;
}>>;
export type DayReflectionWhereInput = {
    AND?: Prisma.DayReflectionWhereInput | Prisma.DayReflectionWhereInput[];
    OR?: Prisma.DayReflectionWhereInput[];
    NOT?: Prisma.DayReflectionWhereInput | Prisma.DayReflectionWhereInput[];
    id?: Prisma.IntFilter<"DayReflection"> | number;
    userId?: Prisma.IntFilter<"DayReflection"> | number;
    planDate?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    selfRating?: Prisma.IntNullableFilter<"DayReflection"> | number | null;
    userNotes?: Prisma.StringNullableFilter<"DayReflection"> | string | null;
    aiSummary?: Prisma.StringNullableFilter<"DayReflection"> | string | null;
    completionRate?: Prisma.FloatNullableFilter<"DayReflection"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DayReflectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    planDate?: Prisma.SortOrder;
    selfRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    userNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiSummary?: Prisma.SortOrderInput | Prisma.SortOrder;
    completionRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DayReflectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId_planDate?: Prisma.DayReflectionUserIdPlanDateCompoundUniqueInput;
    AND?: Prisma.DayReflectionWhereInput | Prisma.DayReflectionWhereInput[];
    OR?: Prisma.DayReflectionWhereInput[];
    NOT?: Prisma.DayReflectionWhereInput | Prisma.DayReflectionWhereInput[];
    userId?: Prisma.IntFilter<"DayReflection"> | number;
    planDate?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    selfRating?: Prisma.IntNullableFilter<"DayReflection"> | number | null;
    userNotes?: Prisma.StringNullableFilter<"DayReflection"> | string | null;
    aiSummary?: Prisma.StringNullableFilter<"DayReflection"> | string | null;
    completionRate?: Prisma.FloatNullableFilter<"DayReflection"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_planDate">;
export type DayReflectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    planDate?: Prisma.SortOrder;
    selfRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    userNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiSummary?: Prisma.SortOrderInput | Prisma.SortOrder;
    completionRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DayReflectionCountOrderByAggregateInput;
    _avg?: Prisma.DayReflectionAvgOrderByAggregateInput;
    _max?: Prisma.DayReflectionMaxOrderByAggregateInput;
    _min?: Prisma.DayReflectionMinOrderByAggregateInput;
    _sum?: Prisma.DayReflectionSumOrderByAggregateInput;
};
export type DayReflectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.DayReflectionScalarWhereWithAggregatesInput | Prisma.DayReflectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.DayReflectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DayReflectionScalarWhereWithAggregatesInput | Prisma.DayReflectionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"DayReflection"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"DayReflection"> | number;
    planDate?: Prisma.DateTimeWithAggregatesFilter<"DayReflection"> | Date | string;
    selfRating?: Prisma.IntNullableWithAggregatesFilter<"DayReflection"> | number | null;
    userNotes?: Prisma.StringNullableWithAggregatesFilter<"DayReflection"> | string | null;
    aiSummary?: Prisma.StringNullableWithAggregatesFilter<"DayReflection"> | string | null;
    completionRate?: Prisma.FloatNullableWithAggregatesFilter<"DayReflection"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DayReflection"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DayReflection"> | Date | string;
};
export type DayReflectionCreateInput = {
    planDate: Date | string;
    selfRating?: number | null;
    userNotes?: string | null;
    aiSummary?: string | null;
    completionRate?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDayReflectionsInput;
};
export type DayReflectionUncheckedCreateInput = {
    id?: number;
    userId: number;
    planDate: Date | string;
    selfRating?: number | null;
    userNotes?: string | null;
    aiSummary?: string | null;
    completionRate?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DayReflectionUpdateInput = {
    planDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selfRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    userNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiSummary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completionRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDayReflectionsNestedInput;
};
export type DayReflectionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    planDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selfRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    userNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiSummary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completionRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DayReflectionCreateManyInput = {
    id?: number;
    userId: number;
    planDate: Date | string;
    selfRating?: number | null;
    userNotes?: string | null;
    aiSummary?: string | null;
    completionRate?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DayReflectionUpdateManyMutationInput = {
    planDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selfRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    userNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiSummary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completionRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DayReflectionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    planDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selfRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    userNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiSummary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completionRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DayReflectionListRelationFilter = {
    every?: Prisma.DayReflectionWhereInput;
    some?: Prisma.DayReflectionWhereInput;
    none?: Prisma.DayReflectionWhereInput;
};
export type DayReflectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DayReflectionUserIdPlanDateCompoundUniqueInput = {
    userId: number;
    planDate: Date | string;
};
export type DayReflectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    planDate?: Prisma.SortOrder;
    selfRating?: Prisma.SortOrder;
    userNotes?: Prisma.SortOrder;
    aiSummary?: Prisma.SortOrder;
    completionRate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DayReflectionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    selfRating?: Prisma.SortOrder;
    completionRate?: Prisma.SortOrder;
};
export type DayReflectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    planDate?: Prisma.SortOrder;
    selfRating?: Prisma.SortOrder;
    userNotes?: Prisma.SortOrder;
    aiSummary?: Prisma.SortOrder;
    completionRate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DayReflectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    planDate?: Prisma.SortOrder;
    selfRating?: Prisma.SortOrder;
    userNotes?: Prisma.SortOrder;
    aiSummary?: Prisma.SortOrder;
    completionRate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DayReflectionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    selfRating?: Prisma.SortOrder;
    completionRate?: Prisma.SortOrder;
};
export type DayReflectionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DayReflectionCreateWithoutUserInput, Prisma.DayReflectionUncheckedCreateWithoutUserInput> | Prisma.DayReflectionCreateWithoutUserInput[] | Prisma.DayReflectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DayReflectionCreateOrConnectWithoutUserInput | Prisma.DayReflectionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DayReflectionCreateManyUserInputEnvelope;
    connect?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
};
export type DayReflectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DayReflectionCreateWithoutUserInput, Prisma.DayReflectionUncheckedCreateWithoutUserInput> | Prisma.DayReflectionCreateWithoutUserInput[] | Prisma.DayReflectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DayReflectionCreateOrConnectWithoutUserInput | Prisma.DayReflectionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DayReflectionCreateManyUserInputEnvelope;
    connect?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
};
export type DayReflectionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DayReflectionCreateWithoutUserInput, Prisma.DayReflectionUncheckedCreateWithoutUserInput> | Prisma.DayReflectionCreateWithoutUserInput[] | Prisma.DayReflectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DayReflectionCreateOrConnectWithoutUserInput | Prisma.DayReflectionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DayReflectionUpsertWithWhereUniqueWithoutUserInput | Prisma.DayReflectionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DayReflectionCreateManyUserInputEnvelope;
    set?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    disconnect?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    delete?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    connect?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    update?: Prisma.DayReflectionUpdateWithWhereUniqueWithoutUserInput | Prisma.DayReflectionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DayReflectionUpdateManyWithWhereWithoutUserInput | Prisma.DayReflectionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DayReflectionScalarWhereInput | Prisma.DayReflectionScalarWhereInput[];
};
export type DayReflectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DayReflectionCreateWithoutUserInput, Prisma.DayReflectionUncheckedCreateWithoutUserInput> | Prisma.DayReflectionCreateWithoutUserInput[] | Prisma.DayReflectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DayReflectionCreateOrConnectWithoutUserInput | Prisma.DayReflectionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DayReflectionUpsertWithWhereUniqueWithoutUserInput | Prisma.DayReflectionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DayReflectionCreateManyUserInputEnvelope;
    set?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    disconnect?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    delete?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    connect?: Prisma.DayReflectionWhereUniqueInput | Prisma.DayReflectionWhereUniqueInput[];
    update?: Prisma.DayReflectionUpdateWithWhereUniqueWithoutUserInput | Prisma.DayReflectionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DayReflectionUpdateManyWithWhereWithoutUserInput | Prisma.DayReflectionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DayReflectionScalarWhereInput | Prisma.DayReflectionScalarWhereInput[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DayReflectionCreateWithoutUserInput = {
    planDate: Date | string;
    selfRating?: number | null;
    userNotes?: string | null;
    aiSummary?: string | null;
    completionRate?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DayReflectionUncheckedCreateWithoutUserInput = {
    id?: number;
    planDate: Date | string;
    selfRating?: number | null;
    userNotes?: string | null;
    aiSummary?: string | null;
    completionRate?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DayReflectionCreateOrConnectWithoutUserInput = {
    where: Prisma.DayReflectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DayReflectionCreateWithoutUserInput, Prisma.DayReflectionUncheckedCreateWithoutUserInput>;
};
export type DayReflectionCreateManyUserInputEnvelope = {
    data: Prisma.DayReflectionCreateManyUserInput | Prisma.DayReflectionCreateManyUserInput[];
};
export type DayReflectionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DayReflectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.DayReflectionUpdateWithoutUserInput, Prisma.DayReflectionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DayReflectionCreateWithoutUserInput, Prisma.DayReflectionUncheckedCreateWithoutUserInput>;
};
export type DayReflectionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DayReflectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.DayReflectionUpdateWithoutUserInput, Prisma.DayReflectionUncheckedUpdateWithoutUserInput>;
};
export type DayReflectionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DayReflectionScalarWhereInput;
    data: Prisma.XOR<Prisma.DayReflectionUpdateManyMutationInput, Prisma.DayReflectionUncheckedUpdateManyWithoutUserInput>;
};
export type DayReflectionScalarWhereInput = {
    AND?: Prisma.DayReflectionScalarWhereInput | Prisma.DayReflectionScalarWhereInput[];
    OR?: Prisma.DayReflectionScalarWhereInput[];
    NOT?: Prisma.DayReflectionScalarWhereInput | Prisma.DayReflectionScalarWhereInput[];
    id?: Prisma.IntFilter<"DayReflection"> | number;
    userId?: Prisma.IntFilter<"DayReflection"> | number;
    planDate?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    selfRating?: Prisma.IntNullableFilter<"DayReflection"> | number | null;
    userNotes?: Prisma.StringNullableFilter<"DayReflection"> | string | null;
    aiSummary?: Prisma.StringNullableFilter<"DayReflection"> | string | null;
    completionRate?: Prisma.FloatNullableFilter<"DayReflection"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DayReflection"> | Date | string;
};
export type DayReflectionCreateManyUserInput = {
    id?: number;
    planDate: Date | string;
    selfRating?: number | null;
    userNotes?: string | null;
    aiSummary?: string | null;
    completionRate?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DayReflectionUpdateWithoutUserInput = {
    planDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selfRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    userNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiSummary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completionRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DayReflectionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    planDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selfRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    userNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiSummary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completionRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DayReflectionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    planDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selfRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    userNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiSummary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    completionRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DayReflectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    planDate?: boolean;
    selfRating?: boolean;
    userNotes?: boolean;
    aiSummary?: boolean;
    completionRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dayReflection"]>;
export type DayReflectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    planDate?: boolean;
    selfRating?: boolean;
    userNotes?: boolean;
    aiSummary?: boolean;
    completionRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dayReflection"]>;
export type DayReflectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    planDate?: boolean;
    selfRating?: boolean;
    userNotes?: boolean;
    aiSummary?: boolean;
    completionRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dayReflection"]>;
export type DayReflectionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    planDate?: boolean;
    selfRating?: boolean;
    userNotes?: boolean;
    aiSummary?: boolean;
    completionRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DayReflectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "planDate" | "selfRating" | "userNotes" | "aiSummary" | "completionRate" | "createdAt" | "updatedAt", ExtArgs["result"]["dayReflection"]>;
export type DayReflectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DayReflectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DayReflectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DayReflectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DayReflection";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        planDate: Date;
        selfRating: number | null;
        userNotes: string | null;
        aiSummary: string | null;
        completionRate: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["dayReflection"]>;
    composites: {};
};
export type DayReflectionGetPayload<S extends boolean | null | undefined | DayReflectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload, S>;
export type DayReflectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DayReflectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DayReflectionCountAggregateInputType | true;
};
export interface DayReflectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DayReflection'];
        meta: {
            name: 'DayReflection';
        };
    };
    /**
     * Find zero or one DayReflection that matches the filter.
     * @param {DayReflectionFindUniqueArgs} args - Arguments to find a DayReflection
     * @example
     * // Get one DayReflection
     * const dayReflection = await prisma.dayReflection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DayReflectionFindUniqueArgs>(args: Prisma.SelectSubset<T, DayReflectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DayReflection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DayReflectionFindUniqueOrThrowArgs} args - Arguments to find a DayReflection
     * @example
     * // Get one DayReflection
     * const dayReflection = await prisma.dayReflection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DayReflectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DayReflectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DayReflection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayReflectionFindFirstArgs} args - Arguments to find a DayReflection
     * @example
     * // Get one DayReflection
     * const dayReflection = await prisma.dayReflection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DayReflectionFindFirstArgs>(args?: Prisma.SelectSubset<T, DayReflectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DayReflection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayReflectionFindFirstOrThrowArgs} args - Arguments to find a DayReflection
     * @example
     * // Get one DayReflection
     * const dayReflection = await prisma.dayReflection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DayReflectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DayReflectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DayReflections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayReflectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DayReflections
     * const dayReflections = await prisma.dayReflection.findMany()
     *
     * // Get first 10 DayReflections
     * const dayReflections = await prisma.dayReflection.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const dayReflectionWithIdOnly = await prisma.dayReflection.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DayReflectionFindManyArgs>(args?: Prisma.SelectSubset<T, DayReflectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DayReflection.
     * @param {DayReflectionCreateArgs} args - Arguments to create a DayReflection.
     * @example
     * // Create one DayReflection
     * const DayReflection = await prisma.dayReflection.create({
     *   data: {
     *     // ... data to create a DayReflection
     *   }
     * })
     *
     */
    create<T extends DayReflectionCreateArgs>(args: Prisma.SelectSubset<T, DayReflectionCreateArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DayReflections.
     * @param {DayReflectionCreateManyArgs} args - Arguments to create many DayReflections.
     * @example
     * // Create many DayReflections
     * const dayReflection = await prisma.dayReflection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DayReflectionCreateManyArgs>(args?: Prisma.SelectSubset<T, DayReflectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DayReflections and returns the data saved in the database.
     * @param {DayReflectionCreateManyAndReturnArgs} args - Arguments to create many DayReflections.
     * @example
     * // Create many DayReflections
     * const dayReflection = await prisma.dayReflection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DayReflections and only return the `id`
     * const dayReflectionWithIdOnly = await prisma.dayReflection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DayReflectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DayReflectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DayReflection.
     * @param {DayReflectionDeleteArgs} args - Arguments to delete one DayReflection.
     * @example
     * // Delete one DayReflection
     * const DayReflection = await prisma.dayReflection.delete({
     *   where: {
     *     // ... filter to delete one DayReflection
     *   }
     * })
     *
     */
    delete<T extends DayReflectionDeleteArgs>(args: Prisma.SelectSubset<T, DayReflectionDeleteArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DayReflection.
     * @param {DayReflectionUpdateArgs} args - Arguments to update one DayReflection.
     * @example
     * // Update one DayReflection
     * const dayReflection = await prisma.dayReflection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DayReflectionUpdateArgs>(args: Prisma.SelectSubset<T, DayReflectionUpdateArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DayReflections.
     * @param {DayReflectionDeleteManyArgs} args - Arguments to filter DayReflections to delete.
     * @example
     * // Delete a few DayReflections
     * const { count } = await prisma.dayReflection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DayReflectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, DayReflectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DayReflections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayReflectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DayReflections
     * const dayReflection = await prisma.dayReflection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DayReflectionUpdateManyArgs>(args: Prisma.SelectSubset<T, DayReflectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DayReflections and returns the data updated in the database.
     * @param {DayReflectionUpdateManyAndReturnArgs} args - Arguments to update many DayReflections.
     * @example
     * // Update many DayReflections
     * const dayReflection = await prisma.dayReflection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DayReflections and only return the `id`
     * const dayReflectionWithIdOnly = await prisma.dayReflection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DayReflectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DayReflectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DayReflection.
     * @param {DayReflectionUpsertArgs} args - Arguments to update or create a DayReflection.
     * @example
     * // Update or create a DayReflection
     * const dayReflection = await prisma.dayReflection.upsert({
     *   create: {
     *     // ... data to create a DayReflection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DayReflection we want to update
     *   }
     * })
     */
    upsert<T extends DayReflectionUpsertArgs>(args: Prisma.SelectSubset<T, DayReflectionUpsertArgs<ExtArgs>>): Prisma.Prisma__DayReflectionClient<runtime.Types.Result.GetResult<Prisma.$DayReflectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DayReflections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayReflectionCountArgs} args - Arguments to filter DayReflections to count.
     * @example
     * // Count the number of DayReflections
     * const count = await prisma.dayReflection.count({
     *   where: {
     *     // ... the filter for the DayReflections we want to count
     *   }
     * })
    **/
    count<T extends DayReflectionCountArgs>(args?: Prisma.Subset<T, DayReflectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DayReflectionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DayReflection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayReflectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DayReflectionAggregateArgs>(args: Prisma.Subset<T, DayReflectionAggregateArgs>): Prisma.PrismaPromise<GetDayReflectionAggregateType<T>>;
    /**
     * Group by DayReflection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DayReflectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends DayReflectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DayReflectionGroupByArgs['orderBy'];
    } : {
        orderBy?: DayReflectionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DayReflectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDayReflectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DayReflection model
     */
    readonly fields: DayReflectionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DayReflection.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DayReflectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the DayReflection model
 */
export interface DayReflectionFieldRefs {
    readonly id: Prisma.FieldRef<"DayReflection", 'Int'>;
    readonly userId: Prisma.FieldRef<"DayReflection", 'Int'>;
    readonly planDate: Prisma.FieldRef<"DayReflection", 'DateTime'>;
    readonly selfRating: Prisma.FieldRef<"DayReflection", 'Int'>;
    readonly userNotes: Prisma.FieldRef<"DayReflection", 'String'>;
    readonly aiSummary: Prisma.FieldRef<"DayReflection", 'String'>;
    readonly completionRate: Prisma.FieldRef<"DayReflection", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"DayReflection", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DayReflection", 'DateTime'>;
}
/**
 * DayReflection findUnique
 */
export type DayReflectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * Filter, which DayReflection to fetch.
     */
    where: Prisma.DayReflectionWhereUniqueInput;
};
/**
 * DayReflection findUniqueOrThrow
 */
export type DayReflectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * Filter, which DayReflection to fetch.
     */
    where: Prisma.DayReflectionWhereUniqueInput;
};
/**
 * DayReflection findFirst
 */
export type DayReflectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * Filter, which DayReflection to fetch.
     */
    where?: Prisma.DayReflectionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DayReflections to fetch.
     */
    orderBy?: Prisma.DayReflectionOrderByWithRelationInput | Prisma.DayReflectionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DayReflections.
     */
    cursor?: Prisma.DayReflectionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DayReflections from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DayReflections.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DayReflections.
     */
    distinct?: Prisma.DayReflectionScalarFieldEnum | Prisma.DayReflectionScalarFieldEnum[];
};
/**
 * DayReflection findFirstOrThrow
 */
export type DayReflectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * Filter, which DayReflection to fetch.
     */
    where?: Prisma.DayReflectionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DayReflections to fetch.
     */
    orderBy?: Prisma.DayReflectionOrderByWithRelationInput | Prisma.DayReflectionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DayReflections.
     */
    cursor?: Prisma.DayReflectionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DayReflections from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DayReflections.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DayReflections.
     */
    distinct?: Prisma.DayReflectionScalarFieldEnum | Prisma.DayReflectionScalarFieldEnum[];
};
/**
 * DayReflection findMany
 */
export type DayReflectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * Filter, which DayReflections to fetch.
     */
    where?: Prisma.DayReflectionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DayReflections to fetch.
     */
    orderBy?: Prisma.DayReflectionOrderByWithRelationInput | Prisma.DayReflectionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DayReflections.
     */
    cursor?: Prisma.DayReflectionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DayReflections from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DayReflections.
     */
    skip?: number;
    distinct?: Prisma.DayReflectionScalarFieldEnum | Prisma.DayReflectionScalarFieldEnum[];
};
/**
 * DayReflection create
 */
export type DayReflectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * The data needed to create a DayReflection.
     */
    data: Prisma.XOR<Prisma.DayReflectionCreateInput, Prisma.DayReflectionUncheckedCreateInput>;
};
/**
 * DayReflection createMany
 */
export type DayReflectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DayReflections.
     */
    data: Prisma.DayReflectionCreateManyInput | Prisma.DayReflectionCreateManyInput[];
};
/**
 * DayReflection createManyAndReturn
 */
export type DayReflectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * The data used to create many DayReflections.
     */
    data: Prisma.DayReflectionCreateManyInput | Prisma.DayReflectionCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DayReflection update
 */
export type DayReflectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * The data needed to update a DayReflection.
     */
    data: Prisma.XOR<Prisma.DayReflectionUpdateInput, Prisma.DayReflectionUncheckedUpdateInput>;
    /**
     * Choose, which DayReflection to update.
     */
    where: Prisma.DayReflectionWhereUniqueInput;
};
/**
 * DayReflection updateMany
 */
export type DayReflectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DayReflections.
     */
    data: Prisma.XOR<Prisma.DayReflectionUpdateManyMutationInput, Prisma.DayReflectionUncheckedUpdateManyInput>;
    /**
     * Filter which DayReflections to update
     */
    where?: Prisma.DayReflectionWhereInput;
    /**
     * Limit how many DayReflections to update.
     */
    limit?: number;
};
/**
 * DayReflection updateManyAndReturn
 */
export type DayReflectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * The data used to update DayReflections.
     */
    data: Prisma.XOR<Prisma.DayReflectionUpdateManyMutationInput, Prisma.DayReflectionUncheckedUpdateManyInput>;
    /**
     * Filter which DayReflections to update
     */
    where?: Prisma.DayReflectionWhereInput;
    /**
     * Limit how many DayReflections to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DayReflection upsert
 */
export type DayReflectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * The filter to search for the DayReflection to update in case it exists.
     */
    where: Prisma.DayReflectionWhereUniqueInput;
    /**
     * In case the DayReflection found by the `where` argument doesn't exist, create a new DayReflection with this data.
     */
    create: Prisma.XOR<Prisma.DayReflectionCreateInput, Prisma.DayReflectionUncheckedCreateInput>;
    /**
     * In case the DayReflection was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DayReflectionUpdateInput, Prisma.DayReflectionUncheckedUpdateInput>;
};
/**
 * DayReflection delete
 */
export type DayReflectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
    /**
     * Filter which DayReflection to delete.
     */
    where: Prisma.DayReflectionWhereUniqueInput;
};
/**
 * DayReflection deleteMany
 */
export type DayReflectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DayReflections to delete
     */
    where?: Prisma.DayReflectionWhereInput;
    /**
     * Limit how many DayReflections to delete.
     */
    limit?: number;
};
/**
 * DayReflection without action
 */
export type DayReflectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DayReflection
     */
    select?: Prisma.DayReflectionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DayReflection
     */
    omit?: Prisma.DayReflectionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DayReflectionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DayReflection.d.ts.map