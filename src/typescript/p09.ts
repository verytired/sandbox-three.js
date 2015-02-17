//定義ファイル
/// <reference path="DefinitelyTyped/threejs/three.d.ts" />

declare module THREE {
    export var OrbitControls;
}

class MainApp09 {
    private scene:THREE.Scene;
    private camera:THREE.PerspectiveCamera;
    private renderer;
    private container;
    private controls;
    
    constructor() {

        //1.カメラ追加
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 70, 70);

        //2.シーン追加
        this.scene = new THREE.Scene();

        //3.レンダラー追加
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffffff);
        this.renderer.shadowMapEnabled = true;

        //4.表示コンテナ指定
        this.container = document.getElementById('container');
        this.container.appendChild(this.renderer.domElement);
        //リサイズ処理
        this.onWindowResize();
        window.addEventListener("resize", this.onWindowResize, false);

        //5 オブジェクト追加
        //座標軸追加
        var axis = new THREE.AxisHelper(1000);
        axis.position.set(0, 0, 0);
        this.scene.add(axis);

        //光源追加
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(0, 100, 30);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        //cube追加
        var geometry = new THREE.CubeGeometry(40, 40, 40);
        var material = new THREE.MeshPhongMaterial({ color: 0xff0000,wireframe:true });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 60, 0);
        cube.castShadow = true;
        this.scene.add(cube);

        geometry = new THREE.PlaneGeometry( 150, 150, 64, 64 );
        material = new THREE.MeshPhongMaterial({ color: 0x000000,wireframe:true });
        var ground  = new THREE.Mesh(geometry,material);
        ground.rotation.x = Math.PI / -2;
        this.scene.add( ground );

        //マウス制御機能追加
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        container.addEventListener("mousemove", ((e) =>{
            var mouseX, mouseY;
            mouseX = e.clientX - 600 / 2;
            mouseY = e.clientY - 400 / 2;
        }), false);

    }

    private onWindowResize = function() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    private update() {
        this.controls.update();
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }

    public animate() {
        requestAnimationFrame((e)=>
                this.animate()
        );
        this.render();
    }
}

window.addEventListener("load", (e) => {
    var main:MainApp09 = new MainApp09();
    main.animate();
});
