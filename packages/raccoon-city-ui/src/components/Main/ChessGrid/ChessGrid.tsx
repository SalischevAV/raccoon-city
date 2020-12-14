import {useQuery} from '@apollo/react-hooks';
import React, {useEffect, useReducer, useState} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {APARTMENT_COMPLEX_INFO} from '../../../graphql/queries/apartmentComplexQuery';
import {
    FlatsInHouse,
    GET_FLAT_LIST,
    GET_GROUPED_FLATS_CHESSGRID,
    GET_PUBLIC_FLATS_LIST,
    GET_PUBLIC_GROUPED_FLATS_CHESSGRID,
    GetGroupedFlatsBySectionQuery,
    GroupedFlats,
    PUBLISHED_HOUSE_INFO
} from '../../../graphql/queries/houseQuery';
import {setRouteParams, setTitle} from '../../../redux/actions';
import {Flat} from '../../shared/types/flat.types';
import {House} from '../../shared/types/house.types';
import {ChessCellViewMode, ViewModeValues} from './ChessEnums';
import {ChessFloorView} from './ChessFloorView/ChessFloorView';
import {getInitialState, reducer} from './ChessGrid.reducer';
import {
    ChessGridWrapper,
    ColumnAndSectionBarWrapper,
    ColumnWrapper,
    Container,
    HouseTitle,
    MobileInformation,
    SidebarDrawer,
    ScrollWrapper
} from './ChessGrid.styled';
import {showMutedFlats} from './ChessGrid.utils';
import {ChessGridAnimation} from './ChessGridAnimation/ChessGridAnimation';
import {ChessGridColumn} from './ChessGridColumn/ChessGridColumn';
import {ChessGridFiltersDrawer, ShowFilter} from './ChessGridFiltersDrawer/ChessGridFiltersDrawer';
import {ChessListView} from './ChessListView/ChessListView';
import {ChessSideBar} from './ChessSideBar';
import {PublicLink} from './PublicLink/PublicLink';
import {SectionBar} from './SectionBar/SectionBar';
import {ViewModeSelectorMobile, MobileInfoPanel} from './MobileViewMode';

export const ViewModeContext = React.createContext({selectedViewMode: ViewModeValues.AREA});
export const CellViewModeContext = React.createContext({mode: ChessCellViewMode.TILE});

export const InternalCustomSidebarDrawer = styled<any>(SidebarDrawer)`
    .MuiAppBar-root .MuiTab-wrapper path {
        fill: #fff;
    }
`;

export const CustomSidebarDrawer = styled<any>(SidebarDrawer)`
    .MuiPaper-elevation4 {
        box-shadow: none;
    }

    .MuiAppBar-colorPrimary {
        background-color: transparent;
    }

    .PrivateTabIndicator-colorSecondary-42 {
        background-color: #fff;
    }

    .MuiTabs-flexContainer {
        box-shadow: none;
    }

    .MuiAppBar-root {
        margin-top: 10px;
        padding: 0 18px;
    }

    .MuiTab-root {
        width: 40px;
        height: 40px;
        min-height: 40px;
    }

    .MuiAppBar-root .MuiTouchRipple-root {
        border: 1px solid #000;
        border-radius: 10px;
        margin: 0 5px;
    }

    .MuiAppBar-root .MuiTab-wrapper {
        font-size: 12px;
        color: #000;
    }

    .Mui-selected .MuiTab-wrapper {
        color: #e84f1d;

        svg {
            width: 20px;
        }

        path {
            fill: #e84f1d;
        }
    }

    .Mui-selected .MuiTouchRipple-root {
        border-color: #e84f1d;
    }

    .MuiTabs-indicator {
        display: none;
    }

    @media only screen and (max-width: 600px) {
        .MuiTabs-flexContainer {
            justify-content: center;
        }
    }
`;

const ChessGridContent = React.memo((props: any) => {
    const {
        filters,
        data,
        loading,
        listLoading,
        error,
        listError,
        hasSelect,
        isPublic,
        onFlatSelected,
        showRequestButton,
        listData,
        houseId,
        setSavedFlat,
        savedFlat
    } = props;

    const [flatCardOpen, setFlatCardOpen] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(false);
    const [selectedFlat, setSelectedFlat] = useState<Flat>();
    const [currentLevel, setCurrentLevel] = useState<string>();

    const SideBar = isPublic ? CustomSidebarDrawer : InternalCustomSidebarDrawer;

    if (loading || listLoading) {
        return <ChessGridAnimation />;
    }

    if (error || listError) {
        return <ChessGridWrapper>Error :(</ChessGridWrapper>;
    }

    if (!data || !listData) {
        return null;
    }

    const houseFlats: FlatsInHouse[] = data?.getGroupedFlatsBySection.houseFlats;

    if (!houseFlats || houseFlats.length === 0) {
        return null;
    }

    const {getPublicFlatsList, getFlatsList} = listData;
    const listFlats: Flat[] = getFlatsList ? getFlatsList : getPublicFlatsList;

    const selectFlat = (flat: Flat) => {
        setSelectedFlat(flat);
        setFlatCardOpen(true);
    };

    // TODO divide to views component
    const tileView = (
        <ChessGridWrapper hasSelect={hasSelect}>
            {houseFlats.map((group: FlatsInHouse) => {
                const {groupedFlats} = group;

                if (!groupedFlats || (groupedFlats && groupedFlats.length === 0)) {
                    return null;
                }

                return (
                    <Container key={group.id}>
                        <ColumnAndSectionBarWrapper isPublic={isPublic} mode={filters.mode}>
                            <ColumnWrapper>
                                {showMutedFlats(groupedFlats, filters, isPublic).map((item: GroupedFlats) => {
                                    return (
                                        <ChessGridColumn
                                            key={item.id}
                                            columnName={item.section}
                                            levels={item.levels}
                                            onSelect={selectFlat}
                                            savedFlat={savedFlat}
                                        />
                                    );
                                })}
                            </ColumnWrapper>
                        </ColumnAndSectionBarWrapper>
                        {isPublic && filters.mode === ChessCellViewMode.TILE && (
                            <SectionBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
                        )}
                    </Container>
                );
            })}
        </ChessGridWrapper>
    );

    // TODO divide to views component
    const chessViews = {
        [ChessCellViewMode.FLOOR]: (
            <>
                {!houseFlats.length ? (
                    <div>Дома не найдены</div>
                ) : (
                    <>
                        <ChessFloorView
                            setCurrentLevel={setCurrentLevel}
                            filters={filters}
                            onSelect={selectFlat}
                            houseFlats={houseFlats}
                            isPublic={isPublic}
                        />

                        <MobileInformation>
                            {isPublic && <SectionBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />}
                        </MobileInformation>
                    </>
                )}
            </>
        ),
        [ChessCellViewMode.LIST]: <ChessListView listData={listFlats} filters={filters} onSelect={selectFlat} />,
        [ChessCellViewMode.TILE]: tileView,
        [ChessCellViewMode.TILE_PLUS]: tileView
    };

    return (
        <ViewModeContext.Provider value={filters}>
            {chessViews[filters.mode]}

            {flatCardOpen && (
                <ChessSideBar
                    SideBar={SideBar}
                    selectedFlat={selectedFlat}
                    isPublic={isPublic}
                    showRequestButton={showRequestButton}
                    onFlatSelected={onFlatSelected}
                    setFlatCardOpen={setFlatCardOpen}
                    setSelectedFlat={setSelectedFlat}
                    flatCardOpen={flatCardOpen}
                    houseId={houseId}
                    setSavedFlat={setSavedFlat}
                    viewMode={filters.mode}
                    currentLevel={currentLevel}
                />
            )}

            <MobileInfoPanel houseId={houseId} setSideBarOpen={setSideBarOpen} />
        </ViewModeContext.Provider>
    );
});

function FilterIcon({setShownFilters, id}) {
    const elem = document.getElementById(id);
    if (!elem) {
        return null;
    }
    return ReactDOM.createPortal(<ShowFilter setShownFilters={setShownFilters} />, elem);
}

function ComplexHouseName() {
    const {apartmentComplexUuid, houseUuid} = useParams();

    const {loading: houseLoading, error: houseError, data: houseData} = useQuery(PUBLISHED_HOUSE_INFO, {
        fetchPolicy: 'cache-and-network',
        variables: {
            uuid: houseUuid
        }
    });

    const {loading: apartmentComplexLoading, error: apartmentComplexError, data: apartmentComplexData} = useQuery(
        APARTMENT_COMPLEX_INFO,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                uuid: apartmentComplexUuid
            }
        }
    );

    if (!apartmentComplexUuid || !houseUuid) {
        return null;
    }

    if (houseLoading || apartmentComplexLoading) {
        return <div>Loading</div>;
    }

    if (houseError || apartmentComplexError) {
        return <div>Error :(</div>;
    }

    const houseName = houseData?.getPublishedHouse?.name || '';
    const apartmentComplex = apartmentComplexData?.getApartmentComplex?.name || '';

    return <HouseTitle>{`${apartmentComplex} ${houseName}`}</HouseTitle>;
}

export const ChessGridComponent = ({uuid, hasSelect, isPublic, showRequestButton, onFlatSelected, filterId}) => {
    const [isMounted, setMounted] = useState(false);
    const [filterShown, setShownFilters] = useState(!!hasSelect);
    // TODO rename id to ids or something like this
    const [id, setId] = useState(uuid ? [uuid] : []);
    const [filters, dispatch] = useReducer(reducer, getInitialState(isPublic));
    const [savedFlat, setSavedFlat] = useState();

    const QUERY = isPublic ? GET_PUBLIC_GROUPED_FLATS_CHESSGRID : GET_GROUPED_FLATS_CHESSGRID;
    const QUERY_LIST = isPublic ? GET_PUBLIC_FLATS_LIST : GET_FLAT_LIST;

    const {data, error, loading} = useQuery<GetGroupedFlatsBySectionQuery>(QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            uuid: id
        },
        skip: id.length === 0
    });

    const {data: listData, error: listError, loading: listLoading} = useQuery<any>(QUERY_LIST, {
        fetchPolicy: 'cache-and-network',
        variables: {
            uuid: id
        },
        skip: id.length === 0
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    let onHouseChange;
    if (hasSelect) {
        onHouseChange = async (houses: House[]) => {
            if (houses) {
                setId(houses.map((h) => h.id));
            } else {
                setId([]);
            }
        };
    }

    return (
        <ScrollWrapper>
            {isPublic && <ComplexHouseName />}

            <CellViewModeContext.Provider value={filters}>
                <ViewModeSelectorMobile dispatchFn={dispatch} filters={filters} />

                <ChessGridFiltersDrawer
                    filters={filters}
                    filterShown={filterShown}
                    setShownFilters={setShownFilters}
                    dispatchFn={dispatch}
                    data={id.length === 0 ? null : data}
                    onHouseChange={onHouseChange}
                    isPublic={isPublic}
                    houseId={id}
                />
            </CellViewModeContext.Provider>

            <div>{!isPublic && <PublicLink />}</div>

            <CellViewModeContext.Provider value={filters}>
                <ChessGridContent
                    hasSelect={hasSelect}
                    filters={filters}
                    loading={loading}
                    listLoading={listLoading}
                    error={error}
                    listError={listError}
                    onFlatSelected={onFlatSelected}
                    isPublic={isPublic}
                    showRequestButton={showRequestButton}
                    data={id.length === 0 ? null : data}
                    listData={id.length === 0 ? null : listData}
                    houseId={id}
                    setSavedFlat={setSavedFlat}
                    savedFlat={savedFlat}
                />
            </CellViewModeContext.Provider>

            {isMounted && <FilterIcon setShownFilters={setShownFilters} id={filterId} />}
        </ScrollWrapper>
    );
};

const ChessGrid = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, hasSelect, applyTitle, isPublic, onFlatSelected, filterId, showRequestButton}) => {
    const params: any = useParams();
    const {houseUuid} = params;

    useEffect(() => {
        applyParams(params);
        applyTitle('Шахматка');
    }, [params]); // eslint-disable-line

    const filterBlockId = filterId || 'chessGridFilterContainer';

    return (
        <ChessGridComponent
            uuid={houseUuid}
            hasSelect={hasSelect}
            isPublic={isPublic}
            filterId={filterBlockId}
            showRequestButton={showRequestButton}
            onFlatSelected={onFlatSelected}
        />
    );
});

export default ChessGrid;
