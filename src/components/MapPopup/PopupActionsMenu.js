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

/*TODO:
- Doesn't seem to be hooked up to theme
*/

const PopupActionsMenu = ({ popupActions }) => {
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
          ...
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
