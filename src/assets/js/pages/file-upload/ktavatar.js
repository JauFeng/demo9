"use strict";
var KTAppOptions = {
	"colors": {
		"state": {
			"brand": "#591df1",
			"light": "#ffffff",
			"dark": "#282a3c",
			"primary": "#5867dd",
			"success": "#34bfa3",
			"info": "#36a3f7",
			"warning": "#ffb822",
			"danger": "#fd3995"
		},
		"base": {
			"label": ["#c5cbe3", "#a1a8c3", "#3d4465", "#3e4466"],
			"shape": ["#f0f3ff", "#d9dffa", "#afb4d4", "#646c9a"]
		}
	}
};

// Class definition
var KTAvatarDemo = function () {
	// Private functions
	var initDemos = function () {
		var avatar1 = new KTAvatar('kt_user_avatar_1');
        var avatar2 = new KTAvatar('kt_user_avatar_2');
        var avatar3 = new KTAvatar('kt_user_avatar_3');
        var avatar4 = new KTAvatar('kt_user_avatar_4');
	}

	return {
		// public functions
		init: function() {
			initDemos();
		}
	};
}();

KTUtil.ready(function() {
	KTAvatarDemo.init();
});
