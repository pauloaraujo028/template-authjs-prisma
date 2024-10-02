import Image from "next/image";

interface HeaderProps {
  label: string;
  title?: string;
}

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex items-center gap-1">
        <Image
          src="/stock.svg"
          alt="Logo"
          width={50}
          height={50}
          className="mt-2"
        />
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
