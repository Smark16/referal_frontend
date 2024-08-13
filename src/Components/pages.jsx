import React from 'react';
import { Link} from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';

function Pages() {
//   const {user} = useContext(AuthContext)
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menu, setMenu] = useState(false);

//   const location = useLocation()
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const toggleMenu = () => {
//     setMenu(!menu);
//   };

  return (
    <>
        {/* <Link to='/institute/profile' className='text-white Links'>
      <div className="profile_div">
        <ul>
          <li>
          <i className="bi bi-person-circle"></i>
          <span className='text-white'>
            {user.username}
          </span>
          </li>
        </ul>
       
      </div>
        </Link> */}

      <ul className="sidelists">
        <li className='side_list'>
        <i class="bi bi-person-circle"></i>
        <p><Link to='/application/background_infomation' className='text-success Link'>Background Information</Link></p>
        </li>

        <li className='side_list'>
        <i class="bi bi-info-square-fill"></i>
        <p><Link to='/application/bussiness_information' className='text-success Link'>Business Information</Link></p>
        </li>

        <li className='side_list'>
        <i class="bi bi-badge-tm-fill"></i>
          <p><Link to='/application/services' className='text-success Link'>Services</Link></p>
        </li>

      </ul>

      <ul className="logout">
        <li>
          <i className="bi bi-box-arrow-right"></i>
          <p><Link to='logout' className='text-success Link'>Logout</Link></p>
        </li>
      </ul>
    </>
  );
}

export default Pages;
