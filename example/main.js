require('aframe');

const THREE = window.AFRAME.THREE;

const $play = document.querySelector('#play');
const $video = document.querySelector('#video');
const $scene = document.querySelector('a-scene');


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

var PI_2 = Math.PI / 2;
var radToDeg = THREE.Math.radToDeg;

var pitchObject = new THREE.Object3D();
var yawObject = new THREE.Object3D();
yawObject.position.y = 10;
yawObject.add(pitchObject);

var previousRotationX,
	previousRotationY;
function calculateDeltaRotation(){
    var currentRotationX = radToDeg(pitchObject.rotation.x);
    var currentRotationY = radToDeg(yawObject.rotation.y);
    var deltaRotation;
    previousRotationX = previousRotationX || currentRotationX;
    previousRotationY = previousRotationY || currentRotationY;
    deltaRotation = {
      x: currentRotationX - previousRotationX,
      y: currentRotationY - previousRotationY
    };
    previousRotationX = currentRotationX;
    previousRotationY = currentRotationY;
    return deltaRotation;
}

function updateOrientation(){
	if(!$scene.camera) return;
	var el = $scene.camera.el;
	var currentRotation,
		deltaRotation,
		rotation;

	currentRotation = el.getAttribute('rotation');
	deltaRotation = calculateDeltaRotation();
	rotation = {
		x: currentRotation.x - deltaRotation.x,
		y: currentRotation.y - deltaRotation.y,
		z: currentRotation.z
	};
	el.setAttribute('rotation', rotation);
}

// var windowHalfX = window.innerWidth / 2; 
// var windowHalfY = window.innerHeight / 2; 
var previousMouseEvent;
function onMouseMove(event){

	// event.screenX

	var movementX = event.movementX || event.mozMovementX;
	var movementY = event.movementY || event.mozMovementY;
	if (movementX === undefined || movementY === undefined) {
		movementX = event.screenX - previousMouseEvent.screenX;
		movementY = event.screenY - previousMouseEvent.screenY;
	}

    console.log(movementX, movementY);

    yawObject.rotation.y -= movementX * 0.0025;
    pitchObject.rotation.x -= movementY * 0.0025;
    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));

	//last
	previousMouseEvent = event;
}

window.addEventListener('mousemove', function(e){
	onMouseMove(e);
	updateOrientation();
});

$scene.addEventListener('camera-set-active', function(evt){
	console.log(evt.detail.cameraEl.object3D);
});