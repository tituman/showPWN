javascript : (function () {
	var s = document.createElement('script');
	s.addEventListener('error', function(){ window.open ('http://tituman.github.io/showPWN') });
	s.type = 'text/javascript';
	s.src = '//tituman.github.io/showPWN/showPwn.js?v=' + parseInt(Math.random() * 99999999);
	document.body.appendChild(s);
})();
