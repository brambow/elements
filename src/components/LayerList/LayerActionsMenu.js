/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  Menu,
  // MenuList,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';

const LayerActionsMenu = ({ layerActions }) => {
  return (
    <Menu className="cl-layer-list-action-menu">
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
          {layerActions.map(action => {
            return (
              <MenuItem
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
};

export default LayerActionsMenu;
