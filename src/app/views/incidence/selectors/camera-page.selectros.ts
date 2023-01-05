
import { fromIncidence } from '@euskalfic/shared/incidence';
import { createSelector } from '@ngrx/store';

export const selectIncidencePageInfo = createSelector(
  fromIncidence.selectStatus,
  fromIncidence.selectPage,
  fromIncidence.selectTotal,
  (status, page, total) => {
    return{
      status,
      page,
      total
    }
  }
);
