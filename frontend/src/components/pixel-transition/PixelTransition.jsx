import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./pixel-transition.css";

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  className = "",
  style = {},
  aspectRatio = "100%",
}) {
  const defaultRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);
  const isActiveRef = useRef(false);
  const [isActive, setIsActive] = useState(false);

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return undefined;

    pixelGridEl.innerHTML = "";

    if (typeof document === "undefined") return undefined;

    for (let row = 0; row < gridSize; row += 1) {
      for (let col = 0; col < gridSize; col += 1) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixelated-image-card__pixel");
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }

    return () => {
      pixelGridEl.innerHTML = "";
    };
  }, [gridSize, pixelColor]);

  useEffect(() => {
    return () => {
      const pixelGridEl = pixelGridRef.current;
      if (pixelGridEl) {
        const pixels = pixelGridEl.querySelectorAll(".pixelated-image-card__pixel");
        gsap.killTweensOf(pixels);
      }
      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
        delayedCallRef.current = null;
      }
    };
  }, []);

  const animatePixels = useCallback(
    (activate) => {
      isActiveRef.current = activate;
      setIsActive(activate);

      const defaultEl = defaultRef.current;
      const pixelGridEl = pixelGridRef.current;
      const activeEl = activeRef.current;
      if (!pixelGridEl || !activeEl) return;

      const pixels = pixelGridEl.querySelectorAll(".pixelated-image-card__pixel");
      if (!pixels.length) return;

      gsap.killTweensOf([pixels, defaultEl, activeEl]);
      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
      }

      gsap.set(pixels, { display: "none", opacity: 0 });

      const totalPixels = pixels.length;
      const staggerDuration = animationStepDuration / totalPixels;

      gsap.to(pixels, {
        display: "block",
        opacity: 1,
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: activate ? "random" : "end",
        },
      });

      if (defaultEl) {
        gsap.killTweensOf(defaultEl);
        gsap.to(defaultEl, {
          opacity: activate ? 0 : 1,
          duration: 0.22,
          ease: "power2.out",
          delay: activate ? 0 : animationStepDuration,
        });
      }

      delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
        activeEl.style.display = activate ? "block" : "none";
        activeEl.style.pointerEvents = activate ? "auto" : "none";
        if (defaultEl) {
          defaultEl.style.pointerEvents = activate ? "none" : "";
        }
      });

      if (activate) {
        gsap.set(activeEl, { opacity: 0, display: "block" });
        gsap.to(activeEl, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          delay: animationStepDuration * 0.6,
        });
      } else {
        gsap.to(activeEl, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            activeEl.style.display = "none";
            activeEl.style.pointerEvents = "none";
          },
        });
      }

      gsap.to(pixels, {
        opacity: 0,
        duration: 0,
        delay: animationStepDuration,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
        onComplete: () => {
          if (!activate && defaultEl) {
            defaultEl.style.pointerEvents = "";
          }
        },
      });
    },
    [animationStepDuration]
  );

  const handleMouseEnter = () => {
    if (!isActiveRef.current) animatePixels(true);
  };

  const handleMouseLeave = () => {
    if (isActiveRef.current) animatePixels(false);
  };

  const handleClick = () => {
    animatePixels(!isActive);
  };

  return (
    <div
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" ref={defaultRef}>
        {firstContent}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef}>
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

export default PixelTransition;
