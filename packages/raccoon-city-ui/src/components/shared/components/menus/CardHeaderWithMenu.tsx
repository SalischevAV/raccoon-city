import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import {Fragment} from 'react';

export function CardHeaderWithMenu(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <CardHeader
            title={props.title}
            action={
                <Fragment>
                    <IconButton aria-label="settings" onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                    {!!React.Children.count(props.children) && (
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted={true}
                            open={menuOpen}
                            onClose={handleClose}
                        >
                            {props.children}
                        </Menu>
                    )}
                </Fragment>
            }
        />
    );
}
