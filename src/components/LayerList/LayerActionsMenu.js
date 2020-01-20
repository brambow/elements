/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';

const LayerActionsMenu = ({ layerActions }) => {
  return (
    <Menu>
      <MenuButton sx={{ bg: 'background' }}>...</MenuButton>
      <MenuPopover sx={{ zIndex: 3 }}>
        <MenuItems>
          {layerActions.map(action => {
            return (
              <MenuItem
                // sx={{ zIndex: 2 }}
                onClick={() => {
                  action.action;
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
};

export default LayerActionsMenu;
