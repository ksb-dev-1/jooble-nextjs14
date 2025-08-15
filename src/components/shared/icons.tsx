// icons.tsx
import {
  FaFilter,
  FaSearch,
  FaRegBookmark,
  FaBookmark,
  FaCloudUploadAlt,
  FaBriefcase,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaClock,
  FaMoon,
  FaSun,
  FaBuilding,
  FaRupeeSign,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaLightbulb,
} from "react-icons/fa";
import { IconType } from "react-icons";

type IconProps = {
  size?: number;
  className?: string;
};

function createIconComponent(Icon: IconType) {
  return function ReusableIcon({ size = 16, className }: IconProps) {
    return <Icon size={size} className={className} aria-hidden="true" />;
  };
}

// Exporting reusable icons
export const FilterIcon = createIconComponent(FaFilter);
export const SearchIcon = createIconComponent(FaSearch);
export const BookmarkIcon = createIconComponent(FaRegBookmark);
export const BookmarkFilledIcon = createIconComponent(FaBookmark);
export const CloudUploadIcon = createIconComponent(FaCloudUploadAlt);
export const BriefcaseIcon = createIconComponent(FaBriefcase);
export const PaperPlaneIcon = createIconComponent(FaPaperPlane);
export const LocationIcon = createIconComponent(FaMapMarkerAlt);
export const TimerIcon = createIconComponent(FaClock);
export const MoonIcon = createIconComponent(FaMoon);
export const SunIcon = createIconComponent(FaSun);
export const OfficeIcon = createIconComponent(FaBuilding);
export const RupeeIcon = createIconComponent(FaRupeeSign);
export const UserIcon = createIconComponent(FaUser);
export const SigninIcon = createIconComponent(FaSignInAlt);
export const SignoutIcon = createIconComponent(FaSignOutAlt);
export const SkillsIcon = createIconComponent(FaLightbulb);
