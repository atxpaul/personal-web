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
        files: 'Fichiers du profil',
        seeProjects: 'Voir ce que j\'ai construit',
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
            "Automatiser l'inautomatisable. Spécialisé dans la construction d'infrastructures résilientes, de pipelines de déploiement ultra-rapides et d'architecture cloud scalable.",
        status: 'status: ready_to_deploy',
        viewProjects: './view_projects.sh',
        contact: './contact_me.sh',
    },
    projects: {
        openDetail: 'cat project.yml',
        colName: 'Nom',
        colStack: 'Stack',
        colModified: 'Modifié',
        results: 'Résultats',
        latestDeployment: 'Latest Deployment',
        subtitleDefault:
            "Solutions d'infrastructure as code, d'orchestration de conteneurs et de pipelines d'automatisation.",
        searchLabel: 'Filtrer les projets par nom, description ou technologie',
        moreRepositories: 'Autres dépôts',
        noResults: 'Aucun projet ne correspond aux filtres actuels.',
        clearFilters: 'Réinitialiser les filtres',
        empty: 'Aucun projet publié pour le moment.',
        viewCode: 'Voir le code',
        loadingList: 'Chargement des projets...',
        loadingProject: 'Chargement du projet...',
        relatedLogs: 'Logs associés',
        notFound: "Aucun projet n'existe avec cet ID. Il a peut-être été renommé ou supprimé.",
        loadError: 'Impossible de charger ce projet. Vérifiez votre connexion et réessayez.',
        filterLabel: 'Filtrer par technologie',
    },
    common: {
        loading: 'Chargement...',
        retry: './retry.sh',
        close: 'Fermer',
    },
    blog: {
        lead: 'Notes techniques sur l\'infrastructure, le CI/CD et l\'exploitation cloud.',
        comingSoon: 'Aucun article pour le moment. Des articles techniques arrivent bientôt.',
    },
    notFound: {
        title: 'command not found',
        body: "Cette page n'existe pas. Le lien est peut-être ancien ou mal saisi.",
        home: 'cd ~',
        projects: 'cd /projects',
    },
    login: {
        subtitle: 'Connectez-vous avec votre compte Google',
        cancel: 'Annuler',
        google: 'Continuer avec Google',
        loading: 'Connexion en cours...',
    },
    header: {
        nav: 'Navigation principale',
        language: 'Langue',
        menu: 'Afficher ou masquer la navigation',
    },
    footer: {
        social: 'Profils sociaux',
        copyright: '© {year} Pablo Pan Portfolio. Built with Tailwind CSS.',
        localStorageNotice:
            'Nous utilisons le stockage local pour mémoriser votre langue.',
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
    home: {
        summary: 'Résumé du profil',
        fetch: {
            role: 'rôle',
            location: 'lieu',
            status: 'statut',
            contact: 'contact',
            stack: 'stack',
        },
    },
};
