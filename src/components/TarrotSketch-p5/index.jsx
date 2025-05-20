import React, { useRef } from "react";
import Sketch from "react-p5";

// Объект всех текстур карт по названиям
const cardTextures = {
  "ace-of-pentacles": "/models/card-maps/card-ace-of-pentacles.png",
  "ace-of-wands": "/models/card-maps/card-ace-of-wands.png",
  "devil": "/models/card-maps/card-devil.png",
  "eight-of-swords": "/models/card-maps/card-eight-of-swords.png",
  "high-priestess": "/models/card-maps/card-high-priestess.png",
  "judgement": "/models/card-maps/card-judgement.png",
  "star": "/models/card-maps/card-star.png",
  "three-of-pentacles": "/models/card-maps/card-three-of-pentacles.png",
  "two-of-cups": "/models/card-maps/card-two-of-cups.png",
  "wheel-of-fortune": "/models/card-maps/card-wheel-of-fortune.png",
};

// Карта, которую хотим отобразить
const currentCard = "judgement";
const cardLeft = "star";
const cardRight = "two-of-cups";

export default function TarrotSketch() {
  const angleRef = useRef(0);

  const modelsRef = useRef({
    card: null,
    cardpack: null,
  });

  const texturesRef = useRef({
    card: null,
    cardLeft: null,
    cardRight: null,
    cardpack: null,
    plane: null
  });

  const cam = useRef(null);

  const preload = (p5) => {
    // Загружаем OBJ модели
    modelsRef.current.card = p5.loadModel("/models/card.obj", true);
    modelsRef.current.cardpack = p5.loadModel("/models/cardpack.obj", true);

    // Загружаем текстуры
    texturesRef.current.card = p5.loadImage(cardTextures[currentCard]);
    texturesRef.current.cardLeft = p5.loadImage(cardTextures[cardLeft]);
    texturesRef.current.cardRight = p5.loadImage(cardTextures[cardRight]);
    texturesRef.current.cardpack = p5.loadImage("/models/cards-package-map.png");
    texturesRef.current.plane = p5.loadImage("/models/plane-texture.jpg");
  };

  const setup = (p5, canvasParentRef) => {
    p5.pixelDensity(2);
    p5.createCanvas(800, 600, p5.WEBGL)
    .parent(canvasParentRef);

    cam.current = p5.createCamera();
    cam.current.setPosition(0, 400, 600);
    cam.current.lookAt(0, 200, 0);
  };

  let angle = 0;
  const draw = (p5) => {

    p5.background(0);
    p5.orbitControl(); // Мышиное вращение сцены
    p5.scale(1.3);
    p5.rotateY(angleRef.current);
    // angleRef.current += 0.01;
    // Рендер плоскости с текстурой


    // координаты камеры по окружности
    let radius = 50;

    // в draw():
    let x = radius * p5.cos(angle);
    let z = radius * p5.sin(angle);
    cam.current.setPosition(x, 250 + z, 400);
    cam.current.lookAt(0, 150, 0);

    // cam.current.setPosition(0, 400, 600);
    // cam.current.lookAt(0, 200, 0);

    angle += 0.01;

    // Освещение
    p5.ambientLight(50);
    p5.pointLight(255, 255, 255, 50, -250, 200); // точка

    p5.push();
    p5.specularMaterial(50);  // белый блеск
    p5.shininess(25);          // средняя сила блика
    
    p5.texture(texturesRef.current.plane);
    p5.translate(0, 100, 0);
    p5.noStroke();
    p5.plane(1000, 1000);
    p5.pop();

    // Рендер пачки
    if (modelsRef.current.cardpack && texturesRef.current.cardpack) {
      p5.push();
      p5.specularMaterial(150);  // белый блеск
      p5.shininess(50);          // средняя сила блика

      p5.translate(0, 0, 25);
      p5.noStroke();
      p5.scale(1, -1, 1);
      p5.rotateY(-p5.HALF_PI);
      p5.rotateX(-p5.HALF_PI/2);
      p5.texture(texturesRef.current.cardpack);
      p5.model(modelsRef.current.cardpack);
      p5.pop();
    }

    // Рендер карты
    if (modelsRef.current.card && texturesRef.current.card) {

      const cardsLightX = (p5.frameCount * 10 % 3000) - 1500;

      function gaussian(x, sigma = 1) {
        return Math.exp(-(x * x) / (2 * sigma * sigma));
      }

      const l = 100 * gaussian(cardsLightX, 300);
      p5.pointLight(l, l, l, cardsLightX, 150, 100); // точка
      p5.pointLight(l, l, l, cardsLightX, 250, 100); // точка
      p5.pointLight(l, l, l, cardsLightX, 350, 100); // точка
      p5.pointLight(l, l, l, cardsLightX, 450, 100); // точка

      // Центральная карта
      p5.push();
      p5.translate(0, 250, 5); // немного выдвинуть карту вперед
      p5.specularMaterial(125);  // белый блеск
      p5.shininess(5);          // средняя сила блика

      p5.noStroke();
      p5.rotateY(p5.HALF_PI);
      p5.rotateX(p5.PI);
      p5.texture(texturesRef.current.card);
      p5.model(modelsRef.current.card);
      p5.pop();

      // Левая карта
      p5.push();
      p5.translate(-150, 225, 5); // немного выдвинуть карту вперед'
      p5.specularMaterial(125);  // белый блеск
      p5.shininess(5);          // средняя сила блика

      p5.noStroke();
      p5.rotateY(p5.HALF_PI);
      p5.rotateX(p5.PI - p5.HALF_PI/8)
      p5.texture(texturesRef.current.cardLeft);
      p5.model(modelsRef.current.card);
      p5.pop();

      // Правая карта
      p5.push();
      p5.translate(150, 225, 5); // немного выдвинуть карту вперед
      p5.specularMaterial(125);  // белый блеск
      p5.shininess(5);          // средняя сила блика

      p5.noStroke();
      p5.rotateY(p5.HALF_PI);
      p5.rotateX(p5.PI + p5.HALF_PI/8)
      p5.texture(texturesRef.current.cardRight);
      p5.model(modelsRef.current.card);
      p5.pop();
    }
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
}
