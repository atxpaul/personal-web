export default {
    nav: {
        home: 'cd /',
        projects: 'cd /projects',
        about: 'cd /about',
        blog: 'cd /blog',
        cv: 'cat cv.pdf',
        login: './login.sh',
    },
    about: {
        whoami: 'whoami',
        intro: 'DevOps Engineer specialized in automation, cloud, and scalability. I build bridges between code and operations.',
        description1:
            'I am passionate about infrastructure as code and container orchestration. My goal is to eliminate "it works on my machine" through robust CI/CD pipelines.',
        description2:
            'With more than 5 years of experience, I have optimized deployment times and improved the availability of critical systems in financial and e-commerce environments.',
        systemMetrics: 'System Metrics',
        techStack: 'Tech Stack',
        techStackCategories: {
            core: 'Core Dependencies',
            scripting: 'Scripting & CI/CD',
        },
        metrics: {
            uptime: {
                label: 'Uptime',
                status: 'Stable',
            },
            deployments: {
                label: 'Deployments',
                status: 'This Year',
            },
            automation: {
                label: 'Automation',
                status: 'Efficiency',
            },
        },
    },
    terminal: {
        prompt: 'pablo@portfolio:~$',
        initCommand: './init_system.sh --verbose',
        initOutput: {
            loading: 'Loading kernel modules...',
            mounting: 'Mounting filesystems...',
            connecting: 'Establishing secure connection...',
            done: 'Done',
            connected: 'Connected',
        },
        nameCommand: 'echo $NAME && echo $ROLE',
        name: 'Pablo Pan DevOps',
        role: '<Cloud Architect /> & <CI/CD Specialist />',
        missionCommand: 'cat ./mission_statement.txt',
        mission:
            'Automating the unautomatable. Specialized in building resilient infrastructures, ultra-fast deployment pipelines, and scalable cloud architecture.',
        status: 'status: ready_to_deploy',
        viewProjects: './view_projects.sh',
        contact: './contact_me.sh',
    },
    projects: {
        latestDeployment: 'Latest Deployment',
    },
    footer: {
        copyright: '© 2026 Pablo Pan Portfolio. Built with Tailwind CSS.',
        online: 'Online',
        encoding: 'UTF-8',
        locale: 'en_US',
        branch: 'main',
    },
    social: {
        github: 'GitHub',
        gitlab: 'GitLab',
        stackoverflow: 'StackOverflow',
        linkedin: 'LinkedIn',
    },
};
