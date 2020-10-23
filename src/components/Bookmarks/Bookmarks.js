/* Bookmarks component. Allows users to save and recall map position (zoom, center) information */

import React, { useContext, useState, useEffect } from 'react';
import { Button, Flex, Box, Text, Input } from 'theme-ui';
import { FaBookmark, FaTrashAlt } from 'react-icons/fa';
import BaseComponent from '../_common/BaseComponent';
import Context from '../../DefaultContext';
import {
  goToBookmark,
  loadBookmarks,
  deleteBookmark,
  saveBookmark
} from './util/bookmarkActions';
import ListItem from '../_primitives/ListItem';
import List from '../_primitives/List';

const Bookmarks = ({ baseType, buttonOptions, ...rest }) => {
  const { _goToBookmark, _loadBookmarks, _deleteBookmark, _saveBookmark } = {
    _goToBookmark: Object.hasOwnProperty.call(rest, 'goToBookmark')
      ? rest.goToBookmark
      : goToBookmark,
    _loadBookmarks: Object.hasOwnProperty.call(rest, 'loadBookmarks')
      ? rest.loadBookmarks
      : loadBookmarks,
    _deleteBookmark: Object.hasOwnProperty.call(rest, 'deleteBookmark')
      ? rest.deleteBookmark
      : deleteBookmark,
    _saveBookmark: Object.hasOwnProperty.call(rest, 'saveBookmark')
      ? rest.saveBookmark
      : saveBookmark
  };

  const config = useContext(Context);
  const { map } = config;
  const existingBookmarks = JSON.parse(_loadBookmarks()) || [];
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarks, setBookmarks] = useState(existingBookmarks);
  const [bookmarkListItems, setBookmarkListItems] = useState([]);

  useEffect(() => {
    const listItems = bookmarks.map((bkmk) => {
      return (
        <ListItem selectable key={bkmk.name}>
          <Flex>
            <Box
              onClick={() => {
                _goToBookmark(map, bkmk);
              }}
              sx={{ flex: '1 1 auto' }}
            >
              <FaBookmark />
              {bkmk.name}
            </Box>
            <Box>
              <FaTrashAlt
                onClick={() => {
                  _deleteBookmark(bkmk, setBookmarks);
                }}
              />
            </Box>
          </Flex>
        </ListItem>
      );
    });
    setBookmarkListItems(listItems);
  }, [map, bookmarks]);

  // let bookmarksComponent;
  const toolText = (
    <Text>
      Save the current view or choose a Bookmark below to return to a saved
      view.
    </Text>
  );
  const form = (
    <Flex>
      <Input
        value={bookmarkName}
        onChange={(e) => {
          setBookmarkName(e.currentTarget.value);
        }}
      />
      <Button
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginLeft: '-0.175rem'
        }}
        onClick={() => {
          _saveBookmark(map, bookmarkName, setBookmarks);

          setBookmarkName('');
        }}
      >
        Save
      </Button>
    </Flex>
  );

  return (
    <BaseComponent
      baseType={baseType}
      buttonOptions={{
        className: 'bookmark-btn',
        icon: <FaBookmark />,
        title: 'Bookmarks',
        testId: 'bookmark-btn',
        ...buttonOptions
      }}
      {...rest}
    >
      <Box>
        {toolText}
        {form}
        <List>{bookmarkListItems}</List>
      </Box>
    </BaseComponent>
  );
};

export default Bookmarks;
