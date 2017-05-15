//require('aframe');

const $play = document.querySelector('#play');
const $video = document.querySelector('#video');

var pause = false;
$play.addEventListener('click', function(){
	if(!pause){
		$video.pause();
		pause = true;
	}else{
		$video.play();
		pause = false;
	}
});