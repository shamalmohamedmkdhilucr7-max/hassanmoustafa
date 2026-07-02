/* Hassan Moustafa Automotive Care - Three.js Piston/Gear Hybrid 3D Scene */

(function() {
    function initThreeJS(container) {
        if (!container) return;

        // Check if THREE is available globally
        if (typeof THREE === 'undefined') {
            console.error("Three.js library is not loaded.");
            return;
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(width, height);
        renderer.setPixelRatio(devicePixelRatio);
        
        // Clear previous canvas if exists (prevents duplicate canvas issues on resize/re-render)
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Lighting System
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xD4001C, 2, 10);
        pointLight.position.set(-2, 1, 2);
        scene.add(pointLight);

        // 3D Geometry: Stylized Piston/Gear hybrid
        const group = new THREE.Group();

        // 1. Piston Base (Central Cylinder)
        const baseGeo = new THREE.CylinderGeometry(1, 1, 0.5, 32);
        const baseMat = new THREE.MeshPhongMaterial({ 
            color: 0xC9CDD2, 
            specular: 0x555555, 
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        group.add(baseMesh);

        // 2. Outer Gear Ring (Red Torus)
        const gearGeo = new THREE.TorusGeometry(1.2, 0.1, 16, 100);
        const gearMat = new THREE.MeshPhongMaterial({ 
            color: 0xD4001C,
            specular: 0x222222,
            shininess: 50
        });
        const gearMesh = new THREE.Mesh(gearGeo, gearMat);
        gearMesh.rotation.x = Math.PI / 2;
        group.add(gearMesh);

        // 3. Central Shaft (Metallic Piston Shaft)
        const shaftGeo = new THREE.CylinderGeometry(0.3, 0.3, 2, 16);
        const shaftMat = new THREE.MeshPhongMaterial({
            color: 0x888888,
            specular: 0x999999,
            shininess: 150
        });
        const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
        shaftMesh.position.y = -1;
        group.add(shaftMesh);

        scene.add(group);
        camera.position.z = 5;

        // Mouse Sway Tracking
        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        let isVisible = false;
        let animFrameId = null;

        // Animation Loop
        function animate() {
            if (!isVisible) {
                animFrameId = null;
                return;
            }
            
            // Continuous spinning
            group.rotation.y += 0.005;
            group.rotation.x += 0.002;
            
            // Smooth mouse sway interpolation
            group.rotation.y += mouseX * 0.05;
            group.rotation.x += mouseY * 0.05;
            
            renderer.render(scene, camera);
            animFrameId = requestAnimationFrame(animate);
        }

        // Window resize event handler
        window.addEventListener('resize', () => {
            const w = container.clientWidth || window.innerWidth;
            const h = container.clientHeight || window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            
            // Check if visibility changed due to media query display none
            const isDisplayed = container.offsetParent !== null;
            if (!isDisplayed) {
                isVisible = false;
            } else if (isDisplayed && !isVisible) {
                // If it is in viewport, trigger animation
                checkIntersection();
            }
        });

        function checkIntersection() {
            const isDisplayed = container.offsetParent !== null;
            if (typeof IntersectionObserver !== 'undefined') {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const isDisp = container.offsetParent !== null;
                        isVisible = entry.isIntersecting && isDisp;
                        if (isVisible && !animFrameId) {
                            animFrameId = requestAnimationFrame(animate);
                        }
                    });
                }, { threshold: 0 });
                observer.observe(container);
            } else {
                isVisible = isDisplayed;
                if (isVisible && !animFrameId) {
                    animFrameId = requestAnimationFrame(animate);
                }
            }
        }

        checkIntersection();
    }

    // Initialize all containers — works whether script runs before or after DOM is ready
    function initAll() {
        const containers = document.querySelectorAll('.threejs-container, [id^="threejs-container-"]');
        containers.forEach(initThreeJS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll(); // DOM already ready (script loaded at end of body)
    }
})();
