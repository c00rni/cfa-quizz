import { User } from "firebase/auth";
import Category from "./category";
import ProfileButton from "./profilebutton";
import ThemeSwitch from "./themeswitch";

interface NavigationProps {
  className?: string;
  user: User | null;
}

// Display Navigation bar
export default function Navigation({className, user}: NavigationProps) {
  return (
    <>
      <div className={`${className} flex items-center justify-end gap-6`}>
        <Category />
        <ProfileButton user={user} />
        <ThemeSwitch />
      </div>
    </>
  );
}
