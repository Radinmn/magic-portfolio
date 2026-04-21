"use client";

import { useEffect, useMemo, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
  seed: number;
};

export default function OceanClickEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  // const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    let idCounter = 0;

    const handleMove = (e: MouseEvent) => {
      // setMouse({
        // x: e.clientX,
        // y: e.clientY,
        // active: true,
      // });
    };

    const handleLeave = () => {
      // setMouse((prev) => ({ ...prev, active: false }));
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.closest(
          'a, button, input, textarea, select, [role="button"], [data-no-ripple="true"]',
        )
      ) {
        return;
      }

      const id = idCounter++;
      const seed = Math.random();

      setRipples((prev) => [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY,
          seed,
        },
      ]);

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 3200);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // const ambientStyle = useMemo(
  //   () => ({
  //     left: mouse.x,
  //     top: mouse.y,
  //     opacity: mouse.active ? 1 : 0,
  //   }),
  //   [mouse],
  // );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <div className="ocean-caustics" />

      <div
        className="cursor-ambient"
        // style={ambientStyle}
      />

      {ripples.map((ripple) => (
        <RippleEffect key={ripple.id} ripple={ripple} />
      ))}

      <style jsx>{`
        .ocean-caustics {
          position: absolute;
          inset: -20%;
          opacity: 0.16;
          background:
            radial-gradient(circle at 20% 30%, rgba(120, 190, 255, 0.07), transparent 28%),
            radial-gradient(circle at 80% 20%, rgba(80, 160, 255, 0.05), transparent 30%),
            radial-gradient(circle at 50% 80%, rgba(100, 180, 255, 0.05), transparent 32%);
          filter: blur(50px) saturate(115%);
          animation: causticDrift 14s ease-in-out infinite alternate;
          transform: translateZ(0);
        }

        .cursor-ambient {
          position: absolute;
          width: 360px;
          height: 360px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background:
            radial-gradient(circle, rgba(90, 170, 255, 0.10) 0%, rgba(90, 170, 255, 0.05) 28%, rgba(90, 170, 255, 0.018) 48%, rgba(90, 170, 255, 0) 72%);
          filter: blur(30px);
          transition: opacity 220ms ease;
          will-change: transform, opacity;
        }

        @keyframes causticDrift {
          0% {
            transform: translate3d(-2%, -1%, 0) scale(1) rotate(0deg);
          }
          50% {
            transform: translate3d(2%, 1%, 0) scale(1.04) rotate(4deg);
          }
          100% {
            transform: translate3d(-1%, 2%, 0) scale(1.02) rotate(-3deg);
          }
        }
      `}</style>
    </div>
  );
}

function RippleEffect({ ripple }: { ripple: Ripple }) {
  const particles = Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 10 + ripple.seed * 1.4;
    const distance = 55 + ((i % 3) * 18 + ripple.seed * 12);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const delay = i * 35;
    const size = 3 + (i % 3);

    return { x, y, delay, size, id: i };
  });

  return (
    <div
      style={{
        position: "absolute",
        left: ripple.x,
        top: ripple.y,
        width: 0,
        height: 0,
      }}
    >
      <span className="coreGlow" />
      <span className="shockwave" />
      <span className="ring ring1" />
      <span className="ring ring2" />
      <span className="ring ring3" />
      <span className="ring ring4" />
      <span className="mist mist1" />
      <span className="mist mist2" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            ["--tx" as string]: `${particle.x}px`,
            ["--ty" as string]: `${particle.y}px`,
            ["--delay" as string]: `${particle.delay}ms`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}

      <style jsx>{`
        .coreGlow {
          position: absolute;
          left: 0;
          top: 0;
          width: 30px;
          height: 30px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background:
            radial-gradient(circle, rgba(170, 225, 255, 0.9) 0%, rgba(110, 190, 255, 0.32) 20%, rgba(80, 160, 255, 0.14) 42%, rgba(80, 160, 255, 0.04) 60%, rgba(80, 160, 255, 0) 75%);
          filter: blur(3px);
          animation: coreGlow 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .shockwave {
          position: absolute;
          left: 0;
          top: 0;
          width: 70px;
          height: 70px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background:
            radial-gradient(circle, rgba(130, 210, 255, 0.16) 0%, rgba(90, 170, 255, 0.09) 34%, rgba(90, 170, 255, 0.03) 52%, rgba(90, 170, 255, 0) 70%);
          filter: blur(8px);
          animation: shockwave 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ring {
          position: absolute;
          left: 0;
          top: 0;
          width: 46px;
          height: 46px;
          transform: translate(-50%, -50%) scale(0.2);
          border-radius: 9999px;
          will-change: transform, opacity;
        }

        .ring1 {
          border: 1px solid rgba(160, 225, 255, 0.48);
          box-shadow:
            0 0 20px rgba(110, 190, 255, 0.22),
            inset 0 0 16px rgba(180, 235, 255, 0.08);
          animation: ring1 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ring2 {
          border: 1px solid rgba(120, 200, 255, 0.24);
          animation: ring2 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards 90ms;
          opacity: 0;
        }

        .ring3 {
          border: 1px solid rgba(90, 170, 255, 0.16);
          animation: ring3 2.6s cubic-bezier(0.22, 1, 0.36, 1) forwards 180ms;
          opacity: 0;
        }

        .ring4 {
          border: 1px solid rgba(90, 160, 255, 0.1);
          animation: ring4 3s cubic-bezier(0.22, 1, 0.36, 1) forwards 260ms;
          opacity: 0;
        }

        .mist {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          filter: blur(18px);
        }

        .mist1 {
          width: 120px;
          height: 120px;
          background:
            radial-gradient(circle, rgba(100, 180, 255, 0.12) 0%, rgba(100, 180, 255, 0.05) 45%, rgba(100, 180, 255, 0) 72%);
          animation: mist1 2.8s ease-out forwards;
        }

        .mist2 {
          width: 180px;
          height: 180px;
          background:
            radial-gradient(circle, rgba(70, 145, 255, 0.06) 0%, rgba(70, 145, 255, 0.02) 46%, rgba(70, 145, 255, 0) 74%);
          animation: mist2 3.1s ease-out forwards 100ms;
          opacity: 0;
        }

        .particle {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: rgba(195, 235, 255, 0.8);
          box-shadow: 0 0 12px rgba(170, 225, 255, 0.65);
          opacity: 0;
          animation: particle 1.4s ease-out forwards var(--delay);
        }

        @keyframes coreGlow {
          0% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(0.3);
          }
          30% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(11.5);
          }
        }

        @keyframes shockwave {
          0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(0.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(9.5);
          }
        }

        @keyframes ring1 {
          0% {
            opacity: 0.75;
            transform: translate(-50%, -50%) scale(0.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(6.5);
          }
        }

        @keyframes ring2 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          15% {
            opacity: 0.42;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(8.8);
          }
        }

        @keyframes ring3 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          18% {
            opacity: 0.28;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(10.8);
          }
        }

        @keyframes ring4 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
          18% {
            opacity: 0.18;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(13);
          }
        }

        @keyframes mist1 {
          0% {
            opacity: 0.28;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.4);
          }
        }

        @keyframes mist2 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7);
          }
          22% {
            opacity: 0.12;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.9);
          }
        }

        @keyframes particle {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6);
          }
          18% {
            opacity: 0.95;
          }
          100% {
            opacity: 0;
            transform: translate(
                calc(-50% + var(--tx)),
                calc(-50% + var(--ty))
              )
              scale(0.2);
          }
        }
      `}</style>
    </div>
  );
}