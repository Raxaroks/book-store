import Image from "next/image";
import headerLogo from '@/app/icon.png';
import style from './header.module.css';


export const Header = () => {
  return (
    <div className={ style.header }>
      <Image className={ style.headerLogo } src={ headerLogo } alt='App logo' />

      <h3 className={ style.headerTitle }>Book Store</h3>
    </div>
  )
}
