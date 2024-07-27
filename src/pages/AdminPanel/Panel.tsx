import React, { useState } from 'react';
import './AdminPanel.css';
import { BiAbacus } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
function Panel({ children }: any) {
  const [IsOpen, setIsOpen] = useState();
  const [Class1, setClass1] = useState('');
  const [Class2, setClass2] = useState();
  const handleToggle = () => {
    if (Class1 === '') {
      setClass1('d-none');
    } else {
      setClass1('');
    }
  };
  const menuItem = [
    {
      name: 'Bookings',
      path: '/panel/bookingdetails',
      icon: <BiAbacus />,
      id: 'normal'
    },
    {
      name: 'Option 2',
      path: '/option2',
      icon: <BiAbacus />,
      id: 'acc',
      subOption: [
        {
          name: 'Sub Option 1',
          path: '/panel/option2',
          icon: <BiAbacus />
        }
      ]
    }
  ];
  return (
    <div className="fluid-container d-flex">
      <div className={`sidebar vh-100 ${Class1}`}>
        {menuItem.map((item, index) => {
          return (
            <>
              {item.id === 'normal' ? (
                <NavLink className="text-white text-decoration-none" key={index} to={item.path}>
                  <div className="d-flex py-2 ">
                    {item.icon}
                    <h3 className="ms-1 ">{item.name}</h3>
                  </div>
                </NavLink>
              ) : item.id === 'acc' ? (
                <div key={index} className="accordion heading-text " id="accordionExample">
                  <div className="accordion-item">
                    <h3 className="accordion-header ">
                      <button
                        className=" accordion-button border-0 bg-transparent heading-text text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <div className="d-flex py-2">
                          {item.icon}
                          <h3 className="ms-1 ">{item.name}</h3>
                        </div>
                      </button>
                    </h3>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      {item.subOption?.map((subItem, subIndex) => {
                        return (
                          <NavLink className="text-white text-decoration-none" to={subItem.path} key={subIndex}>
                            <div className="accordion-body">
                              <div className="d-flex py-2">
                                {subItem.icon}
                                <h3 className="ms-1 ">{subItem.name}</h3>
                              </div>
                            </div>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          );
        })}
      </div>
      <div>
        <button className=" book-button-color p-1 py-0 border border-start-0 border-1 border-dark rounded-0" onClick={handleToggle}>
          <FaBars size={20} />
        </button>
      </div>

      <div className="ms-3" style={{flex:'auto'}}>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Panel;
