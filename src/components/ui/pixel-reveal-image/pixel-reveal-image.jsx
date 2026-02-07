import { useEffect, useRef } from "react";
import styles from "./PixelRevealImage.module.css";

export default function PixelRevealImage({
  src,
  className = "",
  inView = false,
  pixelSize = 100,
  duration = 800,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const animRef = useRef(null);
  const imgRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    imgRef.current = img;

    img.onload = () => {
      progressRef.current = 0;
      draw(0);
    };
  }, [src]);

  useEffect(() => {
    if (!inView) return;
    cancelAnimationFrame(animRef.current);
    animateToSharp();
  }, [inView]);

  const draw = (progress) => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!canvas || !wrapper || !img) return;

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

    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = h;
      drawWidth = h * imgRatio;
      offsetX = (w - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = w;
      drawHeight = w / imgRatio;
      offsetX = 0;
      offsetY = (h - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    if (progress >= 1) {
      canvas.width = displayW;
      canvas.height = displayH;
      ctx.imageSmoothingEnabled = true;

      const finalRatio = img.width / img.height;
      const finalCanvasRatio = displayW / displayH;

      let fW, fH, fX, fY;

      if (finalRatio > finalCanvasRatio) {
        fH = displayH;
        fW = displayH * finalRatio;
        fX = (displayW - fW) / 2;
        fY = 0;
      } else {
        fW = displayW;
        fH = displayW / finalRatio;
        fX = 0;
        fY = (displayH - fH) / 2;
      }

      ctx.drawImage(img, fX, fY, fW, fH);
    }
  };

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

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
