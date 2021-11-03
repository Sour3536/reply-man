const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#5AB9EA',
			'@font-family':
				"-apple-system, BlinkMacSystemFont, 'Gotham', 'Segoe UI', Roboto, 'Helvetica Neue', Arial ,'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji'"
			// You can add another options/customization override's here
			// See https://ant.design/docs/react/customize-theme for some major variables
			// and https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
			// for a whole variables
		}
	})
);
