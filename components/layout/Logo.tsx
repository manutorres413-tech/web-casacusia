import Image from "next/image";

type LogoProps = {
  className?: string;
  /** "color" = logo completo con isotipo (header claro)
   *  "white" = isotipo blanco + letras blancas (fondos oscuros)
   *  "isotipo" = solo el isotipo color (favicon, avatares, etc.) */
  variant?: "color" | "white" | "isotipo";
};

export function Logo({ className, variant = "color" }: LogoProps) {
  if (variant === "isotipo") {
    return (
      <span className={className}>
        <Image
          src="/brand/logos/isotipo-color.png"
          alt="Isotipo CASACUSIA"
          width={40}
          height={40}
          className="h-full w-auto object-contain"
          priority
        />
      </span>
    );
  }

  if (variant === "white") {
    return (
      <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
        <Image
          src="/brand/logos/isotipo-blanco.png"
          alt=""
          aria-hidden
          width={32}
          height={32}
          className="h-7 w-auto object-contain"
          priority
        />
        <Image
          src="/brand/logos/letras-blanco.png"
          alt="CASACUSIA"
          width={140}
          height={24}
          className="h-5 w-auto object-contain"
          priority
        />
      </span>
    );
  }

  /* variant === "color" — logo horizontal PNG completo */
  return (
    <span className={className}>
      <Image
        src="/brand/Casacusia_Horizontal.png"
        alt="CASACUSIA"
        width={180}
        height={40}
        className="h-8 w-auto object-contain"
        priority
      />
    </span>
  );
}
