/** @jsx jsx */
import { jsx, Container, Label, Select, Input, Grid, Box, Text, Close, Link } from 'theme-ui';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { CompactPicker } from 'react-color';

const LabelMaker = ({ x, y, target }) => {

  target.style.padding = '4px';
  target.style.textShadow = 'none';

  const [hidden, setHidden] = useState(false);

  const [textColor, setTextColor] = useState(target.style.color || 'black');
  const [backgroundColor, setBackgroundColor] = useState(target.style.backgroundColor || 'white');

  const [colorPickerActive, setColorPickerActive] = useState(false);
  const [currentColorPicker, setCurrentColorPicker] = useState(false);

  const updateText = (e) => {
    target.innerHTML = e.target.value.toUpperCase();
  };

  const updateFontSize = (e) => {
    target.style.fontSize = `${e.target.value}px`;
  };

  const updateFontFamily = (e) => {
    target.style.fontFamily = e.target.value;
  };

  const updateFontWeight = (e) => {
    target.style.fontWeight = e.target.value;
  };

  const updateColors = (color) => {
    const { hex } = color;
    if (currentColorPicker === 'fg') {
      target.style.color = hex;
      setTextColor(hex);
    } else if (currentColorPicker === 'bg') {
      target.style.backgroundColor = hex;
      setBackgroundColor(hex);
    }
  }

  return (
    <Draggable handle=".handle">
      <Box sx={{ position: 'absolute', top: `${y}px`, left: `${x}px`, zIndex: 99, backgroundColor: 'white', width: '280px', borderRadius: '9px', display: (hidden ? 'none' : '') }}>
        <Container className="handle" sx={{ textAlign: 'center', cursor: 'pointer', backgroundColor: 'gray', borderTopLeftRadius: '9px', borderTopRightRadius: '9px', padding: '5px' }}>
          <Text sx={{color: 'white'}}>Label Editor</Text>
          <Close 
            sx={{position: 'absolute', top: 0, right: 0, color: 'white', cursor: 'pointer'}} 
            onClick={() => {setHidden(true)}} />
        </Container>
        <Container>
          <Box sx={{margin: '2.5px'}}>
            <Label htmlFor='label-edit'>Label</Label>
            <Input
              placeholder={target.innerHTML}
              name='label-edit'
              id='label-edit'
              onChange={updateText}
              sx={{padding: '2px'}}
              mb={1}
            />

            <Label htmlFor='font-size-edit'>Font Size</Label>
            <Input
              placeholder={target.style.fontSize.replace('px', '') || '12'}
              name='font-size-edit'
              id='font-size-edit'
              onChange={updateFontSize}
              sx={{padding: '2px'}}
              mb={1}
            />

            <Label htmlFor='font-family-edit'>Font Family</Label>
            <Select name='font-family-edit' id='font-family-edit' mb={1} onChange={updateFontFamily} sx={{padding: '2px'}}>
              <option value='serif'>Serif</option>
              <option value='sans-serif'>Sans-Serif</option>
              <option value='cursive'>Cursive</option>
              <option value='monospace'>Monospace</option>
              <option value='fantasy'>Fantasy</option>
            </Select>

            <Label htmlFor='font-weight-edit'>Font Weight</Label>
            <Input
              placeholder={target.style.fontWeight || 200}
              name='font-weight-edit'
              id='font-weight-edit'
              onChange={updateFontWeight}
              sx={{padding: '2px'}}
              mb={1}
            />

            <Box sx={{textAlign: ((currentColorPicker === 'fg' ? 'left' : 'right'))}} mb={1}>
              {colorPickerActive ? <CompactPicker onChange={updateColors}/> : ''}
            </Box>

            <Grid
              gap={2}
              mb={1}
              columns={[2, '1fr 1fr']}>
              <Box 
                bg={textColor} 
                onClick={() => {
                  if (currentColorPicker === 'fg') {
                    setColorPickerActive(false)
                    setCurrentColorPicker(false)
                  } else {
                    setColorPickerActive(true)
                    setCurrentColorPicker('fg')
                  }
                }}
                sx={{color: 'white', cursor: 'pointer', border: ((currentColorPicker === 'fg') ? 'solid greenyellow 3px' : '')}}>FG</Box>
              <Box 
                bg={backgroundColor} 
                onClick={() => {
                  if (currentColorPicker === 'bg') {
                    setColorPickerActive(false)
                    setCurrentColorPicker(false)
                  } else {
                    setColorPickerActive(true)
                    setCurrentColorPicker('bg')
                  }
                }}
                sx={{cursor: 'pointer', border: ((currentColorPicker === 'bg') ? 'solid greenyellow 3px' : '')}}>BG</Box>
            </Grid>

            <Box p={2} sx={{textAlign: 'center'}}>
              <Link sx={{color: '#a70000'}} href='#!' onClick={(e) => {
                e.preventDefault();
                const choice = window.confirm('are you sure');
                if (choice) {
                  target.parentNode.removeChild(target);
                  setHidden(true);
                }
              }}>Delete Label</Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Draggable>
  );
};

export default LabelMaker;