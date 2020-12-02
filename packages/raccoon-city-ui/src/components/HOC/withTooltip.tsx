import React from 'react';
import {Tooltip} from '@material-ui/core';

export function withTooltip(component: JSX.Element, title: string, isNeedToWrap = true) {
    return (
        <Tooltip title={title} placement="bottom">
            {isNeedToWrap ? <div>{component}</div> : component}
        </Tooltip>
    );
}
