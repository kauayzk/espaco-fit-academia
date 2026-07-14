type BrandLogoProps = {
  href?: string;
  className?: string;
};

export function BrandLogo({ href = "/", className = "" }: BrandLogoProps) {
  return (
    <a className={`brand-logo ${className}`.trim()} href={href} aria-label="Espaço Fit Academia — início">
      <span className="brand-logo-crop" aria-hidden="true">
        <img src="/espaco-fit-valores.png" alt="" />
      </span>
      <span className="sr-only">Espaço Fit Academia</span>
    </a>
  );
}
