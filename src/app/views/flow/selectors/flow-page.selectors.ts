import { fromFlow } from "@euskalfic/shared/flow";
import { createSelector } from '@ngrx/store';

export const selectFlowPageInfo = createSelector(
  fromFlow.selectStatus,
  fromFlow.selectPage,
  fromFlow.selectTotal,
  (status, page, total) => {
   return {
    status,
    page,
    total
   }
  }
);
