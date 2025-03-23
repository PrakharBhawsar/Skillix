import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faSchool,
  faStar,
  faLaptopFile,
  faGraduationCap,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const learnIcon = {
  icon: <FontAwesomeIcon icon={faLaptopFile} />,
  iconStyle: { background: "#8708D1", color: "#fff" },
};
const bookIcon = {
  icon: <FontAwesomeIcon icon={faBookOpen} />,
  iconStyle: { background: "#8708D1", color: "#fff" },
};

const courseIcon = {
  icon: <FontAwesomeIcon icon={faGraduationCap} />,
  iconStyle: { background: "#8708D1", color: "#fff" },
};

const schoolIcon = {
  icon: <FontAwesomeIcon icon={faSchool} />,
  iconStyle: { background: "#8708D1", color: "#fff" },
};

const collIcon = {
  icon: <FontAwesomeIcon icon={faBoxOpen} />,
  iconStyle: { background: "#8708D1", color: "#fff" },
};

const starIcon = {
  icon: <FontAwesomeIcon icon={faStar} />,
  iconStyle: { background: "#8708D1", color: "#fff" },
};

const HomePage = () => {
  try {
    useEffect(() => {
      const getData = async () => {
        let res = await axios.get("http://localhost:3001/Prayatna");
        console.log(res.data); 
      };

      getData();
    }, []);
  } catch (err) {
    console.log(err);
  }

  const timeline = [
    {
      icon: learnIcon,
      date: "Explore Courses",
      title: "Find Your Learning Path",
      subtitle: "",
      desc: "Browse our diverse range of courses to find the one that suits your interests or professional goals. Explore featured courses, popular categories, or use the search feature for specific topics.",
    },
    {
      icon: bookIcon,
      date: "Create Your Course",
      title: "Share Your Knowledge",
      subtitle: "",
      desc: 'For those looking to share knowledge, click on "Create Course" to start crafting your own educational experience. Follow the intuitive course creation wizard, adding details such as course title, description, and selecting the type of content you want to include.',
    },
    {
      icon: courseIcon,
      date: "Enroll in Courses",
      title: "Start Your Learning Journey",
      subtitle: "",
      desc: "Once you've found the perfect course or created one yourself, click \"Enroll\" to access the course content. Provide necessary information, and you're ready to embark on your learning journey.",
    },
    {
      icon: schoolIcon,
      date: "Navigate Course Content",
      title: "Access Comprehensive Materials",
      subtitle: "",
      desc: "Inside each course, explore various sections like Documentation, Videos, Notes, Projects, Forum, and Community Chat Support. Seamlessly move between sections to access comprehensive learning materials and engage with the course content.",
    },
    {
      icon: collIcon,
      date: "Interact and Collaborate",
      title: "Engage with the Community",
      subtitle: "",
      desc: "Engage with fellow learners and instructors through the Forum and Community Chat Support. Collaborate on projects, seek clarification, and share insights to enhance your learning experience.",
    },
    {
      icon: starIcon,
      date: "Moderate Your Course (Instructor)",
      title: "Manage and Moderate Effectively",
      subtitle: "",
      desc: "If you're the course creator, manage and moderate your course effectively. Utilize the moderation tools to oversee discussions, address queries, and ensure a positive and interactive learning environment for all participants.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white">
      <div className=" dark:bg-gray-900 pt-4">
        <header className=" w-full border-b border-purple-600 pb-2">
          <nav className="bg-grey text-white border-gray-200 py-2.5 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
              <Link to="/" className="flex items-center">
                <img src="/logo.png" className="h-6 mr-3 sm:h-9" alt="Logo" />
              </Link>
              <div className="flex items-center lg:order-2">
                <Link
                  to="/Auth"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                >
                  Login
                </Link>
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <Link
                      to="#"
                      className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                      aria-current="page"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Auth"
                      className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block py-2 pl-3 pr-4 text-gray-700 border-gray-100 bor der-b hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Contacts
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <section className="bg-grey-800 text-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                Free and Open Learning.
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Best way to learn online...
              </p>
              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 text-white"
                >
                  View Courses
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                      __html:
                        ".st0{fill:#0acf83}.st1{fill:#a259ff}.st2{fill:#f24e1e}.st3{fill:#ff7262}.st4{fill:#1abcfe}",
                    }}
                  />
                  <title>Figma.logo</title>
                  Add Courses
                </Link>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="banner.png" alt="hero" />
            </div>
          </div>
        </section>
        <section className="feature_cards dark:bg-gray-900">
          <div className="col-span-3 space-y-8 md:grid md:grid-cols-3 md:gap-12 md:space-y-0 flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <div className="transition-all duration-300 border border-white hover:border-purple-600 rounded-2xl px-6 py-10">
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.882 1.731a.48.48 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.7.7 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a1 1 0 0 0-.462-.04 7 7 0 0 1 2.45-2.027m-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.8.8 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.45.45 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282l.04-.001a7.003 7.003 0 0 1-12.658.905Z" />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Open Source
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Empower collaboration by embracing open source practices
              </p>
            </div>
            <div className="transition-all duration-300 border border-white hover:border-purple-600 rounded-2xl px-6 py-7">
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Community Driven
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Empowering learners through a collaborative platform where users
                share and access courses
              </p>
            </div>
            <div className="transition-all duration-300 border border-white hover:border-purple-600 rounded-2xl px-6 py-10">
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Live Chat
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Connect with fellow learners in real time using our interactive
                live chat
              </p>
            </div>
            <div className="transition-all duration-300 border border-white hover:border-purple-600 rounded-2xl px-6 py-10">
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z" />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Interactive Learning
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Engage, learn, and collaborate through interactive course
                content
              </p>
            </div>
            <div className="transition-all duration-300 border border-white hover:border-purple-600 rounded-2xl px-6 py-10">
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fillRule="evenodd"
                  d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM3 11.5A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"
                />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Version Control
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Efficiently manage code changes with version control systems
              </p>
            </div>
            <div className="transition-all duration-300 border border-white hover:border-purple-600 rounded-2xl px-6 py-10">
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm7.194 2.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 4C4.776 4 4 4.746 4 5.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 7.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 4c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z" />{" "}
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Discussion Forum
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Make learning interactive by asking questions and providing
                answers
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className=" dark:bg-gray-900 pt-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Journey of Learning
          </h2>
        </div>

        <VerticalTimeline>
          {timeline.map((t, i) => {
            // const contentStyle =
            //   i === 0
            //     ? { background: "bg-blue-700", color: "text-white" }
            //     : { background: "bg-gray-900", color: "text-white" };
            const arrowStyle =
              i === 0 ? { borderRight: "7px solid bg-blue-700" } : undefined;

            return (
              <VerticalTimelineElement
                key={i}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(17,24,39)",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
                contentArrowStyle={arrowStyle}
                date={<div className="text-white text-2xl ">{t.date}</div>}
                {...t.icon}
              >
                {t.title ? (
                  <React.Fragment>
                    <h3 className="vertical-timeline-element-title font-bold text-2xl mb-2">
                      {t.title}
                    </h3>
                    {t.subtitle && (
                      <h4 className="vertical-timeline-element-subtitle">
                        {t.subtitle}
                      </h4>
                    )}
                    {t.desc && (
                      <p className="text-sm font-light text-gray-500">
                        {t.desc}
                      </p>
                    )}
                  </React.Fragment>
                ) : undefined}
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default HomePage;
