import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
// import sourceMaps from "source-map-resolve";
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

const babel = require('rollup-plugin-babel');

const { terser } = require('rollup-plugin-terser');

const pkg = require('./package.json');

const libraryName = 'mxUtils';

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: false,
    },
    { file: pkg.module, format: 'es', sourcemap: false },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        [
          '@babel/transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({
      browser: true,
      preferBuiltins: true,
    }), // 解决第三方依赖打包问题
    terser(),

    // Resolve source maps to the original source
    sourceMaps,
  ],
};
