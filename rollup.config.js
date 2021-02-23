import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
import autoExternal from 'rollup-plugin-auto-external';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      autoExternal(),
      svg(),
      postcss({
        extensions: ['.css']
      })
    ],

    external: [
      'react-icons/fa',
      'react-icons/md',
      '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css',
      'react-icons/all',
      'react-dom/server',
      'theme-ui',
      '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw',
      '@reach/menu-button/styles.css'
    ]
  }
];
