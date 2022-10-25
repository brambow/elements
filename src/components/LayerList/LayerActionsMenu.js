/** @jsxImportSource theme-ui */
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';

const LayerActionsMenu = ({ layerActions }) => {
  if (layerActions && layerActions.length > 0) {
    return (
      <Menu className="cl-layer-list-action-menu">
        <MenuButton
          sx={{
            color: 'text',
            bg: 'background',
            borderColor: '#ebecf0',
            borderStyle: 'solid',
            borderRadius: 4,
            fontSize: 1,
            ':hover': {
              cursor: 'pointer',
              bg: 'highlight'
            }
          }}
        >
          ...
        </MenuButton>
        <MenuPopover sx={{ zIndex: 3, fontFamily: 'body' }}>
          <MenuItems>
            {layerActions.map((action) => {
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
  }
  return null;
};

export default LayerActionsMenu;
