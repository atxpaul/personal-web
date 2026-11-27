export default {
    nav: {
        home: 'cd /',
        projects: 'cd /projects',
        about: 'cd /about',
        blog: 'cd /blog',
        cv: 'cat cv.pdf',
        login: './login.sh',
        logout: './logout.sh',
    },
    about: {
        files: 'Profile files',
        seeProjects: 'See what I\'ve built',
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
        prompt: "pablo{'@'}portfolio:~$", // @ escapado: en vue-i18n inicia un mensaje enlazado (@:clave)
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
        openDetail: 'cat project.yml',
        colName: 'Name',
        colStack: 'Stack',
        colModified: 'Modified',
        results: 'Results',
        latestDeployment: 'Latest Deployment',
        subtitleDefault:
            'Exploring infrastructure as code, container orchestration, and automation pipelines.',
        searchLabel: 'Filter projects by name, description, or technology',
        moreRepositories: 'More Repositories',
        noResults: 'No projects match the current filters.',
        clearFilters: 'Clear filters',
        empty: 'No projects published yet.',
        viewCode: 'View code',
        loadingList: 'Loading projects...',
        loadingProject: 'Loading project...',
        relatedLogs: 'Related Logs',
        notFound: 'No project with this ID exists. It may have been renamed or removed.',
        loadError: "Couldn't load this project. Check your connection and try again.",
        filterLabel: 'Filter by technology',
    },
    common: {
        loading: 'Loading...',
        retry: './retry.sh',
        close: 'Close',
    },
    blog: {
        lead: 'Technical notes on infrastructure, CI/CD and running things in the cloud.',
        comingSoon: 'No posts yet. Technical write-ups are on the way.',
    },
    notFound: {
        title: 'command not found',
        body: "This page doesn't exist. The link may be old or mistyped.",
        home: 'cd ~',
        projects: 'cd /projects',
    },
    login: {
        subtitle: 'Sign in with your Google account',
        cancel: 'Cancel',
        google: 'Continue with Google',
        loading: 'Signing in...',
    },
    header: {
        nav: 'Main navigation',
        language: 'Language',
        menu: 'Toggle navigation',
    },
    footer: {
        social: 'Social profiles',
        copyright: '© {year} Pablo Pan Portfolio. Built with Tailwind CSS.',
        localStorageNotice:
            'We use local storage to remember your language preference.',
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
    home: {
        summary: 'Profile summary',
        fetch: {
            role: 'role',
            location: 'location',
            status: 'status',
            contact: 'contact',
            stack: 'stack',
        },
    },
};
