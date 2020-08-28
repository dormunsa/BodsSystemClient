import { State } from '@progress/kendo-data-query';
import { ColumnSettings } from './ColumnSettings';
// define grid settings options
export interface GridSettings {
    date: Date;
    columnsConfig: ColumnSettings[];
    state: State;
    gridData?: any;
}
