// import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
    angular,
    apache,
    azure,
    docker,
    dotnetcore,
    contact,
    git,
    github,
    html,
    javascript,
    jira,
    linkedin,
    nodejs,
    php,
    pinja,
    react,
    solteq,
    threejs,
    typescript,
    ubuntu
} from "../assets/icons";

export const skills = [
    {
        imageUrl: angular,
        name: "Angular",
        type: "Frontend",
    },
    {
        imageUrl: apache,
        name: "Apache",
        type: "Backend",
    },
    {
        imageUrl: azure,
        name: "Azure",
        type: "Cloud computing",
    },
    {
        imageUrl: docker,
        name: "Docker",
        type: "DevOps",
    },
    {
        imageUrl: dotnetcore,
        name: ".NET Core",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: jira,
        name: "Jira",
        type: "DevOps",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: php,
        name: "PHP",
        type: "Frontend/Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: threejs,
        name: "Three.js",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: ubuntu,
        name: "Ubuntu",
        type: "Systems Administration",
    }
];

//  iconBg: "#fbc3bc"
//  iconBg: "#b7e4c7"
//  iconBg: "#accbe1"
//  iconBg: "#a2d2ff",

export const experiences = [
    {
        title: "Junior Software Developer",
        company_name: "Solteq",
        icon: solteq,
        iconBg: "#fbc3bc",
        date: "April 2022 - June 2023",
        points: [
            "Developing and maintaining web applications using Angular, ASP .NET, SQL Server and other related technologies.",
            "Collaborating with cross-functional teams service managers, QA tester, product managers and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Software Developer",
        company_name: "Pinja",
        icon: pinja,
        iconBg: "#b7e4c7",
        date: "June 2023 - Present",
        points: [
            "Developing and maintaining web applications using SQL Server, PHP, Angular, .NET Core, Docker and other related technologies.",
            "Collaborating with cross-functional teams service managers, product managers, and other developers to create high-quality products.",
            "Daily tasks included new development with SQL Server and solving support tasks.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/suvela-engineering/',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/JuhoSuvela',
    }
];

// export const projects = [
//     {
//         iconUrl: pricewise,
//         theme: 'btn-back-red',
//         name: 'Home accounting',
//         description: 'Developed a home accounting software to keep track of your household's financial situation',
//         link: 'https://github.com/suvela-engineering/home-accounting',
//     }
// ];