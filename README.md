# vr-player-example
vr player example

## 基于aframe处理vr-player

```
// 获得camera
const $scene = document.querySelector('a-scene');
$scene.addEventListener('camera-set-active', function(evt){
	console.log(evt.detail.cameraEl.object3D);
});

// 旋转镜头原理
// 根据鼠标原坐标到新坐标移动系数更新镜头转动弧度的幅度
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
```