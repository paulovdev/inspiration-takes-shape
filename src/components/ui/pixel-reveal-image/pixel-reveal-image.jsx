import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PixelRevealImage.module.css";

export default function PixelRevealImage({
  src,
  alt = "",
  className = "",
  inView = false,
  pixelSize = 100,
  duration = 800,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const animRef = useRef(null);
  const progressRef = useRef(0);
  const offscreenRef = useRef(null);
  const [imgReady, setImgReady] = useState(false);

  // 🔹 Cria versão leve da imagem no tamanho do container
  const prepareOffscreen = (img) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const displayW = rect.width;
    const displayH = rect.height;

    if (!displayW || !displayH) return;

    const off = document.createElement("canvas");
    off.width = displayW;
    off.height = displayH;

    const octx = off.getContext("2d");
    octx.imageSmoothingEnabled = true;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayW / displayH;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = displayH;
      drawWidth = displayH * imgRatio;
      offsetX = (displayW - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = displayW;
      drawHeight = displayW / imgRatio;
      offsetX = 0;
      offsetY = (displayH - drawHeight) / 2;
    }

    octx.clearRect(0, 0, displayW, displayH);
    octx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    offscreenRef.current = off;
  };

  // 🔹 Desenha pixelização (agora super leve)
  const draw = (progress) => {
    const canvas = canvasRef.current;
    const offscreen = offscreenRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !offscreen || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = wrapper.getBoundingClientRect();
    const displayW = rect.width;
    const displayH = rect.height;

    const currentPixel = Math.max(1, pixelSize * (1 - progress));

    const w = Math.ceil(displayW / currentPixel);
    const h = Math.ceil(displayH / currentPixel);

    canvas.width = w;
    canvas.height = h;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);

    // 🔥 Desenha do canvas leve em vez da imagem gigante
    ctx.drawImage(offscreen, 0, 0, w, h);

    // Fase final nítida (igual ao seu código original)
    if (progress >= 1) {
      canvas.width = displayW;
      canvas.height = displayH;
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, displayW, displayH);
      ctx.drawImage(offscreen, 0, 0, displayW, displayH);
    }
  };

  // 🔹 Animação
  const animateToSharp = () => {
    let start = null;

    const step = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      progressRef.current = progress;

      draw(progress);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);
  };

  // 🔹 Quando imagem do Next termina de carregar
  const handleImageReady = (img) => {
    prepareOffscreen(img);
    progressRef.current = 0;
    draw(0);
    setImgReady(true);
  };

  // 🔹 Dispara animação ao entrar na viewport
  useEffect(() => {
    if (!inView || !imgReady) return;
    cancelAnimationFrame(animRef.current);
    animateToSharp();
  }, [inView, imgReady]);

  // 🔹 Redesenha se a tela mudar de tamanho
  useEffect(() => {
    const handleResize = () => {
      if (!imgReady) return;
      prepareOffscreen(offscreenRef.current);
      draw(progressRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imgReady]);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority
        onLoadingComplete={handleImageReady}
        style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}
      />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
