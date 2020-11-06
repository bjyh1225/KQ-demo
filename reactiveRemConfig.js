module.exports=[
  require('postcss-plugin-px2rem')({
    rootValue: 144, 
    exclude: /node_modules|mobileIndependentModules/i,
    mediaQuery: false,
    propBlackList:['border','border-top','border-left','border-right','border-bottom','border-radius','font-size','box-shadow']
  }),
  require('postcss-plugin-px2rem')({
    rootValue: 50, 
    exclude: /node_modules|independentModules|portal/i,
    mediaQuery: false,
    propBlackList:['border','border-top','border-left','border-right','border-bottom','border-radius','font-size','box-shadow']
  })
]