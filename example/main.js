require('aframe');
require('./js/controls/OrbitControls');

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

const videosphere = document.querySelector('a-videosphere');
const groupObj = videosphere.object3D;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var x = 0;
var y = 0;
var z = 0;
// setInterval(function(){
// 	y = (clientX / window.innerWidth) * 2 - 1,;
// 	groupObj.rotation.set(x , y, z);
// }, 500);

// window.addEventListener('mousemove', function(e){
// 	y = (e.clientX / window.innerWidth) * 2 - 1;
// 	x = -(e.clientY / window.innerWidth) * 2 + 1;
// 	console.log("x:%s,y:%s,z:%s", x, y, z);
// 	groupObj.rotation.set(x , y, z);
// });
// console.log(groupObj);

// const fff = new THREE.OrbitControls(groupObj);
// console.log(fff);