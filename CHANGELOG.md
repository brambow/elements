# 2.2.0

- UI: update default style of action menu buttons

# 2.2.0-alpha.2

- Feature: emit layer list info (name, layer ids, and whether on/off) to Elements Context so it can be read in apps
- Fix: togeojson imports
- Fix: add buffer pkg for webpack 5 polyfill issues

# 2.1.1

- Fix: remove some errors and console messages that were ending up in applications

# 2.1.0

- Feature: expose current basemap/mapStyle name in Elements context
- Fix: function and performance of layer preservation on <BasemapSwitcher>

# 2.0.3

- Fix: make sure `selectMode` context value is being set.

# 2.0.2

- Fix: Two fixes for the AddData component due to reported security vulnerabilities in dependencies:
  - Update `@mapbox/togeojson` to maintained `@tmcw/togeojson`
  - Update `shpjs` dependency from v3 to v4

# 2.0.1

- Fix: new context values were never merged for 2.0.0 release.

# 2.0.0

**BREAKING CHANGES:**

- `<BaseComponent/>` API has been updated.
- Removed the following props: `panel`, `top`, `left`, `bottom`
- Added the following props:
  - `baseType` - choices are `none` (default), `panel`, `button`
  - `sx` - set of styles that are passed to the base container (this existed but is now passed consistently)
  - `buttonOptions` - set of options passed to button-style components
- New <ButtonComponent> (`baseType = 'button`) provides and out-of-the-box UI option for button triggers
- Additional Context values: `drawMode` and `selectMode`
- Fix: Data driven styles in legend for layers with 2 or more stops ( was previously 3 or more)
- Storybook: new custom addon for ThemeUI & update config for v0.12.x
- Chore: Update ReachUI and ThemeUI versions
- Fix: non-responsive popups when new map loads
- Feature: Multi-feature popups with "page" navigation
- Feature: Update support for React 17
- Chore: passing all unit test suites again
- Feature: add `preserveLayers` prop to `<BasemapSwitcher />` to support keeping overlay layers when map style changes
- Chore: update bundler to Rollup v2
- Feature: enable Mapbox 2 support
- Chore: Upgrade to Node 16 and Yarn 3

# 1.3.8

- Fix: support data driven layers with 2 or more categories.

# 1.3.7

- Add title to Home button
- Add default width to Home button
- Show layer opacity in legend symbols

# 1.3.6

- Add indicator of current zoom level as option in Zoom control
- "slider" option for Zoom
- bugfix: enforce explicit text color in select dropdown for Windows

# 1.3.5

- add debounce to geocoding

# 1.3.3-1.3.4

- fix: add zIndex to searchSuggestions
- feat: make suggestionsZIndex a prop on Search

# 1.3.1-1.3.2

- Fixing Home component behavior

# 1.3.0

- Layer List: Add style options to checkboxes (choose: checkbox, switch, eye)
- Select Tool: add onReset() callback + minor bug fixes. Address issue expecting a single geometry.
- Home Tool: reset map tilt when clicked
- Home: add intercept function for custom actions
- Storybook: add story source code to Storybook site
- Draw Tool: Add text context menu for changing label text, size, font, and color.
- Update Mapbox Draw dependency
- Bookmarks: ability to delete and custom actions
- Update several dependencies

# 1.2.0

- update to ThemeUI v 0.3.1
- add radio group option to LayerList
- add graduated circle symbols to Legend
- bugfix: allow multiple popup layers
- new component: Home button
- useElements hook
- legend support for data driven styles on lines
- minor style improvements to LayerList
- add useElements hook
- add ability to show/hide legend symbol in Layer List
- fix: text draw mode
- fix: search tool errors
- add ESLint rules

# 1.1.1

- hotfix for overflow scroll 'auto'

# 1.1.0

- add `intercept` method to MapPopup for adding external data source capabilities
- make title in Popup conditional
- replace `rebass` components with `themeui`
- update themeui to 0.3.0
- remove unused dependencies
- add action menus for LayerList and Popup components
- add callback with selected features to Select
- allow users to pass custom selection styles to Select
- fix: add ability to disable popup
- add loading indicator for popup data
- support circle types in Legend

# 1.0.1 - 1.0.4

- minor fixes for dependencies and rollup configs

# 1.0.0

- intial commits of open source project
