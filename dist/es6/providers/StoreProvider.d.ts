import * as React from 'react';
import { IDataGridState, DataGridDispatchParam, IDataGridStyles } from '../common/@types';
import { DispatchTypes } from '../common/@enums';
export interface IDataGridStore extends IDataGridState {
    setStoreState: (store: IDataGridState) => void;
    dispatch: (dispatchType: DispatchTypes, param: DataGridDispatchParam) => void;
}
declare class StoreProvider extends React.Component<any, IDataGridState> {
    state: IDataGridStore;
    throttledUpdateDimensions: any;
    static getDerivedStateFromProps(newProps: any, prevState: IDataGridState): {
        scrollTop: number | undefined;
        mounted: any;
        loading: any;
        loadingData: any;
        setRootState: any;
        getRootState: any;
        rootNode: any;
        clipBoardNode: any;
        rootObject: any;
        data: any;
        filteredList: any[];
        options: any;
        height: any;
        onBeforeEvent: any;
        onAfterEvent: any;
        onScrollEnd: any;
        onRightClick: any;
        selection: any;
        rowSelector: any;
        colGroupMap: any;
        asideColGroup: any;
        colGroup: any;
        headerTable: any;
        asideHeaderData: any;
        leftHeaderData: any;
        headerData: any;
        leftHeaderColGroup: any;
        headerColGroup: any;
        bodyRowTable: any;
        bodyRowMap: any;
        asideBodyRowData: any;
        leftBodyRowData: any;
        bodyRowData: any;
        footSumColumns: any;
        footSumTable: any;
        leftFootSumData: any;
        footSumData: any;
        styles: IDataGridStyles;
        printStartColIndex: any;
        printEndColIndex: any;
        visibleHeaderColGroup: any;
        visibleBodyRowData: any;
        visibleBodyGroupingData: any;
        visibleFootSumData: any;
        calculatedStyles?: boolean | undefined;
        listSelectedAll?: boolean | undefined;
        selectedRowIndex?: number | undefined;
        selectedRowIndexSelected?: boolean | undefined;
        sortInfo?: {} | undefined;
        filterInfo?: {} | undefined;
        isInlineEditing?: boolean | undefined;
        inlineEditingCell?: import("axui-datagrid/common/@types").IDataGridEditingCell | undefined;
        columnResizing?: boolean | undefined;
        columnResizerLeft?: number | undefined;
        isColumnFilter?: number | boolean | undefined;
        scrollLeft?: number | undefined;
        endOfScrollTop?: boolean | undefined;
        endOfScrollLeft?: boolean | undefined;
        selectionRows?: {} | undefined;
        selectionCols?: {} | undefined;
        focusedRow?: number | undefined;
        focusedCol?: number | undefined;
        selectionStartOffset?: import("axui-datagrid/common/@types").IPosition | undefined;
        selectionEndOffset?: import("axui-datagrid/common/@types").IPosition | undefined;
        selectionMinOffset?: import("axui-datagrid/common/@types").IPosition | undefined;
        selectionMaxOffset?: import("axui-datagrid/common/@types").IPosition | undefined;
        selectionSRow?: number | undefined;
        selectionSCol?: number | undefined;
        selectionERow?: number | undefined;
        selectionECol?: number | undefined;
        bodyGrouping?: import("axui-datagrid/common/@types").IDataGridCol[] | undefined;
        bodyGroupingTable?: import("axui-datagrid/common/@types").IDataGridColumnTableMap | undefined;
        asideBodyGroupingData?: import("axui-datagrid/common/@types").IDataGridColumnTableMap | undefined;
        leftBodyGroupingData?: import("axui-datagrid/common/@types").IDataGridColumnTableMap | undefined;
        bodyGroupingData?: import("axui-datagrid/common/@types").IDataGridColumnTableMap | undefined;
        bodyGroupingMap?: {} | undefined;
        propColumns?: string | undefined;
        propOptions?: string | undefined;
        predefinedFormatter?: import("axui-datagrid/common/@types").IDataGridFormatter | undefined;
        predefinedCollector?: import("axui-datagrid/common/@types").IDataGridCollector | undefined;
    } | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateDimensions(): void;
    setStoreState: (newState: IDataGridState) => void;
    dispatch: (dispatchType: DispatchTypes, param: DataGridDispatchParam) => void;
    render(): JSX.Element;
}
declare const _default: {
    Provider: typeof StoreProvider;
    Consumer: React.ComponentType<React.ConsumerProps<IDataGridStore>>;
};
export default _default;
