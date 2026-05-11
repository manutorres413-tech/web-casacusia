/**
 * Filamento — elementos gráficos orgánicos del sistema de identidad CASACUSIA.
 * Los "filamentos" son las manchitas fluidas del isotipo: formas que representan
 * conexión, diversidad y comunidad. Se usan como decoración de fondo en secciones.
 *
 * Cada filamento es un PNG con transparencia colocado de forma absoluta,
 * con pointer-events-none y aria-hidden para no interferir con a11y.
 */

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type FilamentoName =
  | "rosa"
  | "verde"
  | "morado"
  | "amarillo"
  | "punto-naranja"
  | "punto-magenta"
  | "punto-lavanda";

const src: Record<FilamentoName, string> = {
  rosa:           "/brand/elementos/filamento-rosa.png",
  verde:          "/brand/elementos/filamento-verde.png",
  morado:         "/brand/elementos/filamento-morado.png",
  amarillo:       "/brand/elementos/filamento-amarillo.png",
  "punto-naranja": "/brand/elementos/punto-naranja.png",
  "punto-magenta": "/brand/elementos/punto-magenta.png",
  "punto-lavanda": "/brand/elementos/punto-lavanda.png"
};

/* dimensiones naturales (aprox.) de cada asset */
const dims: Record<FilamentoName, { w: number; h: number }> = {
  rosa:            { w: 600, h: 200 },
  verde:           { w: 600, h: 260 },
  morado:          { w: 400, h: 420 },
  amarillo:        { w: 400, h: 420 },
  "punto-naranja": { w: 300, h: 300 },
  "punto-magenta": { w: 300, h: 300 },
  "punto-lavanda": { w: 300, h: 300 }
};

type FilamentoProps = {
  name: FilamentoName;
  /** Clases de posicionamiento absoluto y tamaño — p.ej. "top-0 right-0 w-64 rotate-12" */
  className?: string;
  /** Opacidad 0–100 */
  opacity?: number;
};

export function Filamento({ name, className, opacity = 40 }: FilamentoProps) {
  const d = dims[name];
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none",
        className
      )}
      style={{ opacity: opacity / 100 }}
    >
      <Image
        src={src[name]}
        alt=""
        width={d.w}
        height={d.h}
        className="h-full w-full object-contain"
        /* los filamentos son decorativos, no necesitan prioridad */
        loading="lazy"
      />
    </span>
  );
}
