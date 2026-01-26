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
        whoami: 'whoami',
        intro: 'DevOps-Ingenieur spezialisiert auf Automatisierung, Cloud und Skalierbarkeit. Ich baue Brücken zwischen Code und Betrieb.',
        description1:
            'Ich bin leidenschaftlich über Infrastructure as Code und Container-Orchestrierung. Mein Ziel ist es, "funktioniert auf meinem Rechner" durch robuste CI/CD-Pipelines zu eliminieren.',
        description2:
            'Mit mehr als 5 Jahren Erfahrung habe ich Bereitstellungszeiten optimiert und die Verfügbarkeit kritischer Systeme in Finanz- und E-Commerce-Umgebungen verbessert.',
        systemMetrics: 'System-Metriken',
        techStack: 'Tech-Stack',
        techStackCategories: {
            core: 'Kern-Abhängigkeiten',
            scripting: 'Skripting & CI/CD',
        },
        metrics: {
            uptime: {
                label: 'Betriebszeit',
                status: 'Stabil',
            },
            deployments: {
                label: 'Bereitstellungen',
                status: 'Dieses Jahr',
            },
            automation: {
                label: 'Automatisierung',
                status: 'Effizienz',
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
            'Automatisierung des Unautomatisierbaren. Spezialisiert auf den Aufbau widerstandsfähiger Infrastrukturen, ultraschneller Deployment-Pipelines und skalierbarer Cloud-Architektur.',
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
        locale: 'de_DE',
        branch: 'main',
    },
    social: {
        github: 'GitHub',
        gitlab: 'GitLab',
        stackoverflow: 'StackOverflow',
        linkedin: 'LinkedIn',
    },
};
