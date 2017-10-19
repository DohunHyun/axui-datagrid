import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';


class GridHeader extends React.Component {
  constructor(props) {
    super(props);

  }

  shouldComponentUpdate(nextProps, nextState) {
    let sameProps = false;

    if (
      this.props.mounted !== nextProps.mounted ||
      JSON.stringify(this.props.optionsHeader) !== JSON.stringify(nextProps.optionsHeader) ||
      JSON.stringify(this.props.styles) !== JSON.stringify(nextProps.styles) ||
      JSON.stringify(this.props.colGroup) !== JSON.stringify(nextProps.colGroup) ||
      this.props.scrollLeft !== nextProps.scrollLeft
    ) {
      sameProps = true;
    }

    return sameProps;
  }

  render() {

    const refCallback        = this.props.refCallback,
          mounted            = this.props.mounted,
          optionsHeader      = this.props.optionsHeader,
          styles             = this.props.styles,
          frozenColumnIndex  = this.props.frozenColumnIndex,
          colGroup           = this.props.colGroup,
          asideColGroup      = this.props.asideColGroup,
          leftHeaderColGroup = this.props.leftHeaderColGroup,
          headerColGroup     = this.props.headerColGroup,
          asideHeaderData    = this.props.asideHeaderData,
          leftHeaderData     = this.props.leftHeaderData,
          headerData         = this.props.headerData,
          scrollLeft         = this.props.scrollLeft;

    if (!mounted) return null;

    const printHeader = function (_panelName, _colGroup, _bodyRow, _style) {

      const getFieldSpan = function (_colGroup, _col) {
        let lineHeight = (optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth);
        let colAlign = optionsHeader.align || _col.align;
        let label, sorter, filter;

        if (_col.key === "__checkbox_header__") {
          if (optionsHeader.selector) {
            label = <div data-checkbox style={{
              maxHeight: (_col.width - 10) + "px",
              minHeight: (_col.width - 10) + "px"
            }} />;
          }
        } else {
          label = _col.label;
        }

        if (_col.key && _col.colIndex !== null && typeof _col.colIndex !== "undefined" && (optionsHeader.sortable === true || _col.sortable === true) && _col.sortable !== false) {
          sorter = <span data-sorter={_col.colIndex} data-sorter-order={_colGroup.get(_col.colIndex).sort} />;
        }

        if (_col.colIndex !== null && typeof _col.colIndex !== "undefined" && optionsHeader.enableFilter) {
          filter = <span data-filter={_col.colIndex} data-filter-value="" />;
        }

        return (
          <span
            data-span
            data-align={colAlign}
            style={{
              height: (optionsHeader.columnHeight - optionsHeader.columnBorderWidth) + "px",
              lineHeight: lineHeight + "px"
            }}>
            {sorter}
            {label || ' '}
            {filter}
          </span>
        );
      };

      return (
        <div data-panel={_panelName} style={_style} ref={ref => refCallback(_panelName, ref)}>
          <table style={{height: "100%"}}>
            <colgroup>
              {_colGroup.map(
                (col, ci) => (
                  <col
                    key={ci}
                    style={{width: col._width + "px"}} />
                )
              )}
              <col />
            </colgroup>
            <tbody>
            {_bodyRow.get('rows').map(
              (row, ri) => {
                return (
                  <tr
                    key={ri}
                    className="">
                    {row.cols.map((col, ci) => {
                      let cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
                      let classNameItmes = {};
                      classNameItmes[sass.hasBorder] = true;
                      if (row.cols.length == ci + 1) {
                        classNameItmes[sass.isLastColumn] = true;
                      }

                      return (
                        <td
                          key={ci}
                          colSpan={col.colspan}
                          rowSpan={col.rowspan}
                          className={classNames(classNameItmes)}
                          style={{height: cellHeight, minHeight: "1px"}}>
                          {getFieldSpan(colGroup, col)}
                        </td>
                      );
                    })}
                    <td>&nbsp;</td>
                  </tr>
                );
              }
            )}
            </tbody>
          </table>

          {_colGroup.map(
            (col, ci) => {
              let resizerHeight = optionsHeader.columnHeight * _bodyRow.get('rows').size - optionsHeader.columnBorderWidth;
              let resizer, resizerLeft = 0;
              if (col.colIndex !== null && typeof col.colIndex !== "undefined") {
                resizerLeft += col._width;
                resizer = <div
                  key={ci}
                  data-column-resizer={col.colIndex} style={{height: resizerHeight + 'px', left: (resizerLeft - 4) + 'px'}} />;
              }
              return (resizer);
            }
          )}

        </div>
      );
    };

    let asideHeaderPanelStyle = {
      left: 0,
      width: styles.asidePanelWidth,
      height: styles.headerHeight
    };
    let leftHeaderPanelStyle = {
      left: styles.asidePanelWidth,
      width: styles.frozenPanelWidth,
      height: styles.headerHeight
    };
    let headerPanelStyle = {
      left: styles.frozenPanelWidth + styles.asidePanelWidth,
      width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
      height: styles.headerHeight
    };
    let headerScrollStyle = {
      height: styles.headerHeight,
      left: scrollLeft
    };

    return (
      <div className={classNames(sass.gridHeader)} style={{height: styles.headerHeight}}>
        {(styles.asidePanelWidth > 0) ? printHeader("aside-header", asideColGroup, asideHeaderData, asideHeaderPanelStyle) : null}
        {(frozenColumnIndex > 0) ? printHeader("left-header", leftHeaderColGroup, leftHeaderData, leftHeaderPanelStyle) : null}
        <div data-scroll-container="header-scroll-container" style={headerPanelStyle}>
          {printHeader("header-scroll", headerColGroup, headerData, headerScrollStyle)}
        </div>
      </div>
    )
  }
}


export default GridHeader;