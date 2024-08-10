import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";

import Icon from "../components/Icon";
// Icons
import Html from "../components/icons/Html";
import Css from "../components/icons/Css";
import Javascript from "../components/icons/Javascript";
import Tailwind from "../components/icons/Tailwind";
import Bootstrap from "../components/icons/Bootstrap";
import Sass from "../components/icons/Sass";
import ReactJs from "../components/icons/ReactJs";
import NextJs from "../components/icons/NextJs";
import Figma from "../components/icons/Figma";
import AdobeXd from "../components/icons/AdobeXd";

// Project Card
import ProjectCard from "../components/ProjectCard";
import GitHubProfile from "../components/icons/GitHubProfile";
import TwitterProfile from "../components/icons/TwitterProfile";
import LinkedInProfile from "../components/icons/LinkedInProfile";
import FeaturedProjectCard from "../components/FeaturedProjectCard";

// Blog Components
// import BlogList from "../components/blog/BlogList";
// import BlogItem from "../components/blog/BlogItem";

// Dark Mode
import { useTheme } from "next-themes";

import { projects } from "../utils/constants";
import NewIcon from "../components/NewIcon";


const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Home({ publications }) {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleResize = () => {
    if (window.innerWidth < 1024) {
    } else {
      setNavbarOpen(false);
    }
  };

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: "home", ref: homeRef, id: 1 },
      { section: "about", ref: aboutRef, id: 2 },
      { section: "skills", ref: skillsRef, id: 3 },
      { section: "my-work", ref: myWorkRef, id: 4 },
      { section: "blog", ref: blogRef, id: 5 },
      { section: "contact", ref: contactRef, id: 6 },
      { section: "testimonials", ref: testimonialsRef, id: 7 },
    ];

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
        // console.log(visibleSection);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  // Handle Header Scroll Away
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    let timeoutId;

    const handleScrollBack = () => {
      const currentScrollPos = window.pageYOffset;

      // Delay before the header scrolls back into view
      if (currentScrollPos < scrollPosition - 50 && scrolling) {
        timeoutId = setTimeout(() => {
          setShowHeader(true);
        }, 250);
      }

      // Add an easing effect when the header scrolls into and out of view
      if (currentScrollPos > prevScrollPos + 10 && !scrolling && showHeader) {
        setScrolling(true);
      } else if (currentScrollPos < prevScrollPos - 10 && scrolling) {
        clearTimeout(timeoutId);
        setScrolling(false);
        setTimeout(() => {
          setShowHeader(false);
        }, 250);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScrollBack);
    return () => window.removeEventListener("scroll", handleScrollBack);
  }, [scrollPosition, scrolling, showHeader]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScrolling(window.pageYOffset > 110)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    console.log(currentTheme);
  }, [currentTheme]);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    if (currentTheme === "dark") {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out dark:flex dark:opacity-50 dark:group-hover:opacity-100 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="flex w-6 h-6 transition-all duration-150 ease-in-out text-mid group-hover:text-dark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="transition-all duration-150 ease-in-out bg-white dark:bg-darker">
      <div
        className={`relative w-full dark:bg-darker bg-light bg-opacity-10 overflow-auto min-h-screen transition-all duration-150 ease-in-out ${navbarOpen ? "overflow-hidden" : "overflow-auto"
          }`}
      >
        <Head>
          <title>Atul Bhatt | Frontend Engineer</title>
          <meta
            name="description"
            content="The portfolio of freelance frontend developer, Atul Bhatt"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Full-screen Menu */}
        <div
          className={`fixed w-full z-50 h-screen pt-24 bg-white dark:bg-darker bg-opacity-100 transform delay-100 transition-all duration-150 ${navbarOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
            }`}
        >
          <div className="container relative mx-auto">
            <nav className="block ml-auto">
              <ul className="z-50 flex flex-col items-start">
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "home"
                      ? "selected delay-200"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "about"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "skills"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "my-work"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid  hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    My Work
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "testimonials"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(testimonialsRef.current);
                    }}
                  >
                    Testimonials
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "contact"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-40 block py-2 mt-6 list-none lg:inline-block">
                  <a
                    href={`mailto:mratulbhatt97@gmail.com`}
                    className="text-lg btn-brand btn-lg group"
                  >
                    Get in touch
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Header and Nav */}
        <header
          ref={headerRef}
          className={`header top-0 mx-auto flex items-center z-50 fixed w-full transition-all duration-150 h-20 ease-in-out ${scrolling ? "-translate-y-full" : ""
            } ${scrolling && !navbarOpen ? "dark:bg-darker" : "dark:bg-darker"}`}
        >
          {/* Logo and Nav container */}
          <div className="container relative flex items-center mx-auto">
            {/* Logo */}
            <div className="z-50 flex items-center sm:w-10 sm:h-10 w-11 h-11">
              <NewIcon />
            </div>
            {/* Text */}
            <div className="flex items-center ml-4">
              <p className="mb-0 text-lg font-semibold tracking-tight transition-all duration-150 ease-in-out font-display dark:text-white text-darker">
                Atul Bhatt
              </p>
            </div>
            {/* Nav */}
            <nav className="block h-full ml-auto">
              <ul className="z-50 flex items-center">
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "home" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "about" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "skills" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "my-work" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    My Work
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`nav-item ${visibleSection === "testimonials" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(testimonialsRef.current);
                    }}
                  >
                    Testimonials
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "contact" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-50 hidden ml-5 list-none lg:inline-block">
                  <a
                    href={`mailto:mratulbhatt97.com`}
                    className="btn-brand btn-md group"
                  >
                    Hire me
                  </a>
                </li>
                <li className="z-50 inline-block list-none lg:hidden group">
                  <button
                    className={`relative w-10 h-10 ${navbarOpen
                      ? "dark:text-white text-dark"
                      : "text-mid group-hover:text-dark dark:opacity-50 dark:group-hover:opacity-100 dark:text-white dark:group-hover:text-white"
                      } focus:outline-none`}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? "rotate-45" : "-translate-y-1.5"
                          }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? "opacity-0" : "opacity-100"
                          }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? "-rotate-45" : "translate-y-1.5"
                          }`}
                      ></span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="flex mt-auto ml-0 lg:ml-5">
              {/* Dark mode */}
              <button
                className="flex items-center justify-center h-12 transition-all duration-150 ease-in bg-transparent rounded-sm outline-none w-7 focus:outline-none group"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                {renderThemeChanger()}
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="container relative z-30 mx-auto">
          {/* Hero Content */}
          <main className={`flex-col flex h-screen`} id="home" ref={homeRef}>
            {/* Main */}
            <div className="container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section">
              <div className="w-full">
                {/* <span className="text-2xl font-semibold text-brand">
                  Hello! 👋 My name is
                </span> */}

                <h1 className="mb-2 text-5xl md:text-7xl dark:text-white text-dark">
                  Atul Bhatt
                </h1>
                <h2 className="mb-4 text-3xl md:text-4xl dark:text-light text-mid">
                  <ReactTypingEffect
                    typingDelay={200}
                    speed={30}
                    eraseSpeed={30}
                    eraseDelay={1500}
                    text={[
                      "Developer",
                      "Technical Blogger",
                      "Open Source Contributor",
                      "Poet/Writer",
                    ]}
                  />
                </h2>
                <p className="w-4/5 text-xl md:w-full">
                  I design and build websites that look good, and work well.
                </p>
                <button
                  className="mt-4 btn-brand btn-lg group"
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}
                >
                  See my Work
                </button>
              </div>
            </div>
          </main>

          {/* About */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="about"
            ref={aboutRef}
          >
            <div className="flex flex-col">
              <h2 className="text-5xl">About</h2>
              <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

              <div className="flex flex-col-reverse items-start w-full md:flex-row">
                <div className="flex flex-col w-full md:pr-8 md:w-3/5">
                  <p className="text-lg">
                    Hi! I&apos;m Atul and I&apos;m a frontend developer from
                    Uttarakhand, India.
                  </p>
                  <p className="text-lg">
                    After I got my first computer at the age of 14, I knew I
                    wanted to work with computers and technology, and I&apos;ve
                    never looked back.
                  </p>
                  <p className="text-lg">
                    After graduating University with a Masters Degree in Computers Application,
                    I worked for a startup for about 2 years in which I started freelancing part-time,
                    until I decided to go full-time.
                  </p>
                  <p>
                    I have worked with teams, and I have also worked as a solo developer. I have experience in
                    building web apps from scratch, and also in maintaining and updating existing projects.
                  </p>
                  <p className="text-lg">
                    In recent years, I&apos;ve been focused on programming,
                    building a solid frontend stack and creating exciting
                    projects that solve real-world problems.
                  </p>

                  <p className="text-lg">
                    Take a look at my work below to see what I&apos;m working
                    on, and get in touch if you&apos;d like to work together!
                  </p>
                </div>
                <div className="flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0">
                  <Image
                    src="/headshot-2024.jpg"
                    className="overflow-hidden rounded-md"
                    width={880}
                    height={880}
                    alt={"Atul Bhatt headshot"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="skills"
            ref={skillsRef}
          >
            <h2 className="text-5xl">Skills</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Skills icons */}
            <div className="grid w-full grid-cols-4 gap-4 mt-4 mr-auto sm:grid-cols-4 md:grid-cols-8">
              {/* HTML */}
              <Icon
                IconType={Html}
                title="HTML"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* CSS */}
              <Icon
                IconType={Css}
                title="CSS"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Tailwind */}
              <Icon
                IconType={Tailwind}
                title="Tailwind"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Javascript */}
              <Icon
                IconType={Javascript}
                title="Javascript"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* React */}
              <Icon
                IconType={ReactJs}
                title="React"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Next */}
              <Icon
                IconType={NextJs}
                title="Next"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />


              {/* Sass */}
              <Icon
                IconType={Sass}
                title="Sass"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Bootstrap */}
              <Icon
                IconType={Bootstrap}
                title="Bootstrap"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Adobe XD */}
              <Icon
                IconType={AdobeXd}
                title="Adobe XD"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Adobe XD */}
              <Icon
                IconType={Figma}
                title="Figma"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />


            </div>
          </section>

          {/* My Work */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="my-work"
            ref={myWorkRef}
          >
            {/* My Work header */}
            <h2 className="text-5xl">My Work</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Featured Projects Container */}
            <div className="flex flex-col w-full mb-12">
              {/* Project One */}
              <FeaturedProjectCard
                title={"Rainbow"}
                status={"V0.1 Just Launched (Open Source)"}
                description={`modern design and code editor`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/rnbw.png"}
                liveLink={"https://rnbw.design"}
                repoLink={"https://github.com/rnbwdev/rnbw"}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Css}
                      title="CSS"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                  </>
                }
              />

              {/* Project Two */}
              <FeaturedProjectCard
                title={"HTTP Status Insight"}
                status={"Live (Open Source)"}
                description={`Decoding HTTP with Status Code Insight`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row-reverse`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/httpstatus.png"}
                liveLink={"https://httpstatusinsight.netlify.app/"}
                repoLink={"https://github.com/hiteshchoudhary/apihub"}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Css}
                      title="CSS"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                  </>
                }
              />


              {/* Project Three */}
              <FeaturedProjectCard
                title={"weareunder.design"}
                status={"Live"}
                description={`
                Site for a design agency based in Israel
                `}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/under.png"}
                liveLink={"https://weareunder.design/"}
                repoLink={null}
                stack={
                  <div className="flex gap-4">
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Css}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    Webflow

                  </div>
                }
              />
              {/* Project Four */}
              <FeaturedProjectCard
                title={"Tealbox.digital"}
                status={"Live"}
                description={`The Analytics & Performance Marketing Agency`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row-reverse`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/tealbox.png"}
                liveLink={"https://tealbox.digital"}
                repoLink={null}
                stack={
                  <div className="flex gap-4">
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Css}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    Webflow

                  </div>
                }
              />

              {/* Project Five */}
              <FeaturedProjectCard
                title={"Storyteller"}
                status={"Live"}
                description={`Empower Your Agency's Creativity with Data-Driven Insights`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/storyteller.png"}
                liveLink={"https://thestoryteller.tech/"}
                repoLink={null}
                stack={
                  <div className="flex gap-4">
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Css}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Sass}
                      title="Sass"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                  </div>
                }
              />

              {/* Project Six */}
              <FeaturedProjectCard
                title={"SourceBae"}
                status={"Live"}
                description={`Build Your Remote Tech Team Within Just 24 Hours.`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row-reverse`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/sourcebae.png"}
                liveLink={"https://sourcebae.com/"}
                repoLink={null}
                stack={
                  <div className="flex gap-4">
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Css}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Sass}
                      title="Sass"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                  </div>
                }
              />

              {/* Project Seven */}
              <FeaturedProjectCard
                title={"PayuBuzz"}
                status={"Launched (Internal Use)"}
                description={`Intranet Portal developed in SharePoint SPFx for Payu India`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/payu.png"}
                liveLink={null}
                repoLink={null}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />


                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                  </>
                }
              />
            </div>

            {/* Other Projects header */}
            <h2 className="text-4xl text-center">Other Projects</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 mx-auto border-0"></hr>
            <p className="mb-16 text-lg text-center">
              Check out some of the projects I&apos;ve been a part of...
            </p>

            {/* Other Projects Container */}
            <div className="grid grid-flow-row grid-rows-2 gap-4 grid-col-1 lg:grid-cols-3">
              {projects.map(function (project, i) {
                return <ProjectCard project={project} key={i} />;
              })}
            </div>
          </section>

          {/* Blog */}
          {/* <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="blog"
            ref={blogRef}
          >
            <h2 className="text-5xl">Blog</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            <BlogList publications={publications} />
          </section> */}


          {/* Testimonials */}
          <section className="w-full max-w-6xl mx-auto"
            id="testimonials"
            ref={testimonialsRef}
          >
            <div className="max-w-xl mx-auto text-center">
              <h1 className="mb-5 text-6xl font-bold text-gray-600 md:text-7xl">What people <br />are saying.</h1>
              <h3 className="mb-5 text-xl font-light">Here are some testimonials from the people I worked for.</h3>
              <div className="mb-10 text-center">
                <span className="inline-block w-1 h-1 ml-1 bg-indigo-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 ml-1 bg-indigo-500 rounded-full"></span>
                <span className="inline-block w-40 h-1 bg-indigo-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 ml-1 bg-indigo-500 rounded-full"></span>
                <span className="inline-block w-1 h-1 ml-1 bg-indigo-500 rounded-full"></span>
              </div>
            </div>
            <div className="items-start -mx-3 md:flex">
              <div className="px-3 md:w-1/3">
                <div className="w-full p-5 mx-auto mb-6 font-light text-gray-800 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center w-full mb-4">
                    <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full bg-gray-50">
                      <Image src="/testimonials/eden.jpeg" alt="" width={100} height={100} />
                    </div>
                    <div className="flex-grow pl-3">
                      <span className="text-sm font-bold text-gray-600 uppercase">Eden Vidal</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-sm leading-tight"><span className="mr-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span>Working with Atul was always a delight. His exceptional communication skills, timely delivery of great work, and strong skills made him a pleasure to collaborate with. His curiosity and willingness to step outside his expertise made him a valuable asset to any project. I especially enjoyed working with him on a hyper-experimental project and would happily work with him again.<span className="ml-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span></span>
                  </div>
                </div>
                <div className="w-full p-5 mx-auto mb-6 font-light text-gray-800 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center w-full mb-4">
                    <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full bg-gray-50">
                      <Image src="/testimonials/rajesh.jpg" alt="" width={100} height={100} />
                    </div>
                    <div className="flex-grow pl-3">
                      <span className="text-sm font-bold text-gray-600 uppercase">Rajesh Durai</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-sm leading-tight"><span className="mr-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span>We hired Atul for one of our web-based projects. He took the time to understand my needs and provided me with a customized solution that exceeded my expectations. Overall, I would highly recommend working with Atul for any web related projects.<span className="ml-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span></span>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-1/3">
                <div className="w-full p-5 mx-auto mb-6 font-light text-gray-800 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center w-full mb-4">
                    <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full bg-gray-50">
                      <Image src="/testimonials/saswat.jpeg" alt="" width={100} height={100} />
                    </div>
                    <div className="flex-grow pl-3">
                      <span className="text-sm font-bold text-gray-600 uppercase">Saswat Panda</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-sm leading-tight"><span className="mr-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span>I brought Atul onboard my pre-seed startup as a contract frontend developer in 2023. Though early in his career and lacking experience, he more than made up for it with his drive, efficiency, reliability and, a positive attitude. We had some tight deadlines, but Atul always delivered, generally with the level of quality you&apos;d expect from someone with more grey hairs. All with a bright smile on his face. I&apos;d love for the opportunity to work with Atul again.<span className="ml-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span></span>
                  </div>
                </div>
                <div className="w-full p-5 mx-auto mb-6 font-light text-gray-800 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center w-full mb-4">
                    <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full bg-gray-50">
                      <Image src="/testimonials/sreeja.jpg" alt="" width={100} height={100} />

                    </div>
                    <div className="flex-grow pl-3">
                      <span className="text-sm font-bold text-gray-600 uppercase">Sreeja</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-sm leading-tight"><span className="mr-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span>Atul is self motivated and an exceptional learner. He has worked on a very complex module and made it exactly as per the requirements.  It is a pleasure working with Atul and he is an asset to any team.<span className="ml-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span></span>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-1/3">
                <div className="w-full p-5 mx-auto mb-6 font-light text-gray-800 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center w-full mb-4">
                    <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full bg-gray-50">
                      <Image src="/testimonials/prakhar.jpg"
                        alt="" width={100} height={100} />
                    </div>
                    <div className="flex-grow pl-3">
                      <span className="text-sm font-bold text-gray-600 uppercase">Prakhar</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-sm leading-tight"><span className="mr-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span>Atul is a good professional to work with. He is a dedicated professional and a talented colleague . I worked with him on variety of projects where he show case his strengths and capabilities.<span className="ml-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span></span>
                  </div>
                </div>
                <div className="w-full p-5 mx-auto mb-6 font-light text-gray-800 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center w-full mb-4">
                    <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full bg-gray-50">
                      <Image src="/testimonials/karan.jpg"
                        alt="" width={100} height={100} />
                    </div>
                    <div className="flex-grow pl-3">
                      <span className="text-sm font-bold text-gray-600 uppercase">Karan</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="text-sm leading-tight"><span className="mr-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span>We reached out to Atul for our website and the entire process of handout was very very smooth. He committed to a timeline of around 7 days and I had the website in 3 days.<span className="ml-1 text-lg italic font-bold leading-none text-gray-400">&quot;</span></span>
                  </div>
                </div>
              </div>
            </div>
          </section>




          {/* Contact */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="contact"
            ref={contactRef}
          >
            <h2 className="text-5xl">Contact</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            <div className="flex flex-col-reverse w-full md:flex-row">
              <div className="w-full mb-4 md:pl-0 md:mb-0">
                <p className="text-lg">
                  I&apos;m currently available to get involved in new projects,
                  so get in touch if you&apos;d like to work together.
                </p>
                <p className="text-lg">
                  Email me at{" "}
                  <Link
                    href="mailto:mratulbhatt97@gmail.com"
                    className="underline-link"
                  >
                    mratulbhatt97@gmail.com
                  </Link>{" "}
                  and let&apos;s talk about your project!
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col w-full px-0 py-16 md:px-20 lg:px-24 section">
            <hr className="w-full h-1 mb-16 border-0 dark:bg-white bg-dark opacity-10"></hr>
            <div className="w-8 mb-4">
              <svg
                id="abbe8588-8b21-44fd-a605-eb7de7f82941"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 93.13 75.2"
              >
                <path
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  d="M24.05,38.51,7.5,55.06a4.39,4.39,0,1,1-6.21-6.21L14.74,35.41,1.29,22A4.39,4.39,0,0,1,7.5,15.75L24.05,32.3A4.4,4.4,0,0,1,24.05,38.51Z"
                />
                <path
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  d="M91.85,55.06a4.38,4.38,0,0,1-6.21,0L69.09,38.51a4.4,4.4,0,0,1,0-6.21L85.64,15.75A4.39,4.39,0,0,1,91.85,22L78.41,35.41,91.85,48.85A4.4,4.4,0,0,1,91.85,55.06Z"
                />
                <rect
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  x="41.93"
                  y="-1.17"
                  width="8.78"
                  height="77.54"
                  rx="4.39"
                  transform="translate(11.31 -10.71) rotate(15)"
                />
              </svg>
            </div>

            <div className="flex flex-col items-start md:flex-row">
              {/* <p className="w-auto mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} - Designed and built by Daniel
                Cranney
              </p> */}

              <div className="flex md:hidden">
                <span className="mr-2">
                  <GitHubProfile marginBottom={"mb-0"} />
                </span>
                <span className="mr-2">
                  <TwitterProfile marginBottom={"mb-0"} />
                </span>
                <span className="mr-2">
                  <LinkedInProfile marginBottom={"mb-0"} />
                </span>
              </div>
            </div>
          </footer>
        </div>

        {/* Fixed Container */}
        <div className="fixed bottom-0 z-30 w-full">
          <div className="container relative flex h-full mx-auto">
            {/* Profile Icons */}
            <div className="absolute bottom-0 items-center hidden mt-auto mr-auto text-white left-8 md:flex md:flex-col">
              <GitHubProfile marginBottom={"mb-4"} />
              <TwitterProfile marginBottom={"mb-4"} />
              <LinkedInProfile marginBottom={"mb-4"} />
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2"></div>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-0 items-center hidden mt-auto ml-auto text-white right-8 md:flex md:flex-col">
              {/* Hero - Diamond 1 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(homeRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "home"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "home"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "home"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* About - Diamond 2 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(aboutRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "about"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "about"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "about"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Skills - Diamond 3 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(skillsRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "skills"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "skills"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "skills"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* My Work - Diamond 4 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(myWorkRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "my-work"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "my-work"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "my-work"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Blog - Diamond 5 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(testimonialsRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "blog"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "blog"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "blog"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Contact - Diamond 6 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(contactRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "contact"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "contact"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "contact"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>

              {/* Line */}
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2 z-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



