import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import PopupTable from "./PopupTable";
import { TablePagination } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const useStyles = makeStyles(() => ({
    positivePercentage: {
        fontWeight: "bold",
        fontSize: "13px",
        backgroundColor: " #1db954",
        color: " #fff",
        borderRadius: "8px",
        padding: "2px 8px",
        transition: "background 0.2s",
    },
    negativePercentage: {
        fontWeight: "bold",
        fontSize: "13px",
        backgroundColor: " #e53935",
        color: " #fff",
        borderRadius: "8px",
        padding: "2px 8px",
        transition: "background 0.2s",
    },
    table: {
        minWidth: 650,
        borderRadius: 18,
        overflow: "hidden",
        background: "linear-gradient(120deg, #f8fafc 80%, #e3f0ff 100%)",
        border: "2px solid #007bff", // Add outer border
        "& .MuiTableCell-root": {
            borderLeft: "1.5px solid #e3eafc", // Column-wise border
            borderRight: "1.5px solid #e3eafc", // Column-wise border
            borderTop: "none",
            borderBottom: "none",
            fontSize: "1.08rem",
            fontWeight: 500,
            color: " #222",
            background: "transparent",
            transition: "background-color 0.3s ease",
        },
        "& .MuiTableRow-root.selected": {
            backgroundColor: " #e3f0ff !important",
        },
        "& .MuiTableCell-root:first-of-type": {
            borderLeft: "none", // Remove left border for first column
        },
        "& .MuiTableCell-root:last-of-type": {
            borderRight: "none", // Remove right border for last column
        },
    },
    tableHead: {
        background: "linear-gradient(90deg,rgb(60, 73, 255) 0%,rgb(0, 132, 255) 100%) !important",
        "& .MuiTableCell-root": {
            color: " #ffffff",
            fontWeight: 900,
            fontSize: "1.3rem",
            letterSpacing: 0.5,
            borderBottom: "2px solid #e3eafc",
            background: "transparent",
        },
    },
    tableSubHead: {
        background: " #f1f7ff",
        "& .MuiTableCell-root": {
            color: " #007bff",
            fontWeight: 700,
            fontSize: "1rem",
            borderBottom: "1.5px solid #e3eafc",
        },
    },
    hoveredCell: {
        backgroundColor: " #e3f0ff !important",
        transition: "background 0.2s",
    },
    clickableHeader: {
        cursor: "pointer",
        userSelect: "none",
        "&:hover": {
            color: " #007bff",
            textDecoration: "underline",
        },
    },
    pagination: {
        "& .MuiTablePagination-toolbar": {
            background: "transparent",
            color: " #007bff",
            fontWeight: 600,
        },
        "& .MuiTablePagination-selectIcon": {
            color: " #007bff",
        },
    },
}));

function Row(props) {
    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const convertValue = (field, value) => {
        if (!value && value !== 0) {
            return "-";
        }
        const column = props.columns.find((col) => col.field === field);
        if (column && column.convertToInteger) {
            return parseInt(value);
        }
        else if (column && column.convertToTwoDeciaml) {
            return value.toFixed(2);
        }
        return value;
    };

    const handleRowClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <React.Fragment>
            <TableRow
                sx={{ "& > *": { borderBottom: "unset" } }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={isSelected ? "selected" : ""}
                onClick={handleRowClick}
            >
                {props.columns.map((col) => {
                    let cellValue = props.row[col.field];
                    const colorCellValue = col.colorCell === undefined ? cellValue : props.row[col.colorCell];
                    if (col.cellValue !== undefined) {
                        cellValue = col.cellValue(props.row);
                    }

                    const cellClassName = !cellValue && !colorCellValue ? null :
                        (col.cellStyle ? colorCellValue > 0
                            ? classes.positivePercentage
                            : colorCellValue < 0
                                ? classes.negativePercentage
                                : null
                            : null);

                    cellValue = cellValue !== undefined ? convertValue(col.field, cellValue) : "-";

                    const finalVlaue =
                        col.suffix !== undefined && cellValue !== "-"
                            ? `${cellValue}` + col.suffix
                            : cellValue !== undefined
                                ? `${cellValue}`
                                : "-";

                    let style = {};
                    if (col.cellStyle && typeof colorCellValue === "number") {
                        style.color = colorCellValue > 0 ? "rgb(0, 177, 62)" : colorCellValue < 0 ? "rgb(216, 4, 0)" : " #222";
                        style.fontWeight = 600;
                        style.fontSize = "20px"
                    }

                    return (
                        <TableCell
                            key={col.field}
                            align="right"
                            className={`${cellClassName} ${cellClassName === null && isHovered ? classes.hoveredCell : ""
                                }`}
                            onDoubleClick={() => props.onCellDoubleClick(props.row)}
                            style={style}
                        >
                            {finalVlaue}
                        </TableCell>
                    );
                })}
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({}).isRequired,
};

const CustomTableV2 = (props) => {
    const classes = useStyles();
    const [secondColumns, setSecondColumns] = React.useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortBy, setSortBy] = useState(props.sortBy);
    const [sortOrder, setSortOrder] = useState("desc");
    const [isHistoricalDataExpanded, setIsHistoricalDataExpanded] = useState(false);

    const toggleHistoricalData = () => {
        setIsHistoricalDataExpanded(!isHistoricalDataExpanded);
      };

    const getMainColumns = (data) => {
        const mainColumns = [];
        data.forEach((element) => {
            mainColumns.push(...element.subHeaders);
        });
        return mainColumns;
    };

    const handleCellDoubleClick = (row) => {
        setSelectedRowData(row);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedRowData({});
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleColumnHeaderClick = (column) => {
        if (sortBy === column.field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column.field);
            setSortOrder("asc");
        }
    };

    const sortedRows = [...props.rows].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else {
            return sortOrder === "asc"
                ? aValue.toString().localeCompare(bValue.toString())
                : bValue.toString().localeCompare(aValue.toString());
        }
    });

    const displayedSecondColumns = isHistoricalDataExpanded
        ? secondColumns
        : secondColumns.filter(col => col.parentHeader !== "Historical Data");

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const visibleRows = sortedRows.slice(startIndex, endIndex);

    React.useEffect(() => {
        setSecondColumns(getMainColumns(props.columns));
    }, []);
    
    return (
        <Box sx={{ width: "100%" }}>
            <TableContainer component={Paper} style={{ borderRadius: 18, boxShadow: "5 4px 24px rgba(0,123,255,0.10)" }}>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHead>
                        <TableRow className={classes.tableHead}>
                            {props.columns.map((col) => (
                                <TableCell key={col.headerName} align="center" colSpan={col.subHeaders.length}>
                                    {/* {col.headerName === "Historical Data" && (
                                        <span
                                            onClick={toggleHistoricalData}
                                            style={{ marginLeft: "5px", cursor: "pointer" }}
                                        >
                                            {isHistoricalDataExpanded ? (
                                                <RemoveCircleOutlineIcon />
                                            ) : (
                                                <AddCircleOutlineIcon />
                                            )}
                                        </span>
                                    )} */}
                                    {col.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow className={classes.tableSubHead}>
                            {displayedSecondColumns.map((col) => (
                                <TableCell
                                    key={col.field}
                                    align="right"
                                    onClick={() => handleColumnHeaderClick(col)}
                                    className={classes.clickableHeader}
                                >
                                    {col.headerName} {sortBy === col.field && (
                                        <span style={{ color: "rgb(0, 0, 0)", fontWeight: 900 }}>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row) => (
                            <Row
                                key={row[props.rowKey]}
                                columns={displayedSecondColumns}
                                row={row}
                                internalColumns={props.internalColumns}
                                colorCell={props.colorCell}
                                onCellDoubleClick={handleCellDoubleClick}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className={classes.pagination}
            />

            {popupOpen &&
                <PopupTable
                    isOpen={popupOpen}
                    onClose={handleClosePopup}
                    data={selectedRowData}
                    columData={props.internalColumns}
                    mutualFundData={props.mutualFundData}
                    updateData={props.updateData}
                    setAddLoader={props.setAddLoader}
                />
            }

        </Box>
    );
};

CustomTableV2.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    internalColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rowKey: PropTypes.string.isRequired,
};

export default CustomTableV2;
