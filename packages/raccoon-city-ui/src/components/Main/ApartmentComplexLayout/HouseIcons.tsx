import React from 'react';
import {useMediaQuery, useTheme} from '@material-ui/core';
import HouseIcon from './HouseIcon';
import {HouseChooseContainer, StyledCarousel} from './styledComponents';

function HouseIcons({data, hoveredHouse, setHoveredHouse}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const layoutLength = data.getApartmentComplexLayout.layouts.length;

    const maxItemsToScreen = matches ? 5 : 10;

    const HouseIconContainer = (layout) => (
        <HouseIcon
            key={layout.house.id}
            house={layout.house}
            hoveredItem={hoveredHouse}
            setHoveredItem={setHoveredHouse}
        />
    );
    const {layouts} = data.getApartmentComplexLayout;

    if (maxItemsToScreen < layoutLength) {
        const isItemToShow = layoutLength >= maxItemsToScreen ? maxItemsToScreen : layoutLength;

        return (
            <HouseChooseContainer>
                <StyledCarousel itemsToShow={isItemToShow}>
                    {layouts
                        .sort((a, b) => {
                            return a.house.order - b.house.order;
                        })
                        .filter((layout) => layout.house.visibleInCarousel)
                        .map((layout) => {
                            return HouseIconContainer(layout);
                        })}
                </StyledCarousel>
            </HouseChooseContainer>
        );
    }

    return (
        <HouseChooseContainer>
            {layouts
                .sort((a, b) => {
                    return a.house.order - b.house.order;
                })
                .map((layout) => {
                    return HouseIconContainer(layout);
                })}
        </HouseChooseContainer>
    );
}

export default HouseIcons;
