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
/*
	根据屏幕中心为原点
	
	
	最后更新camera的rotation(xyz均会存在变化)
 */

```