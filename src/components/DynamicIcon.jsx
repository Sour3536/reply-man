import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

export default function DynamicIcon({ size, color, projectName, ...props }) {
	const scriptUrl =
		projectName === 'displayProfile'
			? '//at.alicdn.com/t/font_2080052_9clmvypx2ms.js'
			: projectName === 'subjectIcons'
			? '//at.alicdn.com/t/font_2080064_iab1uxzp2aq.js'
			: projectName === 'mascot'
			? '//at.alicdn.com/t/font_2080075_egyhtchr94w.js'
			: projectName === 'mascotAnimated'
			? '//at.alicdn.com/t/font_2080081_rc3qo5tb22.js'
			: projectName === 'userSelectedItems'
			? '//at.alicdn.com/t/font_2078853_gq0sypbgu8.js'
			: projectName === 'filetype'
			? '//at.alicdn.com/t/font_2079033_nih9xiu2zs.js'
			: projectName === 'brandAssets'
			? '//at.alicdn.com/t/font_2080061_wciwv1fs4wa.js'
			: projectName === 'Cudy3.0'
			? '//at.alicdn.com/t/font_1290431_taki91bie59.js'
			: '//at.alicdn.com/t/font_1290431_fxdhanj8nmg.js';

	const TheIcon = createFromIconfontCN({ scriptUrl, extraCommonProps: { style: { fontSize: size || 20, color } } });

	return <TheIcon {...props} size={size} />;
}
