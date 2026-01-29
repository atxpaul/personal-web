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
        intro: 'Ingeniero DevOps especializado en automatización, nube y escalabilidad. Construyo puentes entre código y operaciones.',
        description1:
            'Soy un apasionado de la infraestructura como código y la orquestación de contenedores. Mi objetivo es eliminar el "funciona en mi máquina" mediante pipelines CI/CD robustos.',
        description2:
            'Con más de 5 años de experiencia, he optimizado tiempos de despliegue y mejorado la disponibilidad de sistemas críticos en entornos financieros y de e-commerce.',
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
            'Automatizando lo inautomatizable. Especializado en construir infraestructuras resilientes, pipelines de despliegue ultrarrápidos y arquitectura en la nube escalable.',
        status: 'status: ready_to_deploy',
        viewProjects: './view_projects.sh',
        contact: './contact_me.sh',
    },
    projects: {
        latestDeployment: 'Latest Deployment',
    },
    footer: {
        copyright: '© 2026 Pablo Pan Portfolio. Built with Tailwind CSS.',
        localStorageNotice:
            'Usamos almacenamiento local para recordar tu idioma.',
        online: 'Online',
        encoding: 'UTF-8',
        locale: 'es_ES',
        branch: 'main',
    },
    social: {
        github: 'GitHub',
        gitlab: 'GitLab',
        stackoverflow: 'StackOverflow',
        linkedin: 'LinkedIn',
    },
};
