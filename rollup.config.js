import multi from '@rollup/plugin-multi-entry';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

export default {
  input: 'src/**/*.css.ts',
  plugins: [
    multi({
      exports: true,
    }),
    vanillaExtractPlugin({})],
  output: {
    preserveModules: true,
    //assetFileNames({ name }) {
      //return name?.replace(/^src\//, '') ?? '';
    //},
  },
}
