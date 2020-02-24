/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import { Spinner } from '@theme-ui/components';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';

/*TODO:
- Doesn't seem to be hooked up to theme
*/

const PopupActionsMenu = ({ feature, popupActions }) => {
  const [loading, setLoading] = useState(false);

  if (popupActions && popupActions.length > 0) {
    return (
      <Menu className="cl-popup-action-menu">
        <MenuButton
          sx={{
            color: 'text',
            bg: 'white', //why does theme 'background' not work?
            borderStyle: 'none',
            fontSize: 1,
            float: 'right'
          }}
        >
          {(loading) ? <Spinner size={14} /> : '...'}
        </MenuButton>
        <MenuPopover sx={{ zIndex: 3, fontFamily: 'roboto, sans-serif' }}>
          {' '}
          {/* why is fontFamily:'body' not working? */}
          <MenuItems>
            {popupActions.map(action => {
              return (
                <MenuItem
                  key={action.title}
                  onSelect={() => {
                    action.action(feature, setLoading);
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
