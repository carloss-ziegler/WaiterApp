import Logo from "../assets/images/logo.svg";

export function Header() {
  return (
    <header className="bg-[#D73035] h-40 flex justify-center items-center">
      {/* Page Details */}
      <div className="w-full max-w-6xl items-center justify-between flex flex-row">
        <div className="space-y-1">
          <h1 className="font-semibold text-white text-4xl">Pedidos</h1>
          <h2 className="font-normal text-white opacity-90 text-base">
            Acompanhe os pedidos dos clientes
          </h2>
        </div>

        <img src={Logo} alt="logo" />
      </div>
    </header>
  );
}
