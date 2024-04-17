import Category from "./category";
import ProfileButton from "./profilebutton";
import ThemeSwitch from "./themeswitch";

interface NavigationProps {
  className?: string
}

// Display Navigation bar
export default function Navigation({className}: NavigationProps) {
  return (
    <>
      <div className={`${className} flex items-center justify-end gap-6`}>
        <Category />
        <ProfileButton />
        <ThemeSwitch />
      </div>
    </>
  );
}
