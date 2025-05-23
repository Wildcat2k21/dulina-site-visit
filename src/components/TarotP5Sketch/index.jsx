import { useRef } from 'react';
import { cardProperties } from './consts';
import { gaussian } from './math';
import Sketch from 'react-p5';
import { calcTarotSketchSize, ResizeTarotSketch } from './helpers';
import './index.css';

// Карта, которую хотим отобразить
const renderQuality = 0.5;

const randArrElem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export default function TarotSketch({ dayCard }) {
  const angleRef = useRef(0);

  const modelsRef = useRef({
    card: null,
    cardpack: null,
  });

  const texturesRef = useRef({
    card: {},
    cardLeft: {},
    cardRight: {},
    cardpack: null,
    plane: null,
  });

  const cam = useRef(null);
  const parentRef = useRef(null);

  const preload = (p5) => {
    // Загружаем OBJ модели
    modelsRef.current.card = p5.loadModel('/models/card.obj', true);
    modelsRef.current.cardpack = p5.loadModel('/models/cardpack.obj', true);

    const leftCard = randArrElem(Object.values(cardProperties));
    const rightCard = randArrElem(Object.values(cardProperties));

    // Загружаем текстуры
    texturesRef.current.card = {
      image: p5.loadImage(dayCard.path),
      item: dayCard,
    };

    texturesRef.current.cardLeft = {
      image: p5.loadImage(leftCard.path),
      item: leftCard,
    };

    texturesRef.current.cardRight = {
      image: p5.loadImage(rightCard.path),
      item: rightCard,
    };

    texturesRef.current.cardpack = p5.loadImage(
      '/models/cards-package-map.png',
    );
    texturesRef.current.plane = p5.loadImage('/models/plane-white-marble.jpg');
  };

  const setup = (p5, canvasParentRef) => {
    parentRef.current = canvasParentRef;
    p5.pixelDensity(2);

    const { width, height } = calcTarotSketchSize(
      canvasParentRef,
      renderQuality,
    );
    p5.createCanvas(width, height, p5.WEBGL).parent(canvasParentRef);

    cam.current = p5.createCamera();
    cam.current.setPosition(0, 400, 600);
    cam.current.lookAt(0, 200, 0);
  };

  let angle = 0;

  const draw = (p5) => {
    p5.background(0);
    p5.scale(1.3);
    p5.rotateY(angleRef.current);

    // координаты камеры по окружности
    let radius = 10;
    let x = radius * p5.cos(angle);
    let z = radius * p5.sin(angle);
    cam.current.setPosition(x + 20, 250 + z, 400);
    cam.current.lookAt(20, 150, 0);

    angle += 0.02;

    // Освещение (Глобально)
    p5.ambientLight(50);
    p5.pointLight(255, 255, 255, 50, -250, 200);

    // Рендер плоскости
    p5.push();
    p5.specularMaterial(150);
    p5.shininess(50);
    p5.texture(texturesRef.current.plane);
    p5.translate(0, 100, 0);
    p5.noStroke();

    const { width: planeWidth, height: planeHeight } =
      texturesRef.current.plane;

    p5.plane(planeWidth * 1.25, planeHeight * 1.25);
    p5.pop();

    // Рендер пачки
    if (modelsRef.current.cardpack && texturesRef.current.cardpack) {
      p5.push();
      p5.specularMaterial(150);
      p5.shininess(50);

      p5.translate(0, 0, 25);
      p5.noStroke();
      p5.scale(1, -1, 1);
      p5.rotateY(-p5.HALF_PI);
      p5.rotateX(-p5.HALF_PI / 2);
      p5.texture(texturesRef.current.cardpack);
      p5.model(modelsRef.current.cardpack);
      p5.pop();
    }

    // Рендер карты
    if (modelsRef.current.card && texturesRef.current.card) {
      const cardsLightX = (p5.millis() % 3000) - 1500;
      p5.ambientLight(100);

      // Подсвечивание карты
      const cardLightning = (h = 100) => {
        const l = 50 * gaussian(cardsLightX, 300);
        for (let i = 1; i < 20; i++) {
          p5.pointLight(l, l, l, cardsLightX, 0 + 100 * i, h); // Источник точеченого света
        }
      };

      const rotIfRev = (flag = false) => {
        return flag ? p5.PI : 0;
      };

      // Центральная карта
      p5.push();
      p5.pointLight(255, 255, 255, 50, -100, 400);
      p5.translate(-50, 175, 150); //0 200 5
      cardLightning(300);
      p5.specularMaterial(125);
      p5.shininess(5);

      p5.noStroke();
      p5.rotateX(
        -p5.PI / 16 + rotIfRev(texturesRef.current.card.item.reverseFlag),
      );
      p5.rotateY(p5.HALF_PI);
      p5.texture(texturesRef.current.card.image);
      p5.model(modelsRef.current.card);
      p5.pop();

      // Левая карта
      p5.push();
      p5.translate(-150, 225, 55);
      cardLightning(150);
      p5.specularMaterial(125);
      p5.shininess(5);

      p5.noStroke();
      p5.rotateY(p5.HALF_PI * 1.3);
      p5.rotateX(
        p5.PI -
          p5.HALF_PI / 8 +
          rotIfRev(texturesRef.current.cardLeft.item.reverseFlag),
      );
      p5.texture(texturesRef.current.cardLeft.image);
      p5.model(modelsRef.current.card);
      p5.pop();

      // Правая карта
      p5.push();
      p5.translate(150, 225, 5);
      cardLightning();
      p5.specularMaterial(125);
      p5.shininess(5);

      p5.noStroke();
      p5.rotateY(p5.HALF_PI);
      p5.rotateX(
        p5.PI +
          p5.HALF_PI / 8 +
          rotIfRev(texturesRef.current.cardRight.item.reverseFlag),
      );
      p5.texture(texturesRef.current.cardRight.image);
      p5.model(modelsRef.current.card);
      p5.pop();
    }
  };

  const resizeTarotSketch = ResizeTarotSketch(parentRef, renderQuality);
  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={resizeTarotSketch}
    />
  );
}
