import { HiHome } from "react-icons/hi";
import { BsFillSignpostFill } from "react-icons/bs";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
      <SideBarIcon icon={<HiHome size="32" />} text="Home" href="/" />
      <SideBarIcon icon={<BsFillSignpostFill size="32" />} text="Post" href="/post" />
    </div>
  );
}

const SideBarIcon = ({ icon, text = "tooltip", href = "/" }) => (
  <a className="sidebar-icon group" href={href}>
    {icon}

    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </a>
);
