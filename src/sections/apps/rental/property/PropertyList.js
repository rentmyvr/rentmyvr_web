import PropTypes from 'prop-types';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

// next
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  // capitalize,
  Button,
  // Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import PropertyView from 'sections/apps/rental/property/PropertyView';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
// import { getProducts as getProperties } from 'store/reducers/product';
import { fetcher, DIRECTORY_EP, errorProcessor } from 'config';

// assets
import { CloseOutlined, PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'name', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    // allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    // setSortBy
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 5, hiddenColumns: ['image', 'description'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns(['id', 'image', 'description', 'categories', 'offerPrice', 'quantity', 'isStock']);
    } else {
      setHiddenColumns(['image', 'description']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const router = useRouter();

  const handleAddProduct = () => {
    router.push(`/apps/e-commerce/add-product`);
  };

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            {/* <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} /> */}
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddProduct}>
              Add Property
            </Button>
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell key={index} {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  renderRowSubComponent: PropTypes.any
};

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const PropertyList = ({ properties = [] }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [data, setData] = useState(properties);
  // const [bookedSpace, setBookedSpace] = useState({});
  // const [types, setTypes] = useState({});

  const bookedSpace = {
    'entire-house': 'Entire House',
    'private-room': 'Private Room',
    'casita-sep-guest-quarters': 'Casita/Sep Guest Quarters'
  };
  const roomTypes = {
    'bedroom': 'Bedroom',
    'casita': 'Casita',
    'den': 'Den',
    'office': 'Office',
    'living-room': 'Living Room',
    'family-room': 'Family Room',
    'loft': 'Loft',
    'studio': 'Studio'
  };
  const sleeperTypes = {
    'king-bed': 'King Bed',
    'queen-bed': 'Queen Bed',
    'double-bed': 'Double Bed',
    'twin-single-bed': 'Twin/Single Bed',
    'futon': 'Futon',
    'sofa-sleeper': 'Sofa Sleeper',
    'cot': 'Cot',
    'trundle': 'Trundle',
    'bunk-bed': 'Bunk Bed',
    'air-mattress-floor-mattress': 'Air Mattress/Floor Mattress'
  };
  const types = {
    'barn': 'Barn',
    'bed-and-breakfast': 'Bed and Breakfast',
    'boat': 'Boat',
    'bungalow': 'Bungalow',
    'bus': 'Bus',
    'cabin': 'Cabin',
    'camper': 'Camper',
    'caravan': 'Caravan',
    'casa-particulars': 'Casa Particulars',
    'castle': 'Castle',
    'cave': 'Cave',
    'chalet': 'Chalet',
    'condo': 'Condo',
    'cottage': 'Cottage',
    'country-house': 'Country House',
    'cycladic': 'Cycladic',
    'damusi': 'Damusi',
    'earth-home': 'Earth Home',
    'estate': 'Estate',
    'farm-house': 'Farm House',
    'guest-house': 'Guest House',
    'hanok': 'Hanok',
    'historic-home': 'Historic Home',
    'hotel': 'Hotel',
    'house': 'House',
    'houseboat': 'Houseboat',
    'lodge': 'Lodge',
    'minsus': 'Minsus',
    'resort': 'Resort',
    'riad': 'Riad',
    'ryokan': 'Ryokan',
    'shepherds-hut': "Shepherd's Hut",
    'specialty': 'Specialty',
    'studio': 'Studio',
    'tent': 'Tent',
    'tiny-home': 'Tiny Home',
    'tower': 'Tower',
    'townhouse': 'Townhouse',
    'train-car': 'Train Car',
    'treehouse': 'Treehouse',
    'trulli': 'Trulli',
    'villa': 'Villa',
    'windmill': 'Windmill',
    'yacht': 'Yacht',
    'yurt': 'Yurt'
  };

  //   const { properties } = useSelector((state) => state.property);

  useEffect(() => {
    // eslint-disable-next-line
    fetcher(DIRECTORY_EP.PROPERTY_FIXED_ITEMS, 'get', session, null, null, res => {
        console.log('---11----', res.data);
        let dd = res.data['sleeper_types'].reduce((acc, cur) => {
          acc[cur[0]] = cur[1];
          return acc;
        }, {});
        console.log('sleeper_types====');
        console.log(dd);

      },
      (err) => {
        errorProcessor(err, () => {}, dispatch, openSnackbar);
      }
    );

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (properties.length === 0) {
      // eslint-disable-next-line
      fetcher(DIRECTORY_EP.PROPERTY_LIST, 'get', session, null, null, res => {
          console.log('----22---', res.data);
          setData(res.data);
        },
        (err) => {
          errorProcessor(err, () => {}, dispatch, openSnackbar);
        }
      );
    }
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(
    () => [
      // {
      //   title: 'Row Selection',
      //   // eslint-disable-next-line
      //   Header: ({ getToggleAllPageRowsSelectedProps }) => <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />,
      //   accessor: 'selection',
      //   // eslint-disable-next-line
      //   Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
      //   disableSortBy: true
      // },
      {
        Header: 'ID',
        accessor: 'ref',
        className: 'cell-center'
      },
      {
        Header: 'Name',
        accessor: 'name',
        // eslint-disable-next-line
        Cell: ({ row }) => {
          // eslint-disable-next-line
          const { name, logo, hosted_by } = row.original;
          // console.log(row.original);
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar variant="rounded" alt={name} color="secondary" size="sm" src={!logo ? 'prod-11.png' : name} />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {hosted_by}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Type',
        accessor: (row) => types[row.type],
        disableSortBy: false
      },
      {
        Header: 'Space',
        accessor: (row) => bookedSpace[row.space]
      },
      // {
      //   Header: 'Hosted By',
      //   accessor: 'hosted_by'
      // },
      {
        Header: 'Description',
        accessor: 'description'
      },
      // {
      //   Header: 'Categories',
      //   accessor: 'categories',
      //   // eslint-disable-next-line
      //   Cell: ({ value }) => (
      //     <Stack direction="row" spacing={0.25}>
      //       {/* eslint-disable-next-line */}
      //       {value.map((item, index) => (
      //         <Typography variant="h6" key={index}>
      //           {capitalize(item)}
      //           {/* eslint-disable-next-line */}
      //           {value.length > index + 1 ? ',' : ''}
      //         </Typography>
      //       ))}
      //     </Stack>
      //   )
      // },
      {
        Header: 'Room/Sleeper Type',
        accessor: (row) => roomTypes[row.room_type],
        className: 'cell-right',
        // eslint-disable-next-line
        Cell: ({ row }) => {
          // eslint-disable-next-line
          const { room_type, sleeper_type } = row.original;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{roomTypes[room_type]}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {sleeperTypes[sleeper_type]}
                </Typography>
              </Stack>
            </Stack>
          );
        }
        // // eslint-disable-next-line
        // Cell: ({ value }) => <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" />
      },
      // {
      //   Header: 'Sleeper Type',
      //   accessor: 'sleeper_type',
      //   className: 'cell-right'
      //   // // eslint-disable-next-line
      //   // Cell: ({ value }) => <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" />
      // },
      {
        Header: '$/Night',
        accessor: 'price_night',
        className: 'cell-right',
        // eslint-disable-next-line
        Cell: ({ value }) => <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" />
      },
      {
        Header: 'Contact',
        accessor: 'email',
        className: 'cell-right',
        // eslint-disable-next-line
        Cell: ({ row }) => {
          // eslint-disable-next-line
          const { email, phone } = row.original;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{email}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {phone}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      // {
      //   Header: 'Phone',
      //   accessor: 'phone',
      //   className: 'cell-right'
      // },
      // {
      //   Header: 'Status',
      //   accessor: 'isStock',
      //   // eslint-disable-next-line
      //   Cell: ({ value }) => (
      //     <Chip color={value ? 'success' : 'error'} label={value ? 'In Stock' : 'Out of Stock'} size="small" variant="light" />
      //   )
      // },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        // eslint-disable-next-line
        Cell: ({ row }) => {
          // eslint-disable-next-line
          const collapseIcon = row.isExpanded ? (
            <CloseOutlined style={{ color: theme.palette.error.main }} />
          ) : (
            <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
          );
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    // eslint-disable-next-line
                    row.toggleRowExpanded();
                  }}
                >
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }) => <PropertyView data={properties[row.id]} />, [properties]);

  return (
    <Page title="Property List">
      <MainCard content={false}>
        <ScrollX>
          <ReactTable
            columns={columns}
            data={data}
            getHeaderProps={(column) => column.getSortByToggleProps()}
            renderRowSubComponent={renderRowSubComponent}
          />
        </ScrollX>
      </MainCard>
    </Page>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.array
};

PropertyList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PropertyList;
