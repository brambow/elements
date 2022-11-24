/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { Spinner } from 'theme-ui';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';

/* TODO:
- Doesn't seem to be hooked up to theme
*/

const PopupActionsMenu = ({ feature, popupActions }) => {
  const [loading, setLoading] = useState(false);

  if (popupActions && popupActions.length > 0) {
    return (
      <Menu className="cl-popup-action-menu">
        <MenuButton
          className="cl-popup-action-menu-btn"
          sx={{
            marginTop: 2,
            color: 'text',
            bg: 'white', // why does theme 'background' not work?
            borderColor: '#ebecf0',
            borderStyle: 'solid',
            borderRadius: 4,
            fontSize: 1,
            float: 'right',
            ':hover': {
              cursor: 'pointer',
              bg: 'highlight'
            }
          }}
        >
          {loading ? <Spinner size={14} /> : '...'}
        </MenuButton>
        <MenuPopover sx={{ zIndex: 3, fontFamily: 'roboto, sans-serif' }}>
          {' '}
          {/* why is fontFamily:'body' not working? */}
          <MenuItems>
            {popupActions.map((action) => {
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
  }
  return null;
};

export default PopupActionsMenu;
