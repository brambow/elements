import { babel } from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

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
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      // autoExternal(),
      image(),
      postcss({
        extensions: ['.css']
      })
    ],

    external: [
      'react/jsx-runtime',
      'react-icons/fa',
      'react-icons/md',
      '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css',
      'react-icons/all',
      'react-dom/server',
      'theme-ui',
      'theme-ui/jsx-runtime',
      '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw',
      '@reach/menu-button/styles.css',
      ...Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies))
    ]
  }
];
