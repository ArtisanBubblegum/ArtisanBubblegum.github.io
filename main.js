import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = function() {
  const scene = new BABYLON.Scene(engine);

  //const cemera = scene.createDefaultCameraOrLight(true, false, true);
  const cemera2 = new BABYLON.ArcRotateCamera('camera1', 0, Math.PI/3, 30, new BABYLON.Vector3(0,0,0), scene);
  cemera2.attachControl(canvas, true);

  const laght3 = new BABYLON.PointLight('light1', new BABYLON.Vector3(4,15,-3), scene)

  //const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', scene);
  
  const sphere23 = new BABYLON.MeshBuilder.CreateSphere('mySphere', {segments: 20, checkCollisions: true}, scene);
  const aRedMAT = new BABYLON.StandardMaterial("BlueMat", scene);
  aRedMAT.emissiveColor = new BABYLON.Color3(1,0,0);
  sphere23.material = aRedMAT;
  
  BABYLON.Tags.EnableFor(sphere23);
  BABYLON.Tags.AddTagsTo(sphere23, "RED");
  

  const shperelist = new Array(1250);
  const spherelist = new Array(125);
  var iTwo = 0;

  for (let i = 0; i < shperelist.length; i++) {
    
    const newshpere = new BABYLON.MeshBuilder.CreateSphere('aName', {segments: 20}, scene);
    newshpere.checkCollisions = true;
    BABYLON.Tags.EnableFor(newshpere);

    newshpere.position.x = (Math.random()-0.5)*100;
    if (Math.abs(newshpere.position.x) > 25){
      newshpere.position.x = (Math.random()-0.5)*200;
    }
    if (Math.abs(newshpere.position.x) > 50){
      newshpere.position.x = (Math.random()-0.5)*400;
    }
    
    newshpere.position.y = (Math.random()-0.5)*100;
    if (Math.abs(newshpere.position.y) > 25){
      newshpere.position.y = (Math.random()-0.5)*200;
    }
    if (Math.abs(newshpere.position.y) > 50){
      newshpere.position.y = (Math.random()-0.5)*400;
    }
    
    newshpere.position.z = (Math.random()-0.5)*100;
    if (Math.abs(newshpere.position.z) > 25){
      newshpere.position.z = (Math.random()-0.5)*200;
    }
    if (Math.abs(newshpere.position.z) > 50){
      newshpere.position.z = (Math.random()-0.5)*400;
    }
    
    if(iTwo < spherelist.length){
      spherelist[iTwo] = newshpere;
      spherelist[iTwo].material = aRedMAT;
      BABYLON.Tags.AddTagsTo(spherelist[iTwo], "RED");
      i += -1;
      iTwo += 1;
    }
    else{
      shperelist[i] = newshpere;
      BABYLON.Tags.AddTagsTo(newshpere, "WHITE");
    }
  }

  /*scene.onPointerDown = function castRay() {
    var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);
  
    var hit = scene.pickWithRay(ray);
    if (hit.pickedMesh) {
        hit.pickedMesh.setEnabled(false);
    }
  }*/
  
  scene.onPointerObservable.add((eventData) => {
    let mesh = eventData.pickInfo.pickedMesh;
    if (mesh) {
      if (mesh.matchesTagsQuery("RED")){
        location.reload()
      }
      else {//if (mesh.matchesTagsQuery("WHITE")){
        mesh.setEnabled(false);
      }
    }
    else {
        
    }
}, BABYLON.PointerEventTypes.POINTERDOWN);

scene.onPointerObservable.add((eventData) => {
  let mesh = eventData.pickInfo.pickedMesh;
  if (mesh) {
    if (mesh.matchesTagsQuery("RED")){
      location.reload()
    }
    else {//if (mesh.matchesTagsQuery("WHITE")){
      mesh.setEnabled(false);
    }
  }
  else {
      
  }
}, BABYLON.PointerEventTypes.POINTERUP);

  return scene;
}

const scene = createScene();

engine.runRenderLoop(function(){
  scene.render();
});

window.addEventListener('resize', function(){
  engine.resize();
});
