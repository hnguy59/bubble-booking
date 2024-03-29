import Image from "next/image";

export function Loading() {
  return (
    <div className="grid h-80 place-items-center">
      <Image
        src="/images/logo.png"
        alt="LOGO"
        width={6000}
        height={6000}
        className="h-12 w-12 animate-bounce"
      />
    </div>
  );
}
