import {Grid, Paper} from '@material-ui/core';
import {Svg, SVG} from '@svgdotjs/svg.js';
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {SinglePreviewImage} from '../../../shared/types/layout.types';
import {LevelImageUrlInterface} from '../ChessFloorView/ChessFloor.interfaces';

const ImageContainer = styled.div<any>`
    max-width: 320px;
    background: url(${(props: any) => props.url});
    background-size: cover;
`;

const StyledPaper = styled(Paper)`
    max-width: 320px;
`;

const ImageContainerLarge = styled.div<any>`
    max-width: 650px;
    height: auto;
    background: url(${(props: any) => props.url});
    background-size: cover;
    margin: 0 auto;
`;

const StyledPaperLarge = styled(Paper)`
    width: 100%;
`;

const colors = {
    FREE: '#4caf50',
    SOLD_OUT: '#f44336',
    UNAVAILABLE: '#9e9e9e',
    RESERVED: '#ffeb3b',
    DOCUMENTS_IN_PROGRESS: '#00bcd4',
    BOOKED: '#ffeb3b'
};

interface LayoutViewProps {
    levelLayouts: Array<{
        id: string;
        paths: string[];
        image: SinglePreviewImage;
        viewBox: {width: number; height: number};
    }>;
    isLarge?: boolean;
    floorImage?: LevelImageUrlInterface;
    onSelect?: any;
    setCurrentDataId?: any;
}

function attachSvg(container: string) {
    return SVG()
        .addTo(container)
        .size('100%', '100%');
}

function fillExistingLayouts(
    svgItem: Svg,
    paths: string[],
    viewBox,
    info?: any,
    setCurrentDataId?: any,
    onSelect?: any
) {
    if (info) {
        info.forEach((item, i) => {
            let pathParsed = JSON.parse(paths[i]);

            const path = svgItem
                .viewbox(0, 0, viewBox.width, viewBox.height)
                .path(pathParsed)
                .fill({
                    color: colors[item.status],
                    opacity: 0.5
                })
                .stroke({color: '#3f51b5', width: 3})
                .addClass('SVG--highlighted');

            // eslint-disable-next-line no-useless-computed-key
            path.attr({x: 20, y: 60, ['data-uid']: item.id});

            path.on('mouseover', (e) => {
                setCurrentDataId(e.target.getAttribute('data-uid'));
            });
            path.on('click', (e) => {
                onSelect(item.flatInfo);
            });
        });

        return;
    }

    paths.forEach((pathValue) => {
        let pathParsed = JSON.parse(pathValue);
        const isInfoExist = info ? info.status : null;

        svgItem
            .viewbox(0, 0, viewBox.width, viewBox.height)
            .path(pathParsed)
            .fill({
                color: isInfoExist ? 'red' : '#000',
                opacity: 0.5
            })
            .stroke({color: '#3f51b5', width: 3})
            .addClass('SVG--highlighted');
    });
}

function ImageWithSvg({image, paths, index, viewBox, isLarge, info = null, setCurrentDataId = null, onSelect = null}) {
    const svgRef = useRef<Svg>();

    useEffect(() => {
        svgRef.current = attachSvg(`#img-container__${index}`);

        if (svgRef && svgRef.current) {
            fillExistingLayouts(svgRef.current, paths, viewBox, info, setCurrentDataId, onSelect);
        }

        // eslint-disable-next-line
    }, []);

    if (isLarge) {
        return <ImageContainerLarge id={`img-container__${index}`} url={image.downloadUrl} alt={'layout image'} />;
    }

    return <ImageContainer id={`img-container__${index}`} url={image.downloadUrl} alt={'layout image'} />;
}

export function LayoutView(props: LayoutViewProps) {
    const {levelLayouts, isLarge = false, setCurrentDataId = null, floorImage, onSelect = null} = props;

    if (!levelLayouts) {
        return null;
    }

    const updatedFloor: any = {};

    if (isLarge) {
        updatedFloor.viewBox = levelLayouts[0].viewBox;
        updatedFloor.paths = levelLayouts.reduce((acc: any, item: any) => [...acc, ...item.paths], []);
        updatedFloor.info = levelLayouts.reduce((acc: any, item: any) => {
            return [...acc, {id: item.id, status: item.status, flatInfo: item.flatInfo}];
        }, []);
    }

    return (
        <Grid container spacing={3}>
            {isLarge ? (
                <Grid item xs={12}>
                    <StyledPaperLarge>
                        <ImageWithSvg
                            image={floorImage}
                            paths={updatedFloor.paths}
                            index={0}
                            viewBox={updatedFloor.viewBox}
                            isLarge={true}
                            info={updatedFloor.info}
                            setCurrentDataId={setCurrentDataId}
                            onSelect={onSelect}
                        />
                    </StyledPaperLarge>
                </Grid>
            ) : (
                levelLayouts.map((layout, i) => {
                    return (
                        <Grid item key={layout.id} xs={12}>
                            <StyledPaper>
                                <ImageWithSvg
                                    image={layout.image}
                                    paths={layout.paths}
                                    index={i}
                                    viewBox={layout.viewBox}
                                    isLarge={false}
                                />
                            </StyledPaper>
                        </Grid>
                    );
                })
            )}
        </Grid>
    );
}
