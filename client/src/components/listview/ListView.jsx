import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid';
import { getColumns } from '../../utils/utils';
import { LinearProgress } from '@mui/material';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import DeleteIcon from '@mui/icons-material/Delete';
import { SpeedDialIcon } from '@mui/material';

const ListView = ({ module, records, fetching, loading, onClickAdd, onClickRecord }) => {
    const [selection, setSelection] = useState([]);

    const onAddRecord = () => {
        setSelection([]);
        onClickAdd()
    }

    const onDeleteSelection = () => {
        if (!selection.length) {
            alert('Please select at least one record');

            return;
        }

        const recordsToDelete = records.filter((record) => selection.includes(record.id));

        console.log('recordsToDelete', recordsToDelete);

        setSelection([]);
    }

    const actions = [
        // { icon: <AddIcon />, name: 'Add', onClick: onClickAdd },
        { icon: <DeleteIcon />, name: 'Delete', onClick: onDeleteSelection },
    ];

    return (
        <>
            {false ? '' :
                <div style={{ position:'relative', height: '80%', width: '100%' }}>
                    <DataGrid
                        sx={{
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-row:hover': {
                                cursor: 'pointer',
                            },
                            '& .MuiDataGrid-cell:focus-within': {
                                outline: 'none !important',
                            },
                            '& .MuiDataGrid-root': {
                                outline: 'none !important',
                            },
                        }}
                        rows={fetching ? [] : records}
                        columns={getColumns(module)}
                        pageSize={25}
                        checkboxSelection
                        disableSelectionOnClick
                        onSelectionModelChange={(model) => setSelection(model)}
                        selectionModel={selection}
                        // onRowClick={onClickRecord}
                        hideFooterSelectedRowCount
                        components={{
                            NoRowsOverlay: () => (!fetching && !records.length) ? 'no rows' : '',
                            LoadingOverlay: LinearProgress,
                        }}
                        loading={loading}
                    />
                    <SpeedDial
                        ariaLabel='Add modal action button'
                        sx={{ position: 'absolute', bottom: -10, left: -10 }}
                        icon={ <SpeedDialIcon icon={ <KeyboardArrowRightIcon /> } openIcon={ <AddIcon /> } onClick={onAddRecord} /> }
                        direction='right'
                    >
                        {actions.map(action => (
                            <SpeedDialAction 
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={action.onClick}
                            />
                        ))}
                    </SpeedDial>
                </div>
            }
        </>
    );
}

export default ListView;