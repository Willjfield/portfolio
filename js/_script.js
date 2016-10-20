var scene, camera, renderer, light, controls;
var customMaterial,geometry, pointsGeometry;

var noiseStep, noiseScale, noiseAmplitude;
var frameCount;

var isAnimating;

init();
animate();
 
function init() {
  isAnimating = true;

  frameCount = 0;

  noiseStep = 0;
  noiseScale = 10;
  noiseAmplitude = 0.5;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.setClearColor( 0xffffff, 1);

  renderer.domElement.className = "background";

  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 10000 );
  camera.position.z = 6;

  // controls = new THREE.OrbitControls(camera, renderer.domElement);
		// 				controls.enableDamping = true;
		// 				controls.dampingFactor = 0.25;
		// 				controls.minDistance = 0;
		// 				controls.minPolarAngle = 0; // radians
		// 				controls.maxPolarAngle = Math.PI*2;


  light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 3, 2, 1.7 );
  scene.add( light );

  material = new THREE.MeshPhongMaterial({
                          color:0xffffff,
                          shading: THREE.FlatShading,
                          emissive: 0x999999,
                          shininess: 1,
                          side: THREE.FrontSide
                    });

  materialWireframe = new THREE.MeshPhongMaterial({
                          color:0x666633,
                          emissive: 0x333344,
                          shininess:50,
                          wireframe: true,
                          wireframeLinewidth: 1,
                          transparent:true,
                          visible:false,
                          opacity:1
                    });
  //customMaterial uses vertex/frag shaders.
  customMaterial = new THREE.ShaderMaterial( {
  uniforms: { 
    time: { // float initialized to 0
       type: "f", 
       value: 0.0 
     },
     lightPosition:{
       type: "vec3",
       value: light.position
     }
  },
  vertexShader: vertex_Shader,
  fragmentShader: fragment_Shader
  } );
  customMaterial.extensions.derivatives = true;
  var materialPoints = new THREE.PointsMaterial({
      color: 0xffffff,
      size:1,
      visible:false
   });

  geometry = new THREE.CylinderGeometry( 3.5, 3.5, 10, 128,48 );
  geometry.verticesNeedUpdate = true;

  mesh = new THREE.Points(geometry, customMaterial);
  mesh.rotateZ(Math.PI/2)
  mesh.geometry.verticesNeedUpdate = true;

  // wireframeMesh = new THREE.Mesh(geometry,materialWireframe);
  // mesh.add(wireframeMesh);
  // pointsGeometry = geometry.clone();
  // var pointsMesh = new THREE.Points(pointsGeometry,materialPoints);

  // mesh.add(pointsMesh);
  // wireframeMesh.position.z+=.7;
  // pointsMesh.position.z+=.2;

  //mesh.position.z+=3;

  scene.add(mesh);

}
 
function animate() {
	//controls.update();

 // if(isAnimating){
    frameCount++;
    customMaterial.uniforms.time.value += .0025;

  //}

  noiseStep+=.0025;

  
  
  //pointsGeometry.verticesNeedUpdate = true;
  //for(var i = 0; i < geometry.vertices.length; i++) {                
      // var value = 1;//noise.simplex2(noiseStep+geometry.vertices[i].x/noiseScale, noiseStep+geometry.vertices[i].y/noiseScale);
      // var distanceFromCenter = geometry.vertices[i].distanceTo(waveCenter)+.1;
      // var differenceFromWave = Math.abs(distanceFromCenter-wavePosition);
      // if(differenceFromWave>1.5 && differenceFromWave<2){differenceFromWave = differenceFromWave/waveHeight}
      // differenceFromWave < waveHeight ? differenceFromWave = waveHeight : {}
      // var zOffset = (noiseAmplitude*value)+(waveHeight/differenceFromWave)*(waveDecay/Math.pow(distanceFromCenter+waveHeight,2.5));
      
      // geometry.vertices[i].z = zOffset;

      //pointsGeometry.vertices[i].z = (zOffset*1.5);
 // }

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  geometry.verticesNeedUpdate = true;

    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.elementsNeedUpdate = true;
     mesh.geometry.uvsNeedUpdate = true;
     mesh.geometry.normalsNeedUpdate = true;
     mesh.geometry.groupsNeedUpdate = true;
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseClick( event ) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;  
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );

  for ( var i = 0; i < intersects.length; i++ ) {
    var waveCenter = intersects[ 0 ].point;
  }
}

window.addEventListener( 'mouseup', onMouseClick, false );

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize, false );

function onScroll(e) {
	console.log("scrolling"+e.deltaY);
	//camera.position.y-=e.deltaY/1000;
	mesh.rotateY(e.deltaY/2000);
}

window.addEventListener( 'wheel', onScroll, false );