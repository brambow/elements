/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';

const PopupActionsMenu = ({ popupActions }) => {
  console.log(popupActions);
  if (popupActions && popupActions.length > 0) {
    return (
      <Menu className="cl-popup-action-menu">
        <MenuButton
          sx={{
            color: 'text',
            bg: 'background',
            borderStyle: 'none',
            fontSize: 1
          }}
        >
          ...
        </MenuButton>
        <MenuPopover sx={{ zIndex: 3, fontFamily: 'body' }}>
          <MenuItems>
            {popupActions.map(action => {
              return (
                <MenuItem
                  key={action.title}
                  onSelect={() => {
                    action.action();
                  }}
                >
                  {action.title}
                </MenuItem>
              );
            })}
          </MenuItems>
        </MenuPopover>
      </Menu>
    );
  } else return null;
};

export default PopupActionsMenu;
