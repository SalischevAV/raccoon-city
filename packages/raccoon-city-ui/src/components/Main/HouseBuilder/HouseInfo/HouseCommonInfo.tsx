import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {format, parseISO} from 'date-fns';
import * as React from 'react';
import ruLocale from 'date-fns/locale/ru';

export const getDateFromFullString = (date: any) => {
    if (date) {
        try {
            return format(parseISO(date), 'MM yyyy', {locale: ruLocale});
        } catch (e) {
            return 'Не определено';
        }
    } else return 'Не определено';
};

export function HouseCommonInfo({name, price, parking, beginDate, endDate, visibleInCarousel, isPublic}) {
    return (
        <Table aria-label="simple table">
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                        <Typography variant="body2" component="p">
                            Название дома
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="body2" component="p">
                            {name ? name : 'не определено'}
                        </Typography>
                    </TableCell>
                </TableRow>
                {!isPublic && (
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="body2" component="p">
                                Стоимость квартир в доме
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" component="p">
                                {price ? price : 'не определено'}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell component="th" scope="row">
                        <Typography variant="body2" component="p">
                            Парковка
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="body2" component="p">
                            {parking ? 'Есть' : 'Нет'}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        <Typography variant="body2" component="p">
                            Начало строительства
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="body2" component="p">
                            {beginDate ? getDateFromFullString(beginDate) : 'не определено'}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        <Typography variant="body2" component="p">
                            Окончание строительства
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="body2" component="p">
                            {endDate ? getDateFromFullString(endDate) : 'не определено'}
                        </Typography>
                    </TableCell>
                </TableRow>
                {!isPublic && (
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="body2" component="p">
                                Виден в разметке
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" component="p">
                                {visibleInCarousel ? 'да' : 'нет'}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
