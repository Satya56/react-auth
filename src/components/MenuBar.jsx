import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import Cookies from "universal-cookie";
  import {HamburgerIcon} from '@chakra-ui/icons';

  import SignOutButton from './SignOutButton';

 const MenuBar = () => {
    const cookies = new Cookies()
    //logout
    const logout = () =>{
        //Menghancurkan cookie
        cookies.remove("TOKEN", {path: "/"});
        //mengarahkan pengguna ke landing page
        window.location.href = "/";
    }

    return(
        <Menu>
            <MenuButton
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            />
            <MenuList>
                <MenuItem>
                    <SignOutButton onSignOut={logout}/>
                </MenuItem>
            </MenuList>
        </Menu>
    )

 }
export default MenuBar 