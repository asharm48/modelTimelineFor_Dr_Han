// imports
import * as THREE from './three.js/build/three.module.js';
import {
    OBJLoader
} from './three.js/examples/jsm/loaders/OBJLoader.js';
// adding event listener on the events on the document

document.addEventListener("DOMContentLoaded", function (event) {

    let scene = new THREE.Scene();
    scene.background = new THREE.Color('silver');

    let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
    camera.position.set(10, 100, 150);

    // setting up the canvas element
    const canvas = document.getElementById('my_canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    // getting the slider value
    var sliderValue = document.getElementById("slider_val");

    // loading the model
    var modelObj = null;
    const manager = new THREE.LoadingManager()
    new OBJLoader(manager)
        .load('./model.obj', function (obj) {
        	obj.position.x = 11;
            obj.position.y = 98;
            obj.position.z = -11;
            obj.name = "main_obb";
            obj.scale.set(10, 10, 10);
            scene.add(obj);
            modelObj = obj;
        });


    // slider object
    var slider = document.getElementById("my_slider");
    slider.addEventListener("input", function () {
        sliderValue.innerHTML = "Day:" + slider.value;
        console.log(slider.value);
    // white maker
    function whiteMaker(mObj, c0,c1,c2,c3){
    	if(c0){
    		mObj.children[0].material = new THREE.MeshBasicMaterial({
                        color: "white"
                    });
    	}
    	if(c1){
    		mObj.children[1].material = new THREE.MeshBasicMaterial({
                        color: "white"
                    });
    	}
    	if(c2){
    		mObj.children[2].material = new THREE.MeshBasicMaterial({
                        color: "white"
                    });
    	}
    	if(c3){
    		mObj.children[3].material = new THREE.MeshBasicMaterial({
                        color: "white"
                    });
    	}
    }
    // green maker
    function makeGreen(child){
    	child.material = new THREE.MeshBasicMaterial({
                        color: "green"
                    });
    }
        // adding functionality to object according to the change in value of slider
        scene.getObjectByName('main_obb').traverse(function (child) {//taking slider value then compare the case
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshPhongMaterial({
                    color: "white"
                });
                if (slider.value >= 16) {
                    for (var i=0; i<modelObj.children.length; i++) {
                        modelObj.children[i].material = new THREE.MeshBasicMaterial({
                            color: "white"
                        });
                    }
                } else if (child.name === 'Column1' && slider.value <= 2) {
                    makeGreen(child);
                } else if (child.name === 'Column2' && slider.value >= 3 && slider.value <= 4) {
                	makeGreen(child);
                    whiteMaker(modelObj,true,false,false,false);
                } else if (child.name === 'Column3' && slider.value >= 5 && slider.value <= 8) {
                    makeGreen(child);
                    whiteMaker(modelObj,true,true,false,false);
                } else if (child.name === 'Column4' && slider.value >= 9 && slider.value <= 11) {
                    makeGreen(child);
                    whiteMaker(modelObj,true,true,true,false);
                } else if (child.name === 'Slab' && slider.value >= 12 && slider.value <= 15) {
                    makeGreen(child);
                    whiteMaker(modelObj,true,true,true,true);
                }
                if (slider.value == 0) {
                    child.material = new THREE.MeshPhongMaterial({
                        color: "white"
                    });
                }
            }
        });
    });
    
    var dl = new THREE.DirectionalLight('white', 0.6);
    dl.position.set(-5, 10, 5);
    scene.add(dl);

    animate();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
});