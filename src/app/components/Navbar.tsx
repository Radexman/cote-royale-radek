import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <div className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          <button className="p-2">Menu</button>
          <div className="transfrom absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.svg"
              alt="Côte Royale Paris"
              width={180}
              height={30}
              className="w-32 md:w-44"
            />
          </div>
          <div className="flex">Icons</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
