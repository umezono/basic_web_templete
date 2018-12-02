module.exports = (ctx) => ({

  to: ctx.to,
  from: ctx.from,
  map: ctx.env === 'local' ? ctx.map : false,
  parser: ctx.parser ? 'sugarss' : false,
  syntax: ctx.syntax ? 'postcss-scss' : false,
  stringifier: ctx.stringifier ? 'midas' : false,
  plugins: {
    'postcss-extend': {},
    'postcss-flexbugs-fixes': {},
    'postcss-import': {
      path: '/src/assets/css/'
    },
    'postcss-mixins': {
      // https://github.com/postcss/postcss-mixins
      mixins: {
        // add function mixin
      }
    },
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 2,
      // browsers: [
      //   'last 2 versions',
      //   '> 5%'
      // ],
      autoprefixer: {},
    },
    'postcss-simple-vars': {},
    cssnano: ctx.env === 'production' ? {
      preset: ['default', {
        normalizeUrl: false
      }]
    } : false
  }

});