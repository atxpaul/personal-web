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
        intro: 'Ingénieur DevOps spécialisé en automatisation, cloud et scalabilité. Je construis des ponts entre le code et les opérations.',
        description1:
            "Je suis passionné par l'infrastructure en tant que code et l'orchestration de conteneurs. Mon objectif est d'éliminer \"ça fonctionne sur ma machine\" grâce à des pipelines CI/CD robustes.",
        description2:
            "Avec plus de 5 ans d'expérience, j'ai optimisé les temps de déploiement et amélioré la disponibilité des systèmes critiques dans des environnements financiers et e-commerce.",
        systemMetrics: 'Métriques Système',
        techStack: 'Stack Technique',
        techStackCategories: {
            core: 'Dépendances Principales',
            scripting: 'Scripting & CI/CD',
        },
        metrics: {
            uptime: {
                label: 'Disponibilité',
                status: 'Stable',
            },
            deployments: {
                label: 'Déploiements',
                status: 'Cette Année',
            },
            automation: {
                label: 'Automatisation',
                status: 'Efficacité',
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
            "Automatiser l'inautomatisable. Spécialisé dans la construction d'infrastructures résilientes, de pipelines de déploiement ultra-rapides et d'architecture cloud scalable.",
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
        locale: 'fr_FR',
        branch: 'main',
    },
    social: {
        github: 'GitHub',
        gitlab: 'GitLab',
        stackoverflow: 'StackOverflow',
        linkedin: 'LinkedIn',
    },
};
