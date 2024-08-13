/**
 * @module
 * this module is used to define custom types and not meant to be used for third party libraries types
 */

import { SortSearchParam } from "@/components/ArticleGrid/SortButton";

export type SearchParams = { page?: string; sort?: SortSearchParam };
