import Link from 'next/link';
import React from 'react'

export const navItemsData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Become a Instructor",
        url: "/instructor/register"
    },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
    user: any
}

const NavItems: React.FC<Props> = ({activeItem, isMobile, user}) => {

  return (
    <>
        <div className='hidden 800px:flex px-3'>
            {
                navItemsData && navItemsData.map((i, index) => (
                    i.name === "Become a Instructor" && user && user.role === "user" ? 
                    <Link href={`${i.url}`} key={index} passHref>
                        <div
                        className={`
                            ${activeItem === index 
                            ? "dark:text-[#37a39a] font-[500]"
                            : "dark:text-white text-black"
                            }  text-[14px] font-Poppins font-[400] uppercase tracking-wider hover:font-[500] text-center w-44 mx-4`
                        }
                        >
                            <span>{i.name}</span>
                        </div>
                    </Link>
                    :
                    i.name !== "Become a Instructor" && 
                    <Link href={`${i.url}`} key={index} passHref>
                        <div
                        className={`
                            ${activeItem === index 
                            ? "dark:text-[#37a39a]  font-[500]"
                            : "dark:text-white text-black"
                            }  text-[14px] font-Poppins font-[400] uppercase tracking-wider hover:font-[500] text-center w-24`
                        }
                        >
                            <span>{i.name}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
        {
            isMobile && (
                <div className='800px:hidden mt-5'>
                    <div className='w-full text-center py-6'>
                        <Link href="/" passHref>
                            <span
                            className='text-[25px] font-Poppins font-[500] text-black dark:text-white'
                            >
                                Eduwise
                            </span>
                        </Link>

                    </div>
                    {
                        navItemsData && navItemsData.map((i, index) => (
                            <Link href="/" passHref key={index}>
                                <span
                                className={`
                                ${activeItem === index 
                                ? "dark:text-[#37a39a] text-[crimson]"
                                : "dark:text-white text-black"}
                                block py-5 text-[16px] px-6 font-Poppins font-[400]`
                                }
                                >
                                   {i.name}
                                </span>
                            </Link>
                        ))
                    }
                </div>
            )
        }
    </>
  )
}

export default NavItems