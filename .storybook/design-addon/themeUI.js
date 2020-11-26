import React from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
import { useAddonState } from '@storybook/api';
import { Button, Flex } from 'theme-ui';

import { allThemes } from '../config';

const allThemeNames = Object.keys(allThemes);

const Component = ({ active, key }) => {
  const [selectedTheme, setSelected] = useAddonState(
    'currentTheme',
    'defaultTheme'
  );

  return (
    <AddonPanel active={active} key={key}>
      <Flex
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '0.5rem'
        }}
      >
        {allThemeNames.map((themeName) => (
          <Button
            key={themeName}
            onClick={() => setSelected(themeName)}
            style={{
              backgroundColor:
                selectedTheme === themeName ? 'lightcoral' : 'cornflowerblue',
              width: '170px',
              margin: '0.25rem 0',
              textTransform: 'capitalize',
              cursor: 'pointer'
            }}
          >
            {themeName}
          </Button>
        ))}
      </Flex>
    </AddonPanel>
  );
};

addons.register('my/theme-ui-addon', () => {
  addons.add('theme-ui-addon/panel', {
    title: 'Theme UI Themes',
    type: types.PANEL,
    render: ({ active, key }) => <Component active={active} key={key} />
  });
});
