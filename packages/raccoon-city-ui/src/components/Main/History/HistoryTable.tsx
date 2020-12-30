import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_HISTORY_EVENTS} from '../../../graphql/queries/userQuery';
import {useParams} from 'react-router-dom';
import {HistoryTypesLabels} from '../../../hooks/useSaveEvent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

interface HistoryTableProps {
    page: number;
    handlePaginationChange: any;
}

export const HistoryTable = (props: HistoryTableProps) => {
    const {page, handlePaginationChange} = props;
    const {developerUuid} = useParams() as any;
    const {data, loading, error} = useQuery(GET_HISTORY_EVENTS, {
        variables: {
            developer: developerUuid,
            page
        }
    });

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    const {
        getHistoryEvents: {historyEventsRes: history, historyPageAmount}
    } = data;

    if (!history.length) {
        return <div>История пуста</div>;
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="history_table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Дата</TableCell>
                            <TableCell align="left">Имя</TableCell>
                            <TableCell align="left">Роль</TableCell>
                            <TableCell align="left">Событие</TableCell>
                            <TableCell align="left">Новый статус</TableCell>
                            <TableCell align="left">Квартира</TableCell>
                            <TableCell align="left">ЖК</TableCell>
                            <TableCell align="left">Адрес</TableCell>
                            <TableCell align="left">Секция</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map(({id, date, user, eventType, payload}) => {
                            const {flatNumber, complexName, complexAddress, sectionName, newStatus} = JSON.parse(
                                payload
                            );

                            return (
                                <TableRow key={id}>
                                    <TableCell align="left">{date}</TableCell>
                                    <TableCell align="left">{user.name}</TableCell>
                                    <TableCell align="left">{user?.role.displayName}</TableCell>
                                    <TableCell align="left">{HistoryTypesLabels[eventType]}</TableCell>
                                    <TableCell align="left">{newStatus.label}</TableCell>
                                    <TableCell align="left">{flatNumber}</TableCell>
                                    <TableCell align="left">{complexName}</TableCell>
                                    <TableCell align="left">{complexAddress}</TableCell>
                                    <TableCell align="left">{sectionName}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                count={historyPageAmount}
                shape="rounded"
                onChange={(event, page) => handlePaginationChange(page)}
                page={page}
            />
        </div>
    );
};
