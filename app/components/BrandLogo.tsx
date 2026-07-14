type BrandLogoProps = {
  href?: string;
  className?: string;
};

export function BrandLogo({ href = "/", className = "" }: BrandLogoProps) {
  return (
    <a className={`brand-logo ${className}`.trim()} href={href} aria-label="Espaço Fit Academia — início">
      <span className="brand-mark" aria-hidden="true">
        <img src="/ef-mark.png" alt="" />
      </span>
      <span className="brand-name" aria-hidden="true">
        <strong>ESPAÇO<em>FIT</em></strong>
        <small>ACADEMIA</small>
      </span>
      <span className="sr-only">Espaço Fit Academia</span>
    </a>
  );
}
