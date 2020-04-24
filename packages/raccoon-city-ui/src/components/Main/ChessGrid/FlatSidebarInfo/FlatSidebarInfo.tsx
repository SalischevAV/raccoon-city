import {useQuery} from '@apollo/react-hooks';
import {AppBar, Tab, Tabs} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import InfoIcon from '@material-ui/icons/Info';
import PrintIcon from '@material-ui/icons/Print';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import React from 'react';
import styled from 'styled-components';
import {GET_FLAT_SIDEBAR_DATA, GetFlatSidebarDataQuery} from '../../../../graphql/queries/flatQuery';
import {TabPanel} from '../../../shared/components/tabs/TabPanel';
import {Flat} from '../../../shared/types/flat.types';
import {FlatSidebarData} from './FlatSidebarData';
import {ImageViewPhotos} from './ImageViewPhotos';
import {ImageViewVR} from './ImageViewVR';
import {LayoutView} from './LayoutView';
import {SidebarPdfInfo} from './SidebarPdfInfo';
import {ImageType} from '../../../shared/types/apartmentComplex.types';

const FlatSidebarWrapper = styled.div`
    padding: 16px;
    width: 420px;
`;

const ImageContainer = styled.div`
    max-width: 420px;
    .FlatSidebarInfo__image {
        width: 100%;
    }
`;

interface FlatSidebarInfoProps {
    flat: Flat;
}

const StyledTab = styled(Tab)`
    min-width: 48px !important;
`;
export function FlatSidebarInfo(props: FlatSidebarInfoProps) {
    const {data, loading, error} = useQuery<GetFlatSidebarDataQuery>(GET_FLAT_SIDEBAR_DATA, {
        variables: {
            flatId: props.flat.id
        }
    });
    const [value, setValue] = React.useState(0);

    if (loading || !data) {
        return <span>loading</span>;
    }

    if (error) {
        return <span>error</span>;
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const flat = data.getFlatSidebarInfo;
    return (
        <FlatSidebarWrapper>
            {flat.layout && (
                <ImageContainer>
                    <img
                        className="FlatSidebarInfo__image"
                        src={flat.layout?.image.previewImageUrl}
                        alt={flat.layout?.name}
                    />
                </ImageContainer>
            )}
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable prevent tabs example"
                >
                    <StyledTab icon={<InfoIcon />} aria-label="phone" />
                    <StyledTab icon={<ThreeDRotationIcon />} aria-label="3d" />
                    <StyledTab icon={<ThreeSixtyIcon />} aria-label="2d" />
                    <StyledTab icon={<ImageIcon />} aria-label="gallery" />
                    <StyledTab icon={<ViewCompactIcon />} aria-label="layout" />
                    <StyledTab icon={<PrintIcon />} aria-label="print" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {value === 0 && <FlatSidebarData flat={flat} />}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {value === 1 && <ImageViewVR images={flat.layout?.images?.VR} mode={ImageType.VR} />}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {value === 2 && <ImageViewVR images={flat.layout?.images?.HALF_VR} mode={ImageType.HALF_VR} />}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {value === 3 && <ImageViewPhotos images={flat.layout?.images?.PHOTO} />}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {value === 4 && <LayoutView levelLayouts={flat.levelLayouts} />}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {value === 5 && <SidebarPdfInfo flat={flat} />}
            </TabPanel>
        </FlatSidebarWrapper>
    );
}
