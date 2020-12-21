import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {format, parseISO} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import * as React from 'react';
import styled from 'styled-components';
import {ApartmentComplexType} from '../../../../shared/types/apartmentComplex.types';
import {apartmentComplex} from './../../../../../../../raccoon-city-graphql/src/resolvers/queries/apartmentComplex.resolver';

export const TypographyWithFont = styled.span`
    font-family: 'TTNorms', sans-serif;
    font-weight: 600;
    color: #000;
    @media only screen and (max-width: 600px) {
        font-weight: 400;
        color: #636363;
    }
`;
interface ApartmentComplexDataProps {
    apartmentComplex: ApartmentComplexType;
}

function getTableRows(props: any) {
    const privateFields = [
        {
            key: 'beginDate',
            label: 'Начало строительства',
            value: format(parseISO(props.apartmentComplex.beginDate), 'MM yyyy', {
                locale: ruLocale
            })
        },
        {
            key: 'endDate',
            label: 'Конец строительства',
            value: !!props.apartmentComplex.endDate
                ? format(parseISO(props.apartmentComplex.endDate), 'MM yyyy', {
                      locale: ruLocale
                  })
                : 'Не определено'
        }
    ];
    const commonFields = [
        {
            key: 'type',
            label: 'Тип объекта',
            value: props.apartmentComplex.type.displayName
        },
        {
            key: 'name',
            label: 'Название',
            value: props.apartmentComplex.name
        },
        {
            key: 'city',
            label: 'Город',
            value: props.apartmentComplex.city.displayName
        },
        {
            key: 'district',
            label: 'Район',
            value: props.apartmentComplex.district.displayName
        },
        {
            key: 'undergroundStation',
            label: 'Метро',
            value: props.undergroundStation ? props.undergroundStation.displayName : 'не определено'
        },
        {
            key: 'class',
            label: 'Класс',
            value: props.apartmentComplex.class.displayName
        },
        {
            key: 'levels',
            label: 'Этажность',
            value: props.apartmentComplex.levels
        },
        {
            key: 'sections',
            label: 'Количество секций',
            value: props.apartmentComplex.sections
        },
        {
            key: 'address',
            label: 'Строительный адрес',
            value: props.apartmentComplex.address
        }
    ];

    if (props.isPublic) {
        return commonFields;
    } else {
        return commonFields.concat(privateFields);
    }
}

export function ApartmentComplexData(props: any) {
    const rows = getTableRows(props);
    return (
        <Table aria-label="simple table">
            <TableBody>
                {rows.map((row) => {
                    return (
                        <TableRow key={row.key}>
                            <TableCell component="th" scope="row">
                                <Typography variant="body2" component="p">
                                    <TypographyWithFont>{row.label}</TypographyWithFont>
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body2" component="p">
                                    <TypographyWithFont>{row.value}</TypographyWithFont>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
