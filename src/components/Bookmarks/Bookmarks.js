/* Bookmarks component. Allows users to save and recall map position (zoom, center) information */

import React, { useContext, useState, useEffect } from 'react';
import { Button, Flex, Box, Text, Input } from 'theme-ui';
import { FaBookmark, FaTrashAlt } from 'react-icons/fa';
import BaseComponent from '../_common/BaseComponent';
import Context from '../../DefaultContext';
import { deleteBookmark, saveBookmark } from './util/bookmarkActions';
import loadBookmark from './util/loadBookmark';
import ListItem from '../_primitives/ListItem';
import List from '../_primitives/List';

const Bookmarks = ({ panel, ...rest }) => {
  const config = useContext(Context);
  const {map} = config;
  const existingBookmarks = JSON.parse(
    window.localStorage.getItem('ccBookmarks')
  )
    ? JSON.parse(window.localStorage.getItem('ccBookmarks'))
    : [];
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarks, setBookmarks] = useState(existingBookmarks);
  const [bookmarkListItems, setBookmarkListItems] = useState([]);

  useEffect(() => {
    const listItems = bookmarks.map(bkmk => {
      return (
        <ListItem
          selectable
          key={bkmk.name}
        >
          <Flex>
            <Box
              onClick={() => {
                loadBookmark(map, bkmk);
              }}
             sx={{ flex: '1 1 auto' }}
            >
              <FaBookmark />
              {bkmk.name} 
            </Box>
            <Box>
              <FaTrashAlt 
                onClick={() => {
                  deleteBookmark(bkmk, setBookmarks);
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
        onChange={e => {
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
          saveBookmark(map, bookmarkName, setBookmarks);

          setBookmarkName('');
        }}
      >
        Save
      </Button>
    </Flex>
  );

  return (
    <BaseComponent panel={panel} {...rest}>
      <Box>
        {toolText}
        {form}
        <List>{bookmarkListItems}</List>
      </Box>
    </BaseComponent>
  );
};

export default Bookmarks;
