var scene, camera, renderer, light, controls;
var geometry, pointsGeometry, colors, meshes;

init();
animate();
 
function init() {

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff, 1);

  renderer.domElement.className = "background";

  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 10000 );
  camera.position.z = 6;

  light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 3, 2, 1.7 );
  scene.add( light );

  var ambient = new THREE.AmbientLight( 0xaaaaaa );
  scene.add(ambient);

  colors = [
  new THREE.Color( 0x222222 ),
  new THREE.Color( 0x999999 ),
  new THREE.Color( 0x2244aa ),
  ];

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

  var materialPoints = new THREE.PointsMaterial({
      color: 0xffffff,
      size:1,
      visible:false
   });
  meshes = [];
  var numberBoxes = 100;

  for(var i=0;i<numberBoxes;i++){
    var _h = 1000;//20+Math.random()*20;
    var _w = 1.5+Math.random()*5;
    var _pos = new THREE.Vector3( 100, 0, 0 );
    var c = Math.floor(Math.random()*3);

    material = new THREE.MeshPhongMaterial({
                        color:colors[c],
                        shading: THREE.FlatShading,
                        shininess: 1,
                        side: THREE.FrontSide
                  });

    geometry = new THREE.CubeGeometry( _w, _h, _w, 1, 1, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateAmount = Math.random()-.5;
    meshes.push(mesh);
    scene.add(mesh);

    meshes[i].rotateZ((Math.random()-.5)*.5);
    meshes[i].rotateY(Math.random());
    meshes[i].position.x=(Math.random()-.5)*200;
    meshes[i].position.y=(Math.random()-.5)*100;
    meshes[i].position.z=-70+((Math.random()-.5)*50);
  }
  

}
 
function animate() {
  for(var i=0;i<meshes.length;i++){
      meshes[i].rotateY(.01*meshes[i].rotateAmount);
  }

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
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

var oldScroll = 0;
var scrollAmnt = 0;

function onScroll(e) {
  var maxScroll = $(document).height()-window.innerHeight;
  scrollAmnt += e.deltaY/10;
  if(scrollAmnt<maxScroll){
  	camera.position.y-=e.deltaY/1000;
    
    scrollAmnt < 0 ? scrollAmnt = 0 : {}
    window.scrollTo(0,scrollAmnt)
    for(var i=0;i<meshes.length;i++){
      meshes[i].rotateY((window.scrollY-oldScroll)*.005*meshes[i].rotateAmount);
    }
    camera.position.y += (oldScroll-window.scrollY)*.025;
  	oldScroll = window.scrollY;
  }else{
    scrollAmnt = maxScroll;
  }
}

window.addEventListener( 'wheel', onScroll, false );