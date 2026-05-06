function initTeidesatKidsGame() {
    const canvas = document.getElementById("teidesat-kids-game-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAME_WIDTH = canvas.width;
    const GAME_HEIGHT = canvas.height;

    let animationId = null;
    let gameStarted = false;
    let gameOver = false;
    let score = 0;
    let bestScore = parseInt(localStorage.getItem("teidesatKidsBestScore")) || 0;
    let lastTime = 0;
    let obstacleTimer = 0;
    let earthOffset = 0;
    let lastObstacleLane = null;
    let previousObstacleLane = null;

    const bananas = [];
    let shieldCount = 0;
    let bananaTimer = 0;
    let bananaChance = 0.55;
    let bananaInterval = 7000;

    let burstTimer = 0;
    let burstShotsPending = 0;
    let lastBurstType = null;

    let explosion = null;
    let playerVisible = true;

    let paceTimer = 0;
    let paceMode = "normal";
    let currentPaceMultiplier = 1.0;
    let targetPaceMultiplier = 1.0;
    let currentPhaseDuration = 7000;

    let rescueUsed = false;
    let waitingForAnswer = false;
    let pendingQuestion = null;
    let rescueCause = null;
    let touchTarget = null;
    let resultMessage = "";
    let resultTimer = 0;
    let pendingGameOverAfterMessage = false;

    const fullscreenButtonArea = {
        x: GAME_WIDTH - 54,
        y: GAME_HEIGHT - 46,
        width: 38,
        height: 28
    };

    const gameButtonArea = {
        x: GAME_WIDTH / 2 - 90,
        y: GAME_HEIGHT / 2 + 62,
        width: 180,
        height: 46
    };

    const questionOptionAreas = [];

    const scienceQuestions = [
        {
            question: "¿Qué es un nanosatélite?",
            options: ["Un satélite pequeño", "Un planeta pequeño", "Una estrella"],
            correct: 0
        },
        {
            question: "¿De dónde obtiene energía un satélite?",
            options: ["De paneles solares", "De gasolina", "Del viento"],
            correct: 0
        },
        {
            question: "¿Qué planeta es nuestro hogar?",
            options: ["Marte", "La Tierra", "Júpiter"],
            correct: 1
        },
        {
            question: "¿Para qué sirve una antena en un satélite?",
            options: ["Enviar y recibir señales", "Dar oxígeno", "Frenar meteoritos"],
            correct: 0
        },
        {
            question: "¿Qué astro ilumina la Tierra durante el día?",
            options: ["La Luna", "El Sol", "Marte"],
            correct: 1
        },
        {
            question: "¿Qué mide un sensor?",
            options: ["Información del entorno", "El sabor de la comida", "La música"],
            correct: 0
        },
        {
            question: "¿Qué es una órbita?",
            options: ["El camino de un objeto alrededor de otro", "Una nube", "Un tipo de cohete"],
            correct: 0
        },
        {
            question: "¿Qué necesita un satélite para comunicarse?",
            options: ["Una antena", "Un paracaídas", "Una rueda"],
            correct: 0
        },
        {
            question: "¿Qué protege a la Tierra de muchos meteoritos pequeños?",
            options: ["La atmósfera", "Los océanos", "Las montañas"],
            correct: 0
        },
        {
            question: "¿Qué es la gravedad?",
            options: ["Una fuerza que atrae los objetos", "Una luz", "Un combustible"],
            correct: 0
        }
    ];

    const stars = Array.from({ length: 50 }, () => ({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT * 0.75,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.4 + 0.15
    }));

    const player = {
        x: 165,
        y: 120,
        width: 54,
        height: 28,
        speedX: 4.2,
        speedY: 5.5
    };

    const obstacles = [];
    const keys = {
        up: false,
        down: false,
        left: false,
        right: false
    };


    function getEarthY(x) {
        const normalized = x / GAME_WIDTH;
        const base = GAME_HEIGHT - 34;
        const curve = 46 * Math.pow((normalized - 0.5), 2);
        return base + curve;
    }
    
    function setNextPhaseDuration() {
        if (paceMode === "normal") {
            currentPhaseDuration = 6500 + Math.random() * 2500; // 6.5s a 9s
        } else if (paceMode === "intense") {
            currentPhaseDuration = 3000 + Math.random() * 1800; // 3s a 4.8s
        } else {
            currentPhaseDuration = 2500 + Math.random() * 1800; // 2.5s a 4.3s
        }
    }

    function resetGame() {
        gameStarted = false;
        gameOver = false;
        score = 0;
        lastTime = 0;
        obstacleTimer = 0;
        bananaTimer = 0;
        earthOffset = 0;

        obstacles.length = 0;
        bananas.length = 0;

        shieldCount = 0;
        bananaChance = 0.55;
        bananaInterval = 7000;

        burstTimer = 0;
        burstShotsPending = 0;
        lastBurstType = null;

        explosion = null;
        playerVisible = true;

        rescueUsed = false;
        waitingForAnswer = false;
        pendingQuestion = null;

        lastObstacleLane = null;
        previousObstacleLane = null;

        paceTimer = 0;
        paceMode = "normal";
        currentPaceMultiplier = 1.0;
        targetPaceMultiplier = 1.0;
        setNextPhaseDuration();
        rescueCause = null;
        touchTarget = null;
        resultMessage = "";
        resultTimer = 0;
        pendingGameOverAfterMessage = false;

        player.x = 165;
        player.y = 120;

        keys.up = false;
        keys.down = false;
        keys.left = false;
        keys.right = false;

        draw();
    }

    function triggerGameOverExplosion() {
        if (explosion || gameOver) return;

        explosion = {
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            radius: 10,
            life: 26
        };

        playerVisible = false;
    }

    function showRescueQuestion(cause = "obstacle") {
        if (rescueUsed) {
            triggerGameOverExplosion();
            return;
        }

        rescueUsed = true;
        rescueCause = cause;
        waitingForAnswer = true;
        pendingQuestion = scienceQuestions[Math.floor(Math.random() * scienceQuestions.length)];

        keys.up = false;
        keys.down = false;
        keys.left = false;
        keys.right = false;
    }

    function answerQuestion(selectedIndex) {
        if (!waitingForAnswer || !pendingQuestion) return;

        if (selectedIndex === pendingQuestion.correct) {
            waitingForAnswer = false;
            pendingQuestion = null;

            playerVisible = true;

            if (rescueCause === "earth") {
                player.x = Math.min(Math.max(player.x, 40), GAME_WIDTH - player.width - 40);
                player.y = GAME_HEIGHT - 175;
            } else {
                player.x = Math.min(Math.max(player.x, 40), GAME_WIDTH - player.width - 40);
                player.y = Math.min(Math.max(player.y, 35), GAME_HEIGHT - 130);
            }

            rescueCause = null;

            obstacles.length = 0;
            bananas.length = 0;
            burstShotsPending = 0;
            burstTimer = 0;
            obstacleTimer = 0;

            shieldCount = 0;
            lastObstacleLane = null;
            previousObstacleLane = null;

            resultMessage = "✅ Correcto, continúa la misión";
            resultTimer = 150;

            return;
        }

        waitingForAnswer = false;
        pendingQuestion = null;

        resultMessage = "❌ Error, no pudiste salvarte";
        resultTimer = 150;
        pendingGameOverAfterMessage = true;
    }

    function drawResultMessage() {
        if (resultTimer <= 0) return;

        ctx.save();

        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, GAME_HEIGHT/2 - 30, GAME_WIDTH, 60);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px Montserrat";
        ctx.textAlign = "center";
        ctx.fillText(resultMessage, GAME_WIDTH/2, GAME_HEIGHT/2 + 8);

        ctx.restore();
    }

    function startGame() {
        if (gameStarted && !gameOver) return;

        gameStarted = true;
        gameOver = false;
        lastTime = 0;

        if (animationId) cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(gameLoop);
    }

    function restartGame() {
        if (!gameOver) return;
        resetGame();
        startGame();
    }

    function handleActionButton() {
        const shouldOpenFullscreen =
            window.innerWidth <= 768 && !isGameFullscreenLike();

        if (!gameStarted && !gameOver) {
            if (shouldOpenFullscreen) {
                toggleFullscreen();
            }

            startGame();

        } else if (gameOver) {
            if (shouldOpenFullscreen) {
                toggleFullscreen();
            }

            restartGame();
        }
    }

    function pickObstacleType(excludedType = null) {
        let type = "normal";
        let attempts = 0;

        do {
            const random = Math.random();

            if (random > 0.74) {
                type = "special";
            } else if (random > 0.49) {
                type = "normal";
            } else {
                type = "small";
            }

            attempts++;
        } while (type === excludedType && attempts < 10);

        return type;
    }

    function spawnObstacle(isBurst = false) {
        const type = pickObstacleType(isBurst ? lastBurstType : null);

        let size;
        let points;
        let speed;

        if (type === "special") {
            size = Math.random() * 18 + 42;
            points = 30;
            speed = Math.min(8.9, 4.4 + score * 0.008 + Math.random() * 0.55);
        } else if (type === "normal") {
            size = Math.random() * 10 + 28;
            points = 10;
            speed = Math.min(9.8, 5.0 + score * 0.010 + Math.random() * 0.75);
        } else {
            size = Math.random() * 8 + 18;
            points = 15;
            speed = Math.min(10.9, 5.8 + score * 0.012 + Math.random() * 0.95);
        }

        const lanes = [36, 72, 110, 150, 192];
        let availableLanes = lanes.map((y, index) => ({ y, index }));

        if (lastObstacleLane !== null) {
            availableLanes = availableLanes.filter(
                lane => lane.index !== lastObstacleLane
            );
        }

        if (burstShotsPending === 0 && lastObstacleLane !== null) {
            availableLanes = availableLanes.filter(
                lane => Math.abs(lane.index - lastObstacleLane) > 1
            );
        }

        if (previousObstacleLane !== null && availableLanes.length > 2) {
            const filtered = availableLanes.filter(
                lane => lane.index !== previousObstacleLane
            );
            if (filtered.length > 0) {
                availableLanes = filtered;
            }
        }

        if (availableLanes.length === 0) {
            availableLanes = lanes
                .map((y, index) => ({ y, index }))
                .filter(lane => lane.index !== lastObstacleLane);
        }

        const selectedLane =
            availableLanes[Math.floor(Math.random() * availableLanes.length)];

        previousObstacleLane = lastObstacleLane;
        lastObstacleLane = selectedLane.index;

        if (isBurst) {
            lastBurstType = type;
        } else {
            lastBurstType = null;
        }

        obstacles.push({
            x: GAME_WIDTH + size,
            y: selectedLane.y,
            width: size,
            height: size,
            speed,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.04,
            type,
            points
        });
    }

    function spawnBanana() {
        const yMin = 40;
        const yMax = GAME_HEIGHT - 150;
        const y = Math.random() * (yMax - yMin) + yMin;

        bananas.push({
            x: GAME_WIDTH + 30,
            y,
            width: 30,
            height: 30,
            speed: 4.1,
            bobOffset: Math.random() * Math.PI * 2
        });
    }

    function update(deltaTime) {
        const deltaFactor = deltaTime / 16.666;

        paceTimer += deltaTime;

        if (resultTimer > 0) {
            resultTimer--;

            if (resultTimer <= 0 && pendingGameOverAfterMessage) {
                pendingGameOverAfterMessage = false;
                triggerGameOverExplosion();
            }

            return;
        }

        if (paceTimer > currentPhaseDuration) {
            if (paceMode === "normal") {
                paceMode = "intense";
            } else if (paceMode === "intense") {
                paceMode = "slow";
            } else {
                paceMode = "normal";
            }

            paceTimer = 0;
            setNextPhaseDuration();
        }

        if (paceMode === "intense") {
            targetPaceMultiplier = 1.18;
        } else if (paceMode === "slow") {
            targetPaceMultiplier = 0.92;
        } else {
            targetPaceMultiplier = 1.0;
        }

        // transición suave hacia el objetivo
        currentPaceMultiplier += (targetPaceMultiplier - currentPaceMultiplier) * 0.035;

        if (explosion) {
            explosion.radius += 2.4 * deltaFactor;
            explosion.life -= 1 * deltaFactor;

            if (explosion.life <= 0) {
                explosion = null;
                gameOver = true;

                const finalScore = Math.floor(score);

                if (finalScore > bestScore) {
                    bestScore = finalScore;
                    localStorage.setItem("teidesatKidsBestScore", bestScore);
                }
            }

            return;
        }

        if (gameOver) return;

        if (waitingForAnswer) return;

        earthOffset += 1.2 * deltaFactor;

        if (keys.left) {
            player.x -= player.speedX * deltaFactor;
        }
        if (keys.right) {
            player.x += player.speedX * deltaFactor;
        }
        if (keys.up) {
            player.y -= player.speedY * deltaFactor;
        }
        if (keys.down) {
            player.y += player.speedY * deltaFactor;
        }

        if (touchTarget) {
            player.x += ((touchTarget.x - 70) - player.x - player.width / 2) * 0.12;
            player.y += (touchTarget.y - player.y - player.height / 2) * 0.12;
        }

        if (player.x < 18) {
            player.x = 18;
        }

        if (player.x + player.width > GAME_WIDTH - 18) {
            player.x = GAME_WIDTH - player.width - 18;
        }

        if (player.y < 18) {
            player.y = 18;
        }

        const playerBottom = player.y + player.height;
        const earthAtPlayer = getEarthY(player.x + player.width * 0.5) - 20;

        if (playerBottom >= earthAtPlayer) {
            player.y = earthAtPlayer - player.height;
            showRescueQuestion("earth");
            return;
        }

        bananaTimer += deltaTime;

        if (bananaTimer > bananaInterval) {
            if (bananas.length === 0 && Math.random() < bananaChance) {
                spawnBanana();
            }

            bananaTimer = 0;
        }

        obstacleTimer += deltaTime;

        const difficulty = Math.min(1, score / 300);

        const baseSpawnInterval = Math.max(500, 1040 - score * 1.7);
        const phaseSpawnInterval =
            paceMode === "intense"
                ? Math.max(410, baseSpawnInterval - 110)
                : baseSpawnInterval;

        const spawnInterval = phaseSpawnInterval + (Math.random() * 80 - 40);

        const maxObstaclesOnScreen = score < 120 ? 6 : score < 260 ? 8 : 11;

        if (obstacleTimer > spawnInterval) {
            if (obstacles.length < maxObstaclesOnScreen) {
                spawnObstacle(false);

                const burstRoll = Math.random();
                const singleBurstChance = 0.20 + difficulty * 0.08;

                if (burstRoll < singleBurstChance && obstacles.length < maxObstaclesOnScreen) {
                    burstShotsPending = 1; // 2 meteoritos en total
                    burstTimer = 230 - difficulty * 20 + Math.random() * 90;
                }
            }

            obstacleTimer = 0;
        }

        if (burstShotsPending > 0) {
            burstTimer -= deltaTime;

            if (burstTimer <= 0) {
                if (obstacles.length < maxObstaclesOnScreen) {
                    spawnObstacle(true);
                }

                burstShotsPending--;

                if (burstShotsPending > 0) {
                    burstTimer = 205 - difficulty * 15 + Math.random() * 85;
                }
            }
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obstacle = obstacles[i];
            obstacle.x -= obstacle.speed * currentPaceMultiplier * deltaFactor;
            obstacle.rotation += obstacle.rotationSpeed * deltaFactor;

            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(i, 1);
                score += obstacle.points || 10;
                continue;
            }

            if (isColliding(player, obstacle)) {
                if (shieldCount > 0) {
                    shieldCount -= 1;
                    obstacles.splice(i, 1);
                    continue;
                } else {
                    obstacles.splice(i, 1);
                    showRescueQuestion("obstacle");
                    return;
                }
            }
        }

        for (let i = bananas.length - 1; i >= 0; i--) {
            const banana = bananas[i];
            banana.x -= banana.speed * deltaFactor;

            if (banana.x + banana.width < 0) {
                bananas.splice(i, 1);
                continue;
            }

            if (isColliding(player, banana)) {
                bananas.splice(i, 1);
                shieldCount = Math.min(5, shieldCount + 1);
            }
        }

        for (const star of stars) {
            star.x -= star.speed * deltaFactor;
            if (star.x < -4) {
                star.x = GAME_WIDTH + 4;
                star.y = Math.random() * GAME_HEIGHT * 0.75;
            }
        }
    }

    function isColliding(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    function isInsideArea(pointX, pointY, area) {
        return (
            pointX >= area.x &&
            pointX <= area.x + area.width &&
            pointY >= area.y &&
            pointY <= area.y + area.height
        );
    }

    function isIOSDevice() {
        return (
            /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        );
    }

    function isGameFullscreenLike() {
        const gameBox = canvas.closest(".teidesat-kids-game");

        return (
            !!document.fullscreenElement ||
            !!gameBox?.classList.contains("teidesat-kids-game--fake-fullscreen")
        );
    }

    function enterFakeFullscreen() {
        const gameBox = canvas.closest(".teidesat-kids-game");

        if (!gameBox) return;

        gameBox.classList.add("teidesat-kids-game--fake-fullscreen");
        document.body.classList.add("teidesat-kids-game-open");

        window.scrollTo(0, 0);
    }

    function exitFakeFullscreen() {
        const gameBox = canvas.closest(".teidesat-kids-game");

        if (!gameBox) return;

        gameBox.classList.remove("teidesat-kids-game--fake-fullscreen");
        document.body.classList.remove("teidesat-kids-game-open");

        setTimeout(() => {
            gameBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    }

    function toggleFullscreen() {
        const gameBox = canvas.closest(".teidesat-kids-game");

        if (!gameBox) return;

        const isIOS = isIOSDevice();

        if (isIOS || !gameBox.requestFullscreen) {
            if (gameBox.classList.contains("teidesat-kids-game--fake-fullscreen")) {
                exitFakeFullscreen();
            } else {
                enterFakeFullscreen();
            }

            return;
        }

        if (!document.fullscreenElement) {
            gameBox.requestFullscreen().catch(() => {
                enterFakeFullscreen();
            });
        } else {
            document.exitFullscreen().catch(() => {
                exitFakeFullscreen();
            });
        }
    }

    function drawExplosion() {
        if (!explosion) return;

        ctx.save();

        const alpha = explosion.life / 26;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffb347";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = "#fff2a8";
        ctx.fill();

        ctx.restore();
    }

    function drawBackground() {
        const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
        gradient.addColorStop(0, "#07101c");
        gradient.addColorStop(0.55, "#0b1628");
        gradient.addColorStop(1, "#101c30");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.save();
        ctx.beginPath();
        ctx.arc(GAME_WIDTH - 110, 85, 34, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(235, 240, 255, 0.9)";
        ctx.shadowColor = "rgba(210, 220, 255, 0.35)";
        ctx.shadowBlur = 20;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(GAME_WIDTH - 96, 74, 30, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(7, 16, 28, 0.18)";
        ctx.fill();
        ctx.restore();

        for (const star of stars) {
            const alpha = 0.45 + (star.size / 3) * 0.4;
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.save();
        ctx.shadowColor = "rgba(255,255,255,0.45)";
        ctx.shadowBlur = 12;

        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.beginPath();
        ctx.arc(140, 70, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(280, 120, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawEarth() {
        ctx.save();

        const horizonY = GAME_HEIGHT - 26;

        ctx.beginPath();
        ctx.moveTo(-80, GAME_HEIGHT);
        ctx.quadraticCurveTo(GAME_WIDTH * 0.5, GAME_HEIGHT - 110, GAME_WIDTH + 80, GAME_HEIGHT);
        ctx.closePath();

        const earthGradient = ctx.createLinearGradient(0, horizonY - 40, 0, GAME_HEIGHT);
        earthGradient.addColorStop(0, "#1e5fa8");
        earthGradient.addColorStop(0.55, "#184987");
        earthGradient.addColorStop(1, "#102f5d");
        ctx.fillStyle = earthGradient;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-60, horizonY);
        ctx.quadraticCurveTo(GAME_WIDTH * 0.5, GAME_HEIGHT - 118, GAME_WIDTH + 60, horizonY);
        ctx.strokeStyle = "rgba(102,224,224,0.9)";
        ctx.lineWidth = 4;
        ctx.shadowColor = "rgba(102,224,224,0.5)";
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = "rgba(255,255,255,0.10)";
        ctx.lineWidth = 1.5;

        for (let i = -200; i < GAME_WIDTH + 200; i += 90) {
            const x = i - (earthOffset % 90);
            ctx.beginPath();
            ctx.moveTo(x, GAME_HEIGHT);
            ctx.quadraticCurveTo(x + 28, GAME_HEIGHT - 36, x + 54, horizonY + 8);
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawPlayer() {
        const x = player.x;
        const y = player.y;

        ctx.save();

        ctx.shadowColor = "rgba(102,224,224,0.35)";
        ctx.shadowBlur = 18;

        ctx.fillStyle = "#dffcff";
        ctx.beginPath();
        ctx.roundRect(x, y + 6, player.width, player.height - 10, 10);
        ctx.fill();

        ctx.fillStyle = "#66e0e0";
        ctx.beginPath();
        ctx.moveTo(x + player.width, y + player.height * 0.5);
        ctx.lineTo(x + player.width + 16, y + player.height * 0.5 - 7);
        ctx.lineTo(x + player.width + 16, y + player.height * 0.5 + 7);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#9edfff";
        ctx.fillRect(x + 10, y + 2, 16, 6);
        ctx.fillRect(x + 10, y + player.height - 2, 16, 6);

        ctx.fillStyle = "#0b111b";
        ctx.beginPath();
        ctx.arc(x + 16, y + player.height * 0.5, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function drawObstacle(obstacle) {
        const cx = obstacle.x + obstacle.width / 2;
        const cy = obstacle.y + obstacle.height / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(obstacle.rotation);

        ctx.fillStyle = "#8ea0b8";
        ctx.beginPath();
        ctx.moveTo(-obstacle.width / 2, -obstacle.height / 4);
        ctx.lineTo(-obstacle.width / 6, -obstacle.height / 2);
        ctx.lineTo(obstacle.width / 2, -obstacle.height / 6);
        ctx.lineTo(obstacle.width / 3, obstacle.height / 2);
        ctx.lineTo(-obstacle.width / 3, obstacle.height / 3);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    function drawHud() {
        const marginX = 34;
        const top1 = 38;
        const top2 = 64;

        ctx.save();
        ctx.textAlign = "left";

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 17px Montserrat, sans-serif";
        ctx.fillText(`Puntos: ${Math.floor(score)}`, marginX, top1);

        ctx.fillStyle = "#9edfff";
        ctx.font = "bold 14px Montserrat, sans-serif";
        ctx.fillText(`Récord: ${bestScore}`, marginX, top2);

        if (shieldCount > 0) {
            ctx.fillStyle = "#ffd54a";
            ctx.font = "bold 18px Montserrat, sans-serif";
            ctx.fillText(`🛡 x${shieldCount}`, marginX, 88);
        }

        ctx.restore();
    }

    function drawStartMessage() {
        ctx.fillStyle = "rgba(255,255,255,0.96)";
        ctx.textAlign = "center";
        ctx.font = "bold 28px Montserrat, sans-serif";
        ctx.fillText("Mini misión espacial", GAME_WIDTH / 2, 96);

        ctx.font = "18px Montserrat, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.78)";
        ctx.fillText("Pulsa Jugar o usa WASD / flechas", GAME_WIDTH / 2, 130);
    }

    function drawGameOver() {
        ctx.save();
        ctx.fillStyle = "rgba(4, 10, 18, 0.58)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.textAlign = "center";

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 30px Montserrat, sans-serif";
        ctx.fillText("Fin de la misión", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 36);

        ctx.fillStyle = "#66e0e0";
        ctx.font = "bold 22px Montserrat, sans-serif";
        ctx.fillText(`Puntuación: ${Math.floor(score)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2);

        ctx.fillStyle = "rgba(255,255,255,0.82)";
        ctx.font = "17px Montserrat, sans-serif";
        ctx.fillText("Vuelve a intentarlo para llegar más lejos", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 34);

        ctx.restore();
    }

    function drawBanana(banana) {
        const time = performance.now() * 0.004;
        const bobY = Math.sin(time + banana.bobOffset) * 4;

        ctx.save();

        ctx.translate(
            banana.x + banana.width / 2,
            banana.y + banana.height / 2 + bobY
        );
        ctx.rotate(-0.38);

        ctx.shadowColor = "rgba(255, 213, 74, 0.55)";
        ctx.shadowBlur = 18;

        ctx.strokeStyle = "#ffd54a";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(0, 0, 11, 0.35, 2.45);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#fff2a8";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(1, -1, 8.5, 0.45, 2.3);
        ctx.stroke();

        ctx.fillStyle = "#d89b00";
        ctx.beginPath();
        ctx.ellipse(-8, -6, 2.2, 1.6, -0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(8, 6, 2.2, 1.6, -0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function drawShields() {
        if (shieldCount <= 0 || !playerVisible) return;

        const centerX = player.x + player.width / 2;
        const centerY = player.y + player.height / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 220, 80, 0.85)";
        ctx.lineWidth = 3;
        ctx.shadowColor = "rgba(255, 220, 80, 0.45)";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
    }

    function drawFullscreenButton() {
        ctx.save();

        const isFull = isGameFullscreenLike();
        const area = fullscreenButtonArea;

        ctx.fillStyle = "rgba(4, 10, 18, 0.55)";
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(area.x, area.y, area.width, area.height, 8);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 2;

        const x = area.x + 10;
        const y = area.y + 8;
        const w = area.width - 20;
        const h = area.height - 16;

        if (!isFull) {
            // Icono expandir
            ctx.beginPath();
            ctx.moveTo(x, y + 6);
            ctx.lineTo(x, y);
            ctx.lineTo(x + 6, y);

            ctx.moveTo(x + w - 6, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w, y + 6);

            ctx.moveTo(x, y + h - 6);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x + 6, y + h);

            ctx.moveTo(x + w - 6, y + h);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x + w, y + h - 6);
            ctx.stroke();
        } else {
            // Icono contraer
            ctx.beginPath();
            ctx.moveTo(x + 6, y);
            ctx.lineTo(x + 6, y + 6);
            ctx.lineTo(x, y + 6);

            ctx.moveTo(x + w - 6, y);
            ctx.lineTo(x + w - 6, y + 6);
            ctx.lineTo(x + w, y + 6);

            ctx.moveTo(x + 6, y + h);
            ctx.lineTo(x + 6, y + h - 6);
            ctx.lineTo(x, y + h - 6);

            ctx.moveTo(x + w - 6, y + h);
            ctx.lineTo(x + w - 6, y + h - 6);
            ctx.lineTo(x + w, y + h - 6);
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawQuestionPanel() {
        if (!waitingForAnswer || !pendingQuestion) return;

        ctx.save();

        ctx.fillStyle = "rgba(4, 10, 18, 0.78)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.fillStyle = "rgba(15, 23, 41, 0.96)";
        ctx.strokeStyle = "rgba(102,224,224,0.45)";
        ctx.lineWidth = 2;

        const boxX = 110;
        const boxY = 42;
        const boxW = GAME_WIDTH - 220;
        const boxH = 245;

        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 24);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = "center";

        ctx.fillStyle = "#66e0e0";
        ctx.font = "bold 18px Montserrat, sans-serif";
        ctx.fillText("¡Sistema de rescate activado!", GAME_WIDTH / 2, boxY + 38);

        ctx.fillStyle = "rgba(255,255,255,0.72)";
        ctx.font = "14px Montserrat, sans-serif";
        ctx.fillText("Responde bien para continuar la misión", GAME_WIDTH / 2, boxY + 62);

        ctx.font = "16px Montserrat, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.88)";

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 17px Montserrat, sans-serif";
        ctx.fillText(pendingQuestion.question, GAME_WIDTH / 2, boxY + 95);

        questionOptionAreas.length = 0;

        for (let i = 0; i < pendingQuestion.options.length; i++) {
            const optionX = boxX + 80;
            const optionY = boxY + 112 + i * 36;
            const optionW = boxW - 160;
            const optionH = 30;

            questionOptionAreas.push({
                x: optionX,
                y: optionY,
                width: optionW,
                height: optionH,
                index: i
            });

            ctx.fillStyle = "rgba(255,255,255,0.06)";
            ctx.strokeStyle = "rgba(255,255,255,0.10)";
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.roundRect(optionX, optionY, optionW, optionH, 10);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 15px Montserrat, sans-serif";
            ctx.fillText(`${i + 1}. ${pendingQuestion.options[i]}`, GAME_WIDTH / 2, optionY + 20);
        }

        ctx.fillStyle = "rgba(255,255,255,0.60)";
        ctx.font = "13px Montserrat, sans-serif";
        ctx.fillText("Pulsa una opción para continuar", GAME_WIDTH / 2, boxY + 225);

        ctx.restore();
    }

    function drawGameButton() {
        if (gameStarted && !gameOver) return;

        const text = gameOver ? "Reiniciar" : "Jugar";

        ctx.save();

        if (gameOver) {
            ctx.fillStyle = "#ffd54a";
            ctx.strokeStyle = "rgba(255,255,255,0.75)";
        } else {
            ctx.fillStyle = "#66e0e0";
            ctx.strokeStyle = "rgba(255,255,255,0.65)";
        }

        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.roundRect(
            gameButtonArea.x,
            gameButtonArea.y,
            gameButtonArea.width,
            gameButtonArea.height,
            22
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#07111f";
        ctx.font = "bold 18px Montserrat, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            text,
            gameButtonArea.x + gameButtonArea.width / 2,
            gameButtonArea.y + 30
        );

        ctx.restore();
    }

   function draw() {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        drawBackground();
        drawEarth();

        for (const obstacle of obstacles) {
            drawObstacle(obstacle);
        }

        for (const banana of bananas) {
            drawBanana(banana);
        }

        if (playerVisible) {
            drawPlayer();
        }

        drawShields();
        drawExplosion();
        drawHud();

        if (!gameStarted) {
            drawStartMessage();
        }

        if (gameOver) {
            drawGameOver();
        } else {
            drawQuestionPanel();
            drawResultMessage();
        }

        drawGameButton();
        drawFullscreenButton();
    }

    function gameLoop(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = Math.min(timestamp - lastTime, 32);
        lastTime = timestamp;

        update(deltaTime);
        draw();

        if (!gameOver || explosion) {
            animationId = requestAnimationFrame(gameLoop);
        }
    }

    function handleKeyDown(e) {
        if (waitingForAnswer) {
            if (e.code === "Digit1" || e.code === "Numpad1") answerQuestion(0);
            if (e.code === "Digit2" || e.code === "Numpad2") answerQuestion(1);
            if (e.code === "Digit3" || e.code === "Numpad3") answerQuestion(2);
            return;
        }

        if (!gameStarted || gameOver) return;

        if (e.code === "ArrowLeft" || e.code === "KeyA") {
            e.preventDefault();
            keys.left = true;
        }

        if (e.code === "ArrowRight" || e.code === "KeyD") {
            e.preventDefault();
            keys.right = true;
        }

        if (e.code === "ArrowUp" || e.code === "KeyW") {
            e.preventDefault();
            keys.up = true;
        }

        if (e.code === "ArrowDown" || e.code === "KeyS") {
            e.preventDefault();
            keys.down = true;
        }
    }

    function handleKeyUp(e) {
        if (e.code === "ArrowLeft" || e.code === "KeyA") {
            keys.left = false;
        }

        if (e.code === "ArrowRight" || e.code === "KeyD") {
            keys.right = false;
        }

        if (e.code === "ArrowUp" || e.code === "KeyW") {
            keys.up = false;
        }

        if (e.code === "ArrowDown" || e.code === "KeyS") {
            keys.down = false;
        }
    }

    function handleTouchStart(e) {
        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const touchX = ((touch.clientX - rect.left) / rect.width) * GAME_WIDTH;
        const touchY = ((touch.clientY - rect.top) / rect.height) * GAME_HEIGHT;

        if (isInsideArea(touchX, touchY, fullscreenButtonArea)) {
            toggleFullscreen();
            return;
        }

        if ((!gameStarted || gameOver) && isInsideArea(touchX, touchY, gameButtonArea)) {
            handleActionButton();
            return;
        }

        if (waitingForAnswer) {
            for (const area of questionOptionAreas) {
                if (isInsideArea(touchX, touchY, area)) {
                    answerQuestion(area.index);
                    return;
                }
            }
            return;
        }

        if (!gameStarted || gameOver) return;

        touchTarget = {
            x: touchX,
            y: touchY
        };
    }

    function handleTouchMove(e) {
        if (!gameStarted || gameOver || waitingForAnswer || resultTimer > 0) return;

        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        touchTarget = {
            x: ((touch.clientX - rect.left) / rect.width) * GAME_WIDTH,
            y: ((touch.clientY - rect.top) / rect.height) * GAME_HEIGHT
        };
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        touchTarget = null;
    }

    function handleCanvasClick(e) {
        const rect = canvas.getBoundingClientRect();

        const clickX = ((e.clientX - rect.left) / rect.width) * GAME_WIDTH;
        const clickY = ((e.clientY - rect.top) / rect.height) * GAME_HEIGHT;

        if (isInsideArea(clickX, clickY, fullscreenButtonArea)) {
            toggleFullscreen();
            return;
        }

        if (isInsideArea(clickX, clickY, gameButtonArea)) {
            handleActionButton();
            return;
        }

        if (waitingForAnswer) {
            for (const area of questionOptionAreas) {
                if (isInsideArea(clickX, clickY, area)) {
                    answerQuestion(area.index);
                    return;
                }
            }
        }
    }

    if (canvas.dataset.bound !== "true") {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
        canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

        canvas.dataset.bound = "true";
    }

    document.addEventListener("fullscreenchange", () => {
        const gameBox = canvas.closest(".teidesat-kids-game");

        if (!gameBox) return;

        if (!document.fullscreenElement) {
            gameBox.classList.remove("teidesat-kids-game--fake-fullscreen");
            document.body.classList.remove("teidesat-kids-game-open");

            setTimeout(() => {
                gameBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 150);
        }
    });

    resetGame();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeidesatKidsGame);
} else {
    initTeidesatKidsGame();
}